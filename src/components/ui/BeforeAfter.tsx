'use client';

import { useState } from 'react';

/**
 * Comparador antes/después con manija arrastrable.
 * La interacción vive en un <input type="range"> transparente que cubre todo:
 * arrastre con mouse/touch y teclado (flechas) gratis, con accesibilidad real.
 */
export default function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt,
  onBeforeError,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  onBeforeError?: () => void;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative h-full w-full select-none overflow-hidden">
      {/* DESPUÉS (fondo) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" draggable={false} />

      {/* ANTES (recortado por la manija) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt=""
          aria-hidden="true"
          loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          onError={onBeforeError}
        />
      </div>

      {/* Línea y manija */}
      <div aria-hidden="true" className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-fg/80 shadow-[0_0_12px_rgba(124,199,255,0.7)]" />
        <div className="absolute top-1/2 -ml-[18px] -mt-[18px] grid h-9 w-9 place-items-center rounded-full border border-fg/40 bg-bg/80 backdrop-blur-sm">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="#F2F5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 1 1 5l3 4M10 1l3 4-3 4" />
          </svg>
        </div>
      </div>

      {/* Etiquetas */}
      <span aria-hidden="true" className="absolute left-3 top-3 rounded-full border border-fg/25 bg-bg/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-fg/80 backdrop-blur-[2px]">
        {beforeLabel}
      </span>
      <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-full border border-hielo/50 bg-bg/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-hielo backdrop-blur-[2px]">
        {afterLabel}
      </span>

      {/* Capa de interacción accesible */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
