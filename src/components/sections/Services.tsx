'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ServicesContent } from '@/lib/types';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Lista editorial numerada: número enorme a la izquierda, servicio a la derecha. */
export default function Services({ data }: { data: ServicesContent }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const items = en ? EN.services.items : data.items;
  const title = en ? EN.services.title : data.title;
  const reduced = useReducedMotion();

  return (
    <section id="servicios" className="scroll-mt-24 py-24 md:py-32">
      <div className="wrap">
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="hero-heading mb-16 text-center font-display text-[clamp(3rem,11vw,9rem)] font-bold uppercase leading-none tracking-tight md:mb-24"
        >
          {title}
        </motion.h2>

        <div className="mx-auto max-w-5xl">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group flex flex-col gap-4 border-b border-fg/[0.09] py-10 first:border-t sm:flex-row sm:items-start sm:gap-10 md:py-12"
            >
              <span className="font-display text-[clamp(3rem,9vw,7.5rem)] font-bold leading-none text-fg/[0.13] transition-colors duration-500 group-hover:text-aurora/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="sm:pt-2">
                <h3 className="font-display text-[clamp(1.15rem,2.2vw,1.8rem)] font-medium uppercase tracking-wide text-fg transition-colors duration-300 group-hover:text-hielo">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
