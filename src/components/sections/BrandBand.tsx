'use client';

import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const PILLARS = [
  {
    title: 'Lo que tu marca merece',
    text: 'Sabemos lo importante que es tu marca para ti y para tus clientes. Por eso entregamos sitios con la calidad que tu marca merece, cuidados hasta el último detalle.',
  },
  {
    title: 'Trato directo y cercano',
    text: 'Trabajas directamente con el estudio de principio a fin. Sin ejecutivos de cuenta ni mensajes perdidos: quien diseña tu sitio es quien te responde.',
  },
  {
    title: 'Mucho más que un sitio web',
    text: 'No creamos sitios aburridos y tradicionales. Creamos experiencias que conectan tu marca con tu audiencia y convierten visitas en clientes.',
  },
];

/** Banda de propuesta de valor: tu sitio web, para ti y tu marca. */
export default function BrandBand() {
  return (
    <section className="border-y border-line/60 py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <h2 className="text-center font-serif font-light leading-[1.05] tracking-tight text-fg text-glow" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 84px)' }}>
            Tu sitio web, para ti y para tu marca.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.08 * i}>
              <div className="border-t border-line pt-7">
                <h3 className="font-display text-lg font-normal text-fg">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <a
            href="#contacto"
            className="group mt-14 inline-flex items-center gap-2.5 text-sm font-medium text-fg transition-colors duration-300 hover:text-white"
          >
            <span className="border-b border-fg/40 pb-0.5 transition-colors duration-300 group-hover:border-fg">
              Trabajemos en tu marca
            </span>
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
