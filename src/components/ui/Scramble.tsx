'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#·01';

/**
 * Texto que se "descifra": los caracteres barajan glifos aleatorios y se
 * asientan de izquierda a derecha (estética terminal, como select.supabase.com).
 *
 * trigger:
 *  - 'load'  → corre al montar
 *  - 'view'  → corre al entrar al viewport (una vez)
 *  - 'hover' → corre en cada hover del elemento padre más cercano con data-scramble-parent,
 *              o del propio span si no hay padre marcado
 *
 * Con prefers-reduced-motion muestra el texto final directo.
 * Reserva el ancho con el texto real para no mover el layout.
 */
export default function Scramble({
  text,
  trigger = 'view',
  speed = 32,
  className = '',
}: {
  text: string;
  trigger?: 'load' | 'view' | 'hover';
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const [display, setDisplay] = useState(text);

  const run = () => {
    cancelAnimationFrame(rafRef.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return;
    }
    const chars = Array.from(text);
    const total = chars.length;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        frame += 1;
        // Cada carácter se asienta cuando frame supera su índice (+ colita aleatoria)
        const settled = Math.floor(frame * 0.9);
        const out = chars.map((c, i) => {
          if (c === ' ') return ' ';
          if (i < settled) return c;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        });
        setDisplay(out.join(''));
        if (settled >= total) {
          setDisplay(text);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Re-descifrar cuando cambia el texto (p. ej. al cambiar de idioma)
  useEffect(() => {
    setDisplay(text);
    const el = ref.current;
    if (!el) return;

    if (trigger === 'load') {
      run();
      return () => cancelAnimationFrame(rafRef.current);
    }

    if (trigger === 'view') {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              run();
              io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(rafRef.current);
      };
    }

    // hover
    const host = el.closest('[data-scramble-parent]') ?? el;
    const onEnter = () => run();
    host.addEventListener('mouseenter', onEnter);
    return () => {
      host.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Reserva el ancho final para que el layout no salte */}
      <span aria-hidden="true" className="invisible">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** Separador de puntitos ······· que se enciende en secuencia al entrar en vista. */
export function DotsDivider({ count = 9 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setOn(true); io.disconnect(); }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="flex items-center justify-center gap-3 py-2 font-mono text-lg text-fg/30">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="transition-opacity duration-200"
          style={{ opacity: on ? 1 : 0, transitionDelay: `${i * 70}ms` }}
        >
          ·
        </span>
      ))}
    </div>
  );
}
