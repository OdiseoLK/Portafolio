'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ProcessContent } from '@/lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Proceso en 4 columnas editoriales conectadas por una regla continua. */
export default function Process({ data }: { data: ProcessContent }) {
  const reduced = useReducedMotion();

  return (
    <section id="proceso" className="scroll-mt-24 border-y border-line/60 bg-gradient-to-b from-surface/70 to-surface/30 py-24 md:py-32">
      <div className="wrap">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-fg"
          >
            {data.title}
          </motion.h2>
          <p className="eyebrow">De la idea al lanzamiento</p>
        </div>

        <div className="rule mb-10" />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-menta">
                {String(i + 1).padStart(2, '0')} /
              </p>
              <h3 className="mt-4 font-display text-lg font-medium uppercase tracking-wide text-fg">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
