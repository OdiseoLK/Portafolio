'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { HeroContent } from '@/lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero "laboratorio vivo".
 * - Parallax 3D: un solo rAF lee el puntero, lerpéa y escribe --mx/--my/--rx/--ry
 *   en la sección; cada capa consume las variables vía CSS (.plx / rotación).
 * - Distorsión líquida: el heading y el husky nacen con .is-liquid y la sueltan
 *   tras la entrada. En reposo no hay filtro activo (el reposo ES el diseño).
 * - Con prefers-reduced-motion: sin rig, sin líquido, todo visible al primer paint.
 */
export default function Hero({ data }: { data: HeroContent }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [liquid, setLiquid] = useState(false);

  // Entrada líquida: se activa al montar y se apaga sola.
  useEffect(() => {
    if (reduced) return;
    setLiquid(true);
    const t = setTimeout(() => setLiquid(false), 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  // Rig de puntero: un solo escritor por frame.
  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;

    let tx = 0, ty = 0, x = 0, y = 0;
    let raf = 0, running = false;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty('--mx', String(x * 40));
      el.style.setProperty('--my', String(y * 24));
      el.style.setProperty('--rx', `${(-y * 7).toFixed(3)}deg`);
      el.style.setProperty('--ry', `${(x * 10).toFixed(3)}deg`);
      if (Math.abs(tx - x) > 0.0005 || Math.abs(ty - y) > 0.0005) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg"
    >
      {/* Filtro de distorsión líquida (off-screen, valores fijos) */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="odiseo-liquid" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* CAPA -2 · aurora de hielo que deriva con el puntero */}
      <div
        aria-hidden="true"
        className="plx pointer-events-none absolute left-1/2 top-[38%] h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          ['--depth' as string]: '-0.6',
          background:
            'radial-gradient(ellipse at 38% 45%, rgba(124,199,255,0.22) 0%, transparent 55%), radial-gradient(ellipse at 68% 55%, rgba(167,139,250,0.18) 0%, transparent 55%)',
        }}
      />

      {/* CAPA -1 · anillos hairline */}
      <div
        aria-hidden="true"
        className="plx pointer-events-none absolute right-[4%] top-1/2 hidden h-[72vmin] w-[72vmin] -translate-y-1/2 lg:block"
        style={{ ['--depth' as string]: '-0.35' }}
      >
        <div className="h-full w-full rounded-full border border-fg/[0.08]" />
        <div className="absolute inset-[9%] rounded-full border border-hielo/[0.10]" />
      </div>

      {/* CAPA 0 · husky con tilt 3D */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ perspective: '900px' }}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.45 }}
          className={liquid ? 'is-liquid' : undefined}
          style={{
            transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 scale-110 rounded-full blur-[110px]" style={{ background: "conic-gradient(from 180deg, rgba(124,199,255,0.16), rgba(167,139,250,0.14), rgba(94,234,212,0.10), rgba(124,199,255,0.16))" }} />
          <Image
            src="/logo-mark.png"
            alt=""
            width={540}
            height={499}
            priority
            className="relative opacity-90 drop-shadow-[0_0_60px_rgba(124,199,255,0.14)]"
          />
        </motion.div>
      </div>

      {/* ESQUELETO EDITORIAL · contenido */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="wrap">
          <motion.p {...fadeUp(0.1)} className="eyebrow mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-hielo/50" />
            Estudio de diseño y desarrollo web
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              {...fadeUp(0.2)}
              className={`hero-heading font-display text-[clamp(4.2rem,13vw,12rem)] font-bold uppercase leading-[0.86] tracking-[-0.03em] ${liquid ? 'is-liquid' : ''}`}
            >
              Odiseo
            </motion.h1>
          </div>
          <motion.p
            {...fadeUp(0.32)}
            className="-mt-[0.5em] pl-[0.08em] font-serif text-[clamp(2rem,6vw,5.2rem)] italic leading-none text-aurora/90"
          >
            studio<span className="text-fg/30">*</span>
          </motion.p>

          {data.availability.enabled && (
            <motion.div {...fadeUp(0.45)} className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lima opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lima" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/70">
                {data.availability.label}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Barra inferior editorial */}
      <div className="relative z-10 pb-8">
        <div className="wrap">
          <div className="rule mb-6" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.p
              {...fadeUp(0.55)}
              className="max-w-sm text-sm leading-relaxed text-muted md:text-[15px]"
            >
              {data.description}
            </motion.p>
            <motion.div {...fadeUp(0.65)} className="flex items-center gap-6">
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-fg/30 md:block">
                Scroll ↓
              </span>
              <a
                href="#casos"
                className="group inline-flex items-center gap-2.5 rounded-full border border-fg/20 px-7 py-3 text-sm font-medium tracking-wide text-fg transition-colors duration-300 hover:border-hielo/60 hover:text-hielo"
              >
                Ver casos de estudio
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
