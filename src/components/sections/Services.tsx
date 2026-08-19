'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import type { ServicesContent } from '@/lib/types';

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Lista editorial de servicios: número gigante + nombre + descripción. */
export default function Services({ data }: { data: ServicesContent }) {
  return (
    <section
      id="servicios"
      className="relative -mt-10 rounded-t-[40px] border-t border-line bg-[#101013] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 w-full text-center font-serif font-light leading-none tracking-tight text-fg sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
        >
          {data.title}
        </motion.h2>

        <div className="flex flex-col">
          {data.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className={i > 0 ? 'border-t border-fg/10' : ''}
            >
              <div className="flex w-full items-start gap-6 py-8 sm:gap-8 sm:py-10 md:gap-10 md:py-12">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-serif font-light leading-none text-fg/90"
                  style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2 pt-1 sm:gap-4 md:gap-5">
                  <h3
                    className="font-medium uppercase tracking-wide text-fg"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 1.9rem)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-2xl font-light leading-relaxed text-fg/60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)' }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
