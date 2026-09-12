'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/components/ui/LanguageContext';

const STOPS = [
  { id: 'inicio', es: 'Inicio', en: 'Home', star: true },
  { id: 'estudio', es: 'El estudio', en: 'The studio' },
  { id: 'servicios', es: 'Servicios', en: 'Services' },
  { id: 'proceso', es: 'La travesía', en: 'The journey' },
  { id: 'casos', es: 'Bitácora', en: 'Logbook' },
  { id: 'opiniones', es: 'Señales', en: 'Signals' },
  { id: 'contacto', es: 'Contacto', en: 'Contact' },
];

/**
 * Riel de ruta: navegación lateral con los campamentos del sitio.
 * Línea punteada vertical, un punto por sección, el activo se enciende
 * y muestra su nombre. Wayfinding de expedición.
 */
export default function RutaRail() {
  const { lang } = useLang();
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    STOPS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label={lang === 'en' ? 'Route through the site' : 'Ruta del sitio'}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex flex-col items-center gap-5 py-2">
        {/* Línea punteada de la ruta */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 top-3 w-px"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgb(var(--fg) / 0.25) 0 3px, transparent 3px 9px)' }}
        />
        {STOPS.map((s) => {
          const isActive = active === s.id;
          const label = lang === 'en' ? s.en : s.es;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              className="group relative grid h-4 w-4 place-items-center"
            >
              {s.star ? (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 26 26"
                  className={`transition-all duration-300 ${isActive ? 'scale-125 drop-shadow-[0_0_6px_rgba(124,199,255,0.9)]' : 'opacity-60'}`}
                >
                  <path d="M13 0 L15 11 L26 13 L15 15 L13 26 L11 15 L0 13 L11 11 Z" fill={isActive ? '#7CC7FF' : 'rgb(var(--fg) / 0.7)'} />
                </svg>
              ) : (
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive ? 'h-2.5 w-2.5 bg-fg shadow-[0_0_8px_rgb(var(--fg)/0.7)]' : 'h-1.5 w-1.5 bg-fg/40 group-hover:bg-fg/80'
                  }`}
                />
              )}
              <span
                className={`pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-bg/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-fg/80 backdrop-blur-[2px] transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
