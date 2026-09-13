'use client';

import { useEffect, useRef } from 'react';

type Momento = 'dia' | 'tarde' | 'noche';

type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; f: number };

/**
 * Atmósfera viva por cielo, en un solo canvas:
 *  - noche: nieve fina cayendo con vaivén
 *  - tarde: brasas de la fogata subiendo y titilando
 *  - día:   motas de luz flotando y destellando
 * Se pausa fuera de pestaña, respeta reduced-motion, densidad por área,
 * y detecta el cambio de cielo observando <html data-time>.
 */
export default function CieloFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // No competir con la carga inicial: arrancar cuando el navegador esté libre.
    let cancel: (() => void) | undefined;
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = () => { cancel = init(); };
    const handle = ric ? ric(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    return () => { if (!ric) window.clearTimeout(handle); cancel?.(); };

    function init() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    let raf = 0;
    let momento: Momento = (document.documentElement.dataset.time as Momento) || 'noche';
    let parts: P[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const count = () => Math.min(momento === 'noche' ? 55 : momento === 'tarde' ? 38 : 26, Math.round((W * H) / 26000));

    const spawn = (initial = false): P => {
      if (momento === 'tarde') {
        return {
          x: Math.random() * W,
          y: initial ? Math.random() * H : H + 6,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(0.35 + Math.random() * 0.75),
          r: 0.8 + Math.random() * 1.3,
          a: 0.2 + Math.random() * 0.5,
          f: Math.random() * Math.PI * 2,
        };
      }
      if (momento === 'dia') {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.14,
          r: 0.8 + Math.random() * 1.6,
          a: 0.15 + Math.random() * 0.35,
          f: Math.random() * Math.PI * 2,
        };
      }
      // noche: nieve
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : -6,
        vx: 0,
        vy: 0.3 + Math.random() * 0.6,
        r: 0.7 + Math.random() * 1.7,
        a: 0.18 + Math.random() * 0.4,
        f: Math.random() * Math.PI * 2,
      };
    };

    const reset = () => { parts = Array.from({ length: count() }, () => spawn(true)); };

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (momento === 'noche') {
          p.y += p.vy;
          p.x += Math.sin(t * 0.7 + p.f) * 0.25;
          if (p.y > H + 6) parts[i] = spawn();
          ctx.globalAlpha = p.a;
          ctx.fillStyle = '#F4F4F5';
        } else if (momento === 'tarde') {
          p.y += p.vy;
          p.x += p.vx + Math.sin(t * 1.4 + p.f) * 0.2;
          if (p.y < -8) parts[i] = spawn();
          ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(t * 5 + p.f));
          ctx.fillStyle = Math.random() > 0.85 ? '#FFD9AE' : '#FFAE5C';
        } else {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -6) p.x = W + 6; if (p.x > W + 6) p.x = -6;
          if (p.y < -6) p.y = H + 6; if (p.y > H + 6) p.y = -6;
          ctx.globalAlpha = p.a * (0.45 + 0.55 * Math.abs(Math.sin(t * 1.2 + p.f)));
          ctx.fillStyle = '#FFFFFF';
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    const stop = () => cancelAnimationFrame(raf);

    resize(); reset(); start();

    const onResize = () => { resize(); reset(); };
    const onVis = () => { document.hidden ? stop() : start(); };
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVis);

    const mo = new MutationObserver(() => {
      const m = (document.documentElement.dataset.time as Momento) || 'noche';
      if (m !== momento) { momento = m; reset(); }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-time'] });

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      mo.disconnect();
    };
    }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[8] opacity-70"
      />
      {/* Enfoques lumínicos por cielo */}
      <div aria-hidden="true" className="fx-fogata pointer-events-none fixed inset-x-0 bottom-0 z-[5] h-[45vh]" />
      <div aria-hidden="true" className="fx-sol pointer-events-none fixed inset-x-0 top-0 z-[5] h-[40vh]" />
    </>
  );
}
