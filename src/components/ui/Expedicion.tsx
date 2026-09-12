'use client';

import Scramble from '@/components/ui/Scramble';
import { useLang } from '@/components/ui/LanguageContext';

/** Capítulo de la bitácora: chip mono que rompe una regla, unifica todas las secciones. */
export function Cap({ n, es, en }: { n: string; es: string; en: string }) {
  const { lang } = useLang();
  const label = lang === 'en' ? en : es;
  return (
    <div aria-hidden="true" className="mb-12 flex items-center gap-4 md:mb-16">
      <span className="rounded-full border border-line bg-bg px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        <Scramble text={`Cap. ${n} · ${label}`} />
      </span>
      <span className="rule h-px flex-1" />
      <span className="font-mono text-sm text-fg/25">+</span>
    </div>
  );
}

/** Esquinas de visor para enmarcar un bloque (el padre debe ser relative). */
export function Esquinas({ tone = 'border-fg/25' }: { tone?: string }) {
  return (
    <>
      <span aria-hidden="true" className={`absolute left-0 top-0 h-5 w-5 border-l border-t ${tone}`} />
      <span aria-hidden="true" className={`absolute right-0 top-0 h-5 w-5 border-r border-t ${tone}`} />
      <span aria-hidden="true" className={`absolute bottom-0 left-0 h-5 w-5 border-b border-l ${tone}`} />
      <span aria-hidden="true" className={`absolute bottom-0 right-0 h-5 w-5 border-b border-r ${tone}`} />
    </>
  );
}

/** Curvas de nivel topográficas, decoración de mapa para fondos. */
export function Topo({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 400"
      className={`pointer-events-none absolute ${className}`}
      fill="none"
    >
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${60 - i * 18} ${200} C ${140} ${60 - i * 22}, ${340} ${40 - i * 16}, ${420 + i * 20} ${150 - i * 10} S ${560 + i * 14} ${330 + i * 18}, ${300} ${380 + i * 8}`}
          stroke="rgb(var(--fg) / 0.06)"
          strokeWidth="1"
        />
      ))}
      <circle cx="420" cy="150" r="2.5" fill="rgb(var(--fg) / 0.25)" />
      <text x="432" y="154" fontFamily="monospace" fontSize="10" fill="rgb(var(--fg) / 0.2)" letterSpacing="2">1250 m</text>
    </svg>
  );
}
