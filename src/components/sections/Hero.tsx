'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siWhatsapp } from 'simple-icons';

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
export default function Hero({ data, whatsappUrl }: { data: HeroContent; whatsappUrl: string }) {
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
        className="pointer-events-none absolute bottom-0 right-[-15%] flex h-[52%] w-[78vw] items-end justify-end sm:inset-y-0 sm:bottom-auto sm:right-[-8%] sm:h-auto sm:w-[70vw] sm:items-center lg:right-[-2%] lg:w-[56vw] lg:max-w-[1000px]"
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
            src="/logo-mark.webp"
            alt=""
            width={1060}
            height={980}
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 1100px"
            className="guia-img relative h-auto w-full max-h-full object-contain opacity-[0.14] sm:opacity-[0.24] lg:opacity-[0.32]"
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

      {/* Velo de legibilidad: asegura contraste del texto sobre el husky/cielo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(100deg, rgb(var(--bg) / 0.55) 0%, rgb(var(--bg) / 0.25) 42%, transparent 68%)' }}
      />

      {/* HOOK primero: promesa grande, marca en segundo plano */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="wrap">
          <motion.p {...fadeUp(0.1)} className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-fg/30" />
            <Scramble text={en ? EN.hero.eyebrow : 'Diseño y desarrollo web · Orizaba, México'} trigger="load" />
          </motion.p>

          {/* EL HOOK — lo primero y más grande */}
          <h1 className="relative z-[2] max-w-[16ch]">
            <span className="sr-only">
              {en ? 'Your business deserves a website that sells.' : 'Tu negocio merece una página web que venda.'}
            </span>
            <motion.span
              {...fadeUp(0.18)}
              aria-hidden="true"
              className="block font-display text-[clamp(2.6rem,8.5vw,7rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-fg"
            >
              {en ? EN.hero.hookA : 'Tu negocio merece'}
            </motion.span>
            <motion.span
              {...fadeUp(0.28)}
              aria-hidden="true"
              className="hero-heading block font-display text-[clamp(2.6rem,8.5vw,7rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em]"
            >
              {en ? EN.hero.hookB : 'una página web'}
            </motion.span>
            <motion.span
              {...fadeUp(0.36)}
              aria-hidden="true"
              className="block font-display text-[clamp(2.6rem,8.5vw,7rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em]"
              style={{ color: 'var(--marca)' }}
            >
              {en ? EN.hero.hookC : 'que venda.'}
            </motion.span>
          </h1>

          {/* Subtítulo que explica en una línea */}
          <motion.p
            {...fadeUp(0.46)}
            className="relative z-[2] mt-6 max-w-xl text-[15px] font-medium leading-relaxed text-fg/80 md:text-base"
          >
            {en ? EN.hero.sub : 'Diseñamos y desarrollamos sitios web rápidos y a la medida que convierten visitas en clientes. De la idea al lanzamiento, y nos quedamos después.'}
          </motion.p>

          {/* CTAs claros */}
          <motion.div {...fadeUp(0.56)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-[#04120a] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d={siWhatsapp.path} />
              </svg>
              {en ? EN.hero.cta : 'Empezar por WhatsApp'}
            </a>
            <a
              href="#casos"
              className="group inline-flex items-center gap-2 rounded-full border border-fg/25 px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg/50"
            >
              {en ? EN.hero.cta2 : 'Ver nuestro trabajo'}
              <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {data.availability.enabled && (
            <motion.div {...fadeUp(0.66)} className="mt-8 inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lima opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lima" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg/60">
                {en ? EN.hero.availability : 'Disponible para nuevos proyectos'}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Marca discreta abajo + scroll (el logo pasa a segundo término) */}
      <div className="relative z-10 pb-8">
        <div className="wrap">
          <div className="rule mb-5" />
          <div className="flex items-center justify-between">
            <span className="font-display text-xs font-medium tracking-[0.28em] text-fg/50">
              ODISEO<span className="font-serif italic tracking-normal text-fg/30">&nbsp;studio</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-fg/30 md:block">
              <Scramble text={en ? 'Scroll ↓' : 'Scroll ↓'} trigger="load" speed={45} />
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
