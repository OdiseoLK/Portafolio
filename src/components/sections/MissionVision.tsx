'use client';

import { motion } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

const BLOCKS = [
  {
    title: 'Misión',
    text: 'Crear productos digitales con intención: sitios y plataformas que combinan diseño, rendimiento y cuidado por el detalle, para que cada marca presente su mejor versión en línea.',
  },
  {
    title: 'Visión',
    text: 'Ser el estudio de referencia para negocios que quieren destacar en el mundo digital, demostrando que la simplicidad bien ejecutada es la forma más alta de sofisticación.',
  },
  {
    title: 'Valores',
    text: 'Intención en cada decisión. Simplicidad sin sacrificar carácter. Trato directo y cercano. Obsesión por el detalle. Compromiso con el resultado, no solo con la entrega.',
  },
];

export default function MissionVision() {
  return (
    <section className="bg-[#101013] px-5 pb-24 sm:px-8 md:px-10 md:pb-32">
      <div className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            className="liquid-glass flex flex-col gap-4 rounded-xl border border-line p-7 transition-all duration-500 hover:-translate-y-1 hover:border-fg/40 hover:shadow-[0_0_44px_rgba(99,102,241,0.18)] md:p-8"
          >
            <span aria-hidden="true" className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">0{i + 1}</span>
            <h3 className="font-serif text-3xl font-light tracking-tight text-fg">{b.title}</h3>
            <p className="text-sm font-light leading-relaxed text-fg/60">{b.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
