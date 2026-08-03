'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import type { ProcessContent } from '@/lib/types';

export default function Process({ data }: { data: ProcessContent }) {
  if (!data.steps.length) return null;

  return (
    <section id="proceso" className="scroll-mt-24 pb-28 md:pb-36">
      <div className="wrap">
        <SectionHeading eyebrow="Proceso" title={data.title} />

        <div className="grid border-t border-line/70 md:grid-cols-2">
          {data.steps.map((step, i) => (
            <Reveal
              key={`${step.title}-${i}`}
              delay={0.08 * i}
              className={`group border-b border-line/70 py-10 pr-6 md:pr-10 ${
                i % 2 === 0 ? 'md:border-r md:border-line/70' : 'md:pl-10'
              }`}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-muted transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-display text-xl font-medium text-fg">{step.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
