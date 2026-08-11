'use client';

import { useEffect, useRef } from 'react';

const SPACING = 56;
const RADIUS = 200;

/**
 * Cuadrícula estilo plano técnico: casi invisible, con un realce muy sutil
 * de las líneas alrededor del cursor. Sin partículas, sin efectos llamativos.
 */
export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const cursor = { x: -9999, y: -9999 };

    const strokeGrid = (style: string | CanvasGradient) => {
      ctx.strokeStyle = style;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0.5; x <= width + SPACING; x += SPACING) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0.5; y <= height + SPACING; y += SPACING) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Capa base: cuadrícula muy fina, casi invisible.
      strokeGrid('rgba(245, 245, 245, 0.032)');

      // Capa reactiva: las líneas cercanas al cursor se iluminan apenas.
      if (cursor.x > -999) {
        const glow = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, RADIUS);
        glow.addColorStop(0, 'rgba(245, 245, 245, 0.085)');
        glow.addColorStop(1, 'rgba(245, 245, 245, 0)');
        strokeGrid(glow);

        // Cruz de acento sobre las líneas más cercanas al cursor.
        const tint = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, RADIUS);
        tint.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
        tint.addColorStop(1, 'rgba(92, 107, 192, 0)');
        const gx = Math.round(cursor.x / SPACING) * SPACING + 0.5;
        const gy = Math.round(cursor.y / SPACING) * SPACING + 0.5;
        ctx.strokeStyle = tint;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gx, cursor.y - RADIUS);
        ctx.lineTo(gx, cursor.y + RADIUS);
        ctx.moveTo(cursor.x - RADIUS, gy);
        ctx.lineTo(cursor.x + RADIUS, gy);
        ctx.stroke();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    const loop = () => {
      cursor.x += (mouse.x - cursor.x) * 0.12;
      cursor.y += (mouse.y - cursor.y) * 0.12;
      render();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize);

    if (!reduced && finePointer) {
      window.addEventListener('mousemove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />
  );
}
