'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import type { ServicesContent } from '@/lib/types';

/** Tipos de trabajo que ofrezco — inspirado en las "soluciones" de agencia. */
export default function Services({ data }: { data: ServicesContent }) {
  if (!data.items.length) return null;

  return (
    <section id="servicios" className="scroll-mt-24 pb-28 md:pb-36">
      <div className="wrap">
        <SectionHeading eyebrow="Servicios" title={data.title} />

        <div className="grid gap-4 md:grid-cols-2">
          {data.items.map((item, i) => (
            <Reveal key={`${item.title}-${i}`} delay={0.06 * i}>
              <article className="group h-full rounded-lg border border-line bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-fg/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] md:p-10">
                <p className="font-mono text-xs tracking-[0.3em] text-muted transition-colors duration-300 group-hover:text-fg">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-display text-2xl font-light tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
