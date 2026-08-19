'use client';

import { motion } from 'framer-motion';
import type { ProcessContent } from '@/lib/types';

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Process({ data }: { data: ProcessContent }) {
  return (
    <section id="proceso" className="bg-[#101013] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center font-serif font-light leading-none tracking-tight text-fg sm:mb-20"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 100px)' }}
        >
          {data.title}
        </motion.h2>
        <div className="flex flex-col">
          {data.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className={i > 0 ? 'border-t border-fg/10' : ''}
            >
              <div className="flex w-full items-start gap-6 py-7 sm:gap-10 sm:py-9">
                <span aria-hidden="true" className="shrink-0 font-serif font-light leading-none text-fg/80" style={{ fontSize: 'clamp(2.4rem, 7vw, 88px)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2 pt-1 sm:gap-3">
                  <h3 className="font-medium uppercase tracking-wide text-fg" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.6rem)' }}>{step.title}</h3>
                  <p className="max-w-2xl font-light leading-relaxed text-fg/60" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>{step.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
