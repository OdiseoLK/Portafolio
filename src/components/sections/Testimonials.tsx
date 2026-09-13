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
 * Opiniones sobre el panel "deep" del cielo activo (vidrio).
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
      className="relative scroll-mt-24 overflow-hidden border-y border-line/60 py-20 backdrop-blur-md md:py-28"
      style={{ background: 'var(--deep)' }}
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

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          {list.map((t, i) => {
            const tr = en ? EN.testimonials.byId[t.id] : null;
            const num = String(i + 1).padStart(2, '0');
            return (
              <motion.figure
                key={t.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
                data-scramble-parent
                className="group relative flex flex-col rounded-2xl border border-line bg-card/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fg/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--marca)' }}>
                    <Scramble text={`${en ? EN.testimonials.signal : 'Señal'} ${num}`} trigger="hover" speed={26} />
                  </span>
                  <span aria-hidden="true" className="text-3xl italic leading-none text-fg/15">“</span>
                </div>

                <blockquote className="flex-1 text-[15px] font-light leading-relaxed text-fg/90">
                  {tr?.quote ?? t.quote}
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="h-px w-8 shrink-0" style={{ background: 'var(--marca)' }} />
                  <div className="min-w-0">
                    <p className="truncate font-display text-[13px] font-bold uppercase tracking-wide text-fg">{t.name}</p>
                    {t.role && (
                      <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.2em] text-muted">
                        {tr?.role ?? t.role}
                      </p>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
            </div>
    </section>
  );
}
