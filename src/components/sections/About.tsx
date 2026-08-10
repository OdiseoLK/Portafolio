import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import type { AboutContent } from '@/lib/types';

export default function About({ data }: { data: AboutContent }) {
  const [lead, ...rest] = data.paragraphs;

  return (
    <section id="sobre-mi" className="relative scroll-mt-24 overflow-hidden py-28 md:py-36">
      <span
        aria-hidden="true"
        className="grad-text pointer-events-none absolute -top-6 right-4 hidden select-none font-mono text-[200px] font-bold leading-none opacity-[0.06] lg:block"
      >
        {'</>'}
      </span>
      <div className="wrap">
        <SectionHeading eyebrow="Sobre mí" title={data.title} />

        <div className="grid gap-12 md:grid-cols-[1fr,1.7fr]">
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Diseño y desarrollo con una idea fija: menos ruido, más intención.
            </p>
          </Reveal>

          <div className="max-w-2xl space-y-6">
            {lead && (
              <Reveal delay={0.15}>
                <p className="font-display text-2xl font-medium tracking-tight text-fg md:text-3xl">
                  {lead}
                </p>
              </Reveal>
            )}
            {rest.map((paragraph, i) => (
              <Reveal key={i} delay={0.2 + i * 0.05}>
                <p className="leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
