'use client';

import { useEffect, useRef } from 'react';

/**
 * Marquee arrastrable con inercia (motor rAF).
 * Cada tarjeta muestra una vista del sitio: si existe `img` (captura real en
 * /public/casos/) se usa; si no, se dibuja un mini-mockup estilizado con la
 * paleta del cliente (barra de navegador + layout abstracto del sitio).
 */

type Tile = {
  name: string;
  giro: string;
  tag: string;
  ink: string;       // acento del cliente
  base: string;      // fondo del mockup
  panel: string;     // bloques del mockup
  img?: string;      // captura real (cuando exista)
  layout: 'showroom' | 'institucional' | 'menu' | 'hospital';
};

const TILES: Tile[] = [
  { name: 'Decora', giro: 'Interiorismo · Showroom', tag: 'En producción',
    ink: '#D8B98A', base: '#171310', panel: '#2A2118', layout: 'showroom', img: '/casos/decora-carrusel.jpg' },
  { name: 'Fundación Zurita', giro: 'Salud visual · Institucional', tag: 'En producción',
    ink: '#5EEAD4', base: '#0A1B1E', panel: '#123036', layout: 'institucional', img: '/casos/zurita-carrusel.jpg' },
  { name: 'Café Álvarez', giro: 'Cafetería · Pedidos en línea', tag: 'Entregado',
    ink: '#C9A074', base: '#141110', panel: '#241C15', layout: 'menu', img: '/casos/cafe-alvarez-carrusel.jpg' },
  { name: 'Puerta Grande', giro: 'Hospital · Fundación Zurita', tag: 'Próximamente',
    ink: '#7CC7FF', base: '#0B1526', panel: '#142642', layout: 'hospital', img: '/casos/puerta-grande-carrusel.jpg' },
];

