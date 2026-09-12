'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Testimonial } from '@/lib/types';
import Scramble, { DotsDivider } from '@/components/ui/Scramble';
import { Cap } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';
import { DEFAULT_CONTENT } from '@/lib/defaults';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Opiniones sobre negro profundo (#030304) para máximo contraste.
 * Cada testimonio vive en un panel con marco de visor (esquinas en L),
 * retícula de puntos, auroras hielo/violeta y coordenadas mono.
 */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const reduced = useReducedMotion();
  let list = items.filter((t) => t.approved);
  // Red de seguridad: si la base aún no tiene testimonios aprobados,
  // se muestran los del código para que la sección nunca desaparezca.
  if (list.length === 0) list = DEFAULT_CONTENT.testimonials.filter((t) => t.approved);
  if (list.length === 0) return null;

  return (
    <section
      id="opiniones"
      className="relative scroll-mt-24 overflow-hidden border-y border-line/60 py-24 md:py-36"
      style={{ background: '#030304' }}
    >
      {/* Retícula de puntos de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--fg) / 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 75%)',
        }}
      />
      {/* Auroras */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-[15%] h-[50vmin] w-[60vmin] rounded-full opacity-40 blur-[100px]" style={{ background: 'radial-gradient(circle, rgb(var(--fg) / 0.05), transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[8%] bottom-[10%] h-[45vmin] w-[55vmin] rounded-full opacity-40 blur-[100px]" style={{ background: 'radial-gradient(circle, rgb(var(--fg) / 0.04), transparent 65%)' }} />

      {/* Comilla fantasma gigante */}
      <span aria-hidden="true" className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-serif text-[24rem] italic leading-none text-fg/[0.04] md:text-[36rem]">
        “
      </span>

      {/* Ornamentos de esquina de la sección */}
      <span aria-hidden="true" className="pointer-events-none absolute left-6 top-8 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-fg/25 md:block">
        <Scramble text={en ? EN.testimonials.corner : 'radio · señales'} />
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden font-serif text-2xl italic text-fg/30 md:block">*</span>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-8 left-6 hidden text-fg/20 md:block">+</span>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-8 right-6 hidden font-mono text-[10px] tracking-[0.3em] text-fg/25 md:block">/ 26</span>

      <div className="wrap relative">
        <Cap n="05" es="Señales" en="Signals" />
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <p className="eyebrow">
            <Scramble text={en ? EN.testimonials.eyebrow : 'Señales desde el destino'} />
          </p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="hero-heading font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold uppercase leading-none tracking-tight"
          >
            {en ? EN.testimonials.title : 'Lo que dicen'}
          </motion.h2>
        </div>

        <DotsDivider />

        <div className="mt-10 flex flex-col gap-16 md:mt-14 md:gap-24">
          {list.map((t, i) => {
            const tr = en ? EN.testimonials.byId[t.id] : null;
            const num = String(i + 1).padStart(2, '0');
            return (
              <motion.figure
                key={t.id}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '80px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                data-scramble-parent
                className="group relative mx-auto w-full max-w-4xl px-6 py-10 md:px-14 md:py-14"
              >
                {/* Marco de visor: esquinas en L */}
                <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l border-t border-fg/35 transition-colors duration-500 group-hover:border-fg/80" />
                <span aria-hidden="true" className="absolute right-0 top-0 h-6 w-6 border-r border-t border-fg/35 transition-colors duration-500 group-hover:border-fg/80" />
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-fg/35 transition-colors duration-500 group-hover:border-fg/80" />
                <span aria-hidden="true" className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-fg/35 transition-colors duration-500 group-hover:border-fg/80" />

                {/* Etiquetas del marco */}
                <span aria-hidden="true" className="absolute -top-2.5 left-10 bg-[#030304] px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/60">
                  <Scramble text={`${en ? EN.testimonials.signal : 'Señal'} ${num}`} trigger="hover" speed={26} />
                </span>
                <span aria-hidden="true" className="absolute -bottom-2.5 right-10 bg-[#030304] px-3 font-serif text-xl italic leading-none text-muted">
                  *
                </span>

                {/* Glow interior sutil */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgb(var(--fg) / 0.05), transparent 70%)' }} />

                <span aria-hidden="true" className="absolute -top-6 left-4 font-serif text-[5.5rem] italic leading-none text-fg/20 md:-left-4 md:text-[7rem]">
                  “
                </span>

                <blockquote className="relative font-serif text-[clamp(1.2rem,2.6vw,1.75rem)] font-light leading-[1.6] text-fg/95">
                  {tr?.quote ?? t.quote}
                </blockquote>

                <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="h-px w-12 bg-gradient-to-r from-fg/60 to-fg/20" />
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-fg">{t.name}</p>
                    {t.role && (
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {tr?.role ?? t.role}
                      </p>
                    )}
                  </div>
                  <span aria-hidden="true" className="ml-auto hidden font-mono text-[10px] tracking-[0.3em] text-fg/25 sm:block">
                    {num} / {String(list.length).padStart(2, '0')}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
