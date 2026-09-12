'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { HeroContent } from '@/lib/types';
import Scramble from '@/components/ui/Scramble';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

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
  const { lang } = useLang();
  const en = lang === 'en';
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [liquid, setLiquid] = useState(false);
  const [blink, setBlink] = useState(false);
  const [wofAt, setWofAt] = useState<number | null>(null);

  // El guía parpadea cada tanto
  useEffect(() => {
    if (reduced) return;
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t1 = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => { setBlink(false); schedule(); }, 160);
      }, 3500 + Math.random() * 3500);
    };
    schedule();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  // Saludo: ondas + estrellas emocionadas por un momento
  const wof = () => {
    setWofAt(Date.now());
    setTimeout(() => setWofAt(null), 1100);
  };

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
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
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
        className="cielo plx pointer-events-none absolute left-1/2 top-[38%] h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{
          ['--depth' as string]: '-0.6',
          background:
            'radial-gradient(ellipse at 45% 45%, rgb(var(--fg) / 0.05) 0%, transparent 60%)',
        }}
      />


      {/* CAPA -1.5 · constelaciones de la noche polar */}
      <svg
        aria-hidden="true"
        className="cielo plx pointer-events-none absolute inset-0 h-full w-full opacity-60"
        style={{ ['--depth' as string]: '-0.8' }}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="rgba(244,244,245,0.10)" strokeWidth="1">
          <path d="M120 140 L210 190 L300 150 L380 220" fill="none" />
          <path d="M880 560 L950 500 L1040 540" fill="none" />
        </g>
        {[
          [120, 140, 2.2], [210, 190, 1.6], [300, 150, 2.6], [380, 220, 1.8],
          [560, 90, 1.5], [720, 160, 2.0], [880, 560, 2.2], [950, 500, 1.6],
          [1040, 540, 2.4], [180, 620, 1.5], [420, 700, 1.9], [1100, 220, 1.6],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="rgba(244,244,245,0.55)"
            className={wofAt ? 'twinkle-fast' : 'twinkle'} style={{ animationDelay: wofAt ? `${(i * 0.05) % 0.5}s` : `${(i * 0.4) % 2.6}s` }} />
        ))}
      </svg>

      {/* Estrella polar: el norte — clic para volver al inicio */}
      <a
        href="#inicio"
        aria-label="Estrella polar — volver al inicio"
        className="cielo group absolute right-[8%] top-[12%] z-20 hidden lg:block"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"
          className="twinkle drop-shadow-[0_0_10px_rgba(124,199,255,0.8)] transition-transform duration-500 group-hover:scale-125">
          <path d="M13 0 L15 11 L26 13 L15 15 L13 26 L11 15 L0 13 L11 11 Z" fill="#CFE8FF" />
        </svg>
        <span className="absolute left-1/2 top-8 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] text-fg/40 group-hover:block">
          norte
        </span>
      </a>

      {/* CAPA 0 · el guía monumental — fundido con la noche, tras la tipografía */}
      <div
        className="pointer-events-none absolute inset-y-0 right-[-18%] flex w-[120vw] items-center justify-end sm:right-[-10%] sm:w-[92vw] lg:right-[-3%] lg:w-[62vw] lg:max-w-[1100px]"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Saludar al guía"
          onClick={wof}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wof(); } }}
          initial={reduced ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
          className={`pointer-events-auto relative w-full cursor-pointer outline-offset-8 ${liquid ? 'is-liquid' : ''}`}
          style={{
            transform: 'rotateX(calc(var(--rx, 0deg) * 0.6)) rotateY(calc(var(--ry, 0deg) * 0.6))',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="absolute inset-[6%] rounded-full blur-[130px]"
            style={{ background: 'var(--guia-glow)' }}
          />
          <Image
            src="/logo-mark.png"
            alt=""
            width={1060}
            height={980}
            priority
            className="guia-img relative h-auto w-full opacity-[0.20] sm:opacity-[0.26] lg:opacity-[0.34]"
          />
          {/* Los ojos del guía: reflejos del lente que siguen al cursor (se apagan al parpadear) */}
          <span
            className="absolute rounded-full blur-[1px] transition-opacity duration-100"
            style={{
              background: 'var(--ojo)',
              left: '60.5%', top: '43%', width: '1.7%', paddingBottom: '1.7%', opacity: blink ? 0 : 1,
              transform: 'translate3d(calc(var(--mx, 0) * 0.32px), calc(var(--my, 0) * 0.32px), 0)',
            }}
          />
          <span
            className="absolute rounded-full bg-white/60 transition-opacity duration-100"
            style={{
              left: '63.2%', top: '46.2%', width: '0.9%', paddingBottom: '0.9%', opacity: blink ? 0 : 1,
              transform: 'translate3d(calc(var(--mx, 0) * 0.32px), calc(var(--my, 0) * 0.32px), 0)',
            }}
          />
          {/* Párpado del parpadeo */}
          <span
            aria-hidden="true"
            className="absolute rounded-full transition-opacity duration-100"
            style={{
              left: '57.6%', top: '44.2%', width: '7.4%', height: '0.55%',
              background: '#26262B', transform: 'rotate(7deg)', opacity: blink ? 1 : 0,
            }}
          />
          {/* Ondas del saludo */}
          {wofAt && [0, 1, 2].map((r) => (
            <span
              key={`${wofAt}-${r}`}
              aria-hidden="true"
              className="wof-ring absolute rounded-full border-2"
              style={{
                borderColor: 'var(--ojo)', left: '54%', top: '36%', width: '14%', paddingBottom: '14%', animationDelay: `${r * 0.12}s` }}
            />
          ))}
          {wofAt && (
            <span
              aria-hidden="true"
              className="absolute select-none font-hand text-3xl text-[#D8E7FF]/90"
              style={{ left: '70%', top: '30%', transform: 'rotate(-10deg)' }}
            >
              wof*
            </span>
          )}
        </motion.div>
      </div>

      {/* Nota manuscrita al margen de la bitácora */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[5%] top-[17%] z-10 hidden -rotate-6 md:block">
        <p className="font-hand text-[26px] leading-none text-fg/60">
          {en ? 'the guide knows the route' : 'el guía conoce la ruta'}
        </p>
        <svg width="120" height="70" viewBox="0 0 120 70" className="-ml-1 mt-1">
          <path d="M100 6 C 80 34, 46 50, 14 58" stroke="rgb(var(--fg) / 0.45)" strokeWidth="1.5" fill="none" strokeDasharray="1 5" strokeLinecap="round" />
          <path d="M14 58 l14 -8 M14 58 l16 2" stroke="rgb(var(--fg) / 0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* ESQUELETO EDITORIAL · contenido */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="wrap">
          <motion.p {...fadeUp(0.1)} className="eyebrow mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-fg/30" />
            <Scramble text={en ? EN.hero.eyebrow : 'Estudio de diseño y desarrollo web'} trigger="load" />
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
                {en ? EN.hero.availability : 'Disponible para nuevas expediciones'}
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
              {en ? EN.hero.description : 'Cada negocio es una expedición. Nosotros conocemos la ruta: diseñamos y desarrollamos el sitio que lo lleva de idea a destino.'}
            </motion.p>
            <motion.div {...fadeUp(0.65)} className="flex items-center gap-6">
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-fg/30 md:block">
                <Scramble text="Scroll ↓" trigger="load" speed={45} />
              </span>
              <a
                href="#casos"
                className="group inline-flex items-center gap-2.5 rounded-full border border-fg/20 px-7 py-3 text-sm font-medium tracking-wide text-fg transition-colors duration-300 hover:border-hielo/60 hover:text-hielo"
              >
                {en ? EN.hero.cta : 'Ver la bitácora'}
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
