'use client';

import { useEffect, useRef } from 'react';

const POINTS = 260;
const LINK_DIST = 0.42;

/**
 * Globo de partículas en rotación (esfera de puntos conectados),
 * con degradado violeta → verde como en la identidad del sitio.
 * Decorativo: se dibuja detrás del editor de código del hero.
 */
export default function ParticleGlobe({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Esfera de Fibonacci: puntos repartidos uniformemente
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
    }

    const R = size * 0.36;
    const cx = size / 2;
    const cy = size / 2;
    let angle = 0;
    let raf = 0;

    const color = (x: number, alpha: number) => {
      // x ∈ [-1, 1]: violeta a la izquierda, verde a la derecha
      const t = (x + 1) / 2;
      const r = Math.round(139 + (34 - 139) * t);
      const g = Math.round(92 + (197 - 92) * t);
      const b = Math.round(246 + (94 - 246) * t);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const proj = pts.map((p) => {
        const x = p.x * cos - p.z * sin;
        const z = p.x * sin + p.z * cos;
        const depth = (z + 1.6) / 2.6; // 0 atrás → 1 al frente
        return { x, y: p.y, z, sx: cx + x * R, sy: cy + p.y * R, depth };
      });

      // Conexiones entre puntos cercanos
      ctx.lineWidth = 0.5;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i];
          const b = proj[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.16 * Math.min(a.depth, b.depth);
            ctx.strokeStyle = color((a.x + b.x) / 2, alpha);
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Puntos
      for (const p of proj) {
        ctx.fillStyle = color(p.x, 0.25 + p.depth * 0.6);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 0.8 + p.depth * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      angle += 0.0022;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
