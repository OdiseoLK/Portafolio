'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * El scroll es la ruta: línea punteada en el borde superior que se recorre
 * al scrollear, con una banderita que avanza y se vuelve estrella al llegar.
 * Un solo rAF escribe --sp en el contenedor; el CSS consume.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, pending = false;
    // Alto recorrible y ancho de la barra se miden solo cuando cambian, no en cada scroll
    let max = 1, ancho = 1;
    const medir = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      ancho = el.clientWidth;
    };
    medir();
    const ro = new ResizeObserver(() => { medir(); onScroll(); });
    ro.observe(document.body);

    const update = () => {
      pending = false;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Solo propiedades que no mueven el layout: clip-path y transform
      el.style.setProperty('--sp', p.toFixed(4));
      el.style.setProperty('--spx', `${(p * ancho).toFixed(1)}px`);
      const isDone = p >= 0.985;
      if (isDone !== doneRef.current) {
        doneRef.current = isDone;
        setDone(isDone);
      }
    };
    function onScroll() {
      if (!pending) { pending = true; raf = requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-7">
      {/* Ruta fantasma */}
      <div
        className="absolute left-0 right-0 top-[5px] h-[3px]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgb(var(--fg) / 0.15) 0 3px, transparent 3px 10px)',
        }}
      />
      {/* Ruta recorrida */}
      <div
        className="absolute left-0 right-0 top-[5px] h-[3px]"
        style={{
          clipPath: 'inset(0 calc((1 - var(--sp, 0)) * 100%) 0 0)',
          background: 'linear-gradient(90deg, rgb(var(--fg)), rgb(var(--fg) / 0.55))',
          maskImage: 'repeating-linear-gradient(90deg, black 0 3px, transparent 3px 10px)',
          WebkitMaskImage: 'repeating-linear-gradient(90deg, black 0 3px, transparent 3px 10px)',
        }}
      />
      {/* Banderita → estrella al llegar */}
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: 'translate3d(var(--spx, 0px), 0, 0) translateX(-55%)' }}
      >
        {done ? (
          <svg width="18" height="18" viewBox="0 0 26 26" className="twinkle mt-[1px] drop-shadow-[0_0_8px_rgba(167,139,250,0.9)]">
            <path d="M13 0 L15 11 L26 13 L15 15 L13 26 L11 15 L0 13 L11 11 Z" fill="#DDD1FF" />
          </svg>
        ) : (
          <svg width="16" height="20" viewBox="0 0 16 20">
            <line x1="2" y1="2" x2="2" y2="19" stroke="rgb(var(--fg) / 0.9)" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 2 L14 6 L2 10 Z" fill="rgb(var(--fg) / 0.5)" />
          </svg>
        )}
      </div>
    </div>
  );
}