/** Mini-mockup del sitio: barra de navegador + composición abstracta por giro. */
function SiteMock({ t }: { t: Tile }) {
  const blocks: Record<Tile['layout'], JSX.Element> = {
    showroom: (
      <>
        <rect x="10" y="26" width="118" height="46" rx="4" fill={t.panel} />
        <rect x="16" y="56" width="62" height="5" rx="2.5" fill={t.ink} opacity=".9" />
        <rect x="16" y="64" width="40" height="3" rx="1.5" fill="#fff" opacity=".35" />
        <rect x="134" y="26" width="36" height="21" rx="3" fill={t.panel} />
        <rect x="134" y="51" width="36" height="21" rx="3" fill={t.panel} />
        <circle cx="152" cy="36" r="6" fill={t.ink} opacity=".5" />
        <rect x="10" y="78" width="50" height="14" rx="3" fill={t.panel} />
        <rect x="65" y="78" width="50" height="14" rx="3" fill={t.panel} />
        <rect x="120" y="78" width="50" height="14" rx="3" fill={t.ink} opacity=".28" />
      </>
    ),
    institucional: (
      <>
        <rect x="10" y="26" width="160" height="30" rx="4" fill={t.panel} />
        <rect x="18" y="35" width="70" height="6" rx="3" fill="#fff" opacity=".7" />
        <rect x="18" y="45" width="44" height="4" rx="2" fill={t.ink} opacity=".9" />
        <circle cx="150" cy="41" r="9" fill={t.ink} opacity=".4" />
        <rect x="10" y="62" width="36" height="30" rx="3" fill={t.panel} />
        <rect x="51" y="62" width="36" height="30" rx="3" fill={t.panel} />
        <rect x="92" y="62" width="36" height="30" rx="3" fill={t.panel} />
        <rect x="133" y="62" width="37" height="30" rx="3" fill={t.ink} opacity=".3" />
      </>
    ),
    menu: (
      <>
        <rect x="10" y="26" width="76" height="66" rx="4" fill={t.panel} />
        <circle cx="48" cy="50" r="14" fill={t.ink} opacity=".45" />
        <rect x="24" y="72" width="48" height="4" rx="2" fill="#fff" opacity=".5" />
        <rect x="92" y="26" width="78" height="13" rx="3" fill={t.panel} />
        <rect x="92" y="43" width="78" height="13" rx="3" fill={t.panel} />
        <rect x="92" y="60" width="78" height="13" rx="3" fill={t.panel} />
        <rect x="92" y="77" width="78" height="15" rx="7.5" fill={t.ink} opacity=".55" />
        <rect x="120" y="82" width="22" height="4" rx="2" fill="#0a0a0a" opacity=".8" />
      </>
    ),
    hospital: (
      <>
        <rect x="10" y="26" width="160" height="36" rx="4" fill={t.panel} />
        <rect x="18" y="36" width="58" height="7" rx="3.5" fill="#fff" opacity=".75" />
        <rect x="18" y="48" width="34" height="8" rx="4" fill={t.ink} opacity=".8" />
        <path d="M148 34 h8 v6 h6 v8 h-6 v6 h-8 v-6 h-6 v-8 h6 z" fill={t.ink} opacity=".6" />
        <rect x="10" y="68" width="50" height="24" rx="3" fill={t.panel} />
        <rect x="65" y="68" width="50" height="24" rx="3" fill={t.panel} />
        <rect x="120" y="68" width="50" height="24" rx="3" fill={t.panel} />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 180 100" className="h-full w-full" role="img" aria-label={`Vista del sitio de ${t.name}`}>
      <rect width="180" height="100" rx="8" fill={t.base} />
      {/* barra de navegador */}
      <rect x="0" y="0" width="180" height="16" rx="8" fill="#000" opacity=".35" />
      <rect x="0" y="8" width="180" height="8" fill="#000" opacity=".35" />
      <circle cx="10" cy="8" r="2.4" fill="#FF5F57" />
      <circle cx="18" cy="8" r="2.4" fill="#FEBC2E" />
      <circle cx="26" cy="8" r="2.4" fill="#28C840" />
      <rect x="40" y="4.5" width="80" height="7" rx="3.5" fill="#fff" opacity=".12" />
      {blocks[t.layout]}
    </svg>
  );
}

export default function MarqueeCasos() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const SPEED = 0.8;
    let offset = 0, velocity = 0, dragging = false;
    let dragStartX = 0, dragStartOffset = 0, lastX = 0, lastT = 0, raf = 0;

    const frame = () => {
      if (!dragging) {
        if (Math.abs(velocity) > 0.1) { offset += velocity; velocity *= 0.95; }
        else { velocity = 0; if (!reduced) offset -= SPEED; }
      }
      const half = track.scrollWidth / 2;
      if (offset <= -half) offset += half;
      if (offset > 0) offset -= half;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const down = (e: PointerEvent) => {
      dragging = true; velocity = 0;
      track.setPointerCapture(e.pointerId);
      dragStartX = e.clientX; dragStartOffset = offset;
      lastX = e.clientX; lastT = performance.now();
      track.style.cursor = 'grabbing';
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      velocity = ((e.clientX - lastX) / dt) * 16;
      lastX = e.clientX; lastT = now;
      offset = dragStartOffset + (e.clientX - dragStartX);
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      try { track.releasePointerCapture(e.pointerId); } catch {}
      track.style.cursor = 'grab';
    };

    track.addEventListener('pointerdown', down);
    track.addEventListener('pointermove', move);
    track.addEventListener('pointerup', up);
    track.addEventListener('pointercancel', up);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('pointerdown', down);
      track.removeEventListener('pointermove', move);
      track.removeEventListener('pointerup', up);
      track.removeEventListener('pointercancel', up);
    };
  }, []);

  const tiles = [...TILES, ...TILES];

  return (
    <section aria-label="Clientes del estudio" className="relative overflow-hidden border-y border-line/60 bg-surface/50 py-6">
      <p className="wrap eyebrow mb-5">Trabajo real, negocios reales</p>
      <div
        ref={trackRef}
        className="flex w-max cursor-grab select-none gap-4 py-2 pl-4"
        style={{ willChange: 'transform', touchAction: 'pan-y' }}
      >
        {tiles.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            aria-hidden={i >= TILES.length}
            className="w-72 flex-shrink-0 overflow-hidden rounded-2xl border border-fg/10 bg-card sm:w-80"
          >
            <div className="aspect-[16/9]">
              {t.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.img} alt={`Sitio web de ${t.name}`} className="h-full w-full object-cover object-top" draggable={false} />
              ) : (
                <SiteMock t={t} />
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="truncate font-display text-lg font-bold tracking-tight text-fg">{t.name}</h3>
                <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-fg/45">{t.giro}</p>
              </div>
              <span
                className="flex-shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em]"
                style={{ borderColor: `${t.ink}66`, color: t.ink }}
              >
                {t.tag}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
