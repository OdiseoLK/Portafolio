'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { ProcessContent } from '@/lib/types';
import Scramble from '@/components/ui/Scramble';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Campamentos de la travesía (ES en código; EN desde translations). */
const CAMPS_ES = [
  { title: 'Campamento base', text: 'Entendemos el objetivo, el público y el contexto de tu negocio antes de trazar una sola línea.' },
  { title: 'Trazo de ruta', text: 'Definimos la estructura, la jerarquía visual y los detalles de interacción: el mapa completo del sitio.' },
  { title: 'La marcha', text: 'Construimos con tecnologías modernas, priorizando rendimiento, accesibilidad y código limpio.' },
  { title: 'Destino', text: 'Lanzamos, medimos y refinamos. Y el guía se queda: tu sitio evoluciona con datos y retroalimentación real.' },
];

const CAMPS_EN = [
  { title: 'Basecamp', text: EN.process.steps[0].text },
  { title: 'Route tracing', text: EN.process.steps[1].text },
  { title: 'The march', text: EN.process.steps[2].text },
  { title: 'Destination', text: 'We launch, measure and refine. And the guide stays: your site evolves with data and real feedback.' },
];

/**
 * La travesía: ruta punteada SVG que se dibuja con el scroll,
 * conectando 4 campamentos con banderines; el último es la estrella del destino.
 */
export default function Process({ data: _data }: { data: ProcessContent }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const camps = en ? CAMPS_EN : CAMPS_ES;
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.9'],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // Posiciones de los campamentos sobre la ruta (viewBox 0 0 1000 120)
  const stops = [
    { x: 40, y: 88 },
    { x: 353, y: 40 },
    { x: 646, y: 92 },
    { x: 960, y: 34 },
  ];

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="scroll-mt-24 border-y border-line/60 bg-gradient-to-b from-surface/70 to-surface/30 py-24 md:py-32"
    >
      <div className="wrap">
        <div className="mb-10 flex flex-col gap-4 md:mb-6 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-fg"
          >
            {en ? EN.process.title : 'La travesía'}
          </motion.h2>
          <p className="eyebrow">
            <Scramble text={en ? EN.process.eyebrow : 'Del puerto de salida al destino'} />
          </p>
        </div>

        {/* Ruta punteada que se dibuja con el scroll (desktop) */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <svg viewBox="0 0 1000 120" className="h-28 w-full overflow-visible">
            {/* Ruta fantasma */}
            <path
              d="M40 88 C 140 20, 260 20, 353 40 S 560 120, 646 92 S 880 10, 960 34"
              fill="none"
              stroke="rgba(242,245,250,0.10)"
              strokeWidth="1.5"
              strokeDasharray="2 8"
              strokeLinecap="round"
            />
            {/* Ruta dibujada por el scroll */}
            <motion.path
              d="M40 88 C 140 20, 260 20, 353 40 S 560 120, 646 92 S 880 10, 960 34"
              fill="none"
              stroke="url(#ruta-grad)"
              strokeWidth="2"
              strokeDasharray="2 8"
              strokeLinecap="round"
              style={reduced ? undefined : { pathLength: drawn }}
            />
            <defs>
              <linearGradient id="ruta-grad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#F4F4F5" />
                <stop offset="0.55" stopColor="#B9B9C2" />
                <stop offset="1" stopColor="#F4F4F5" />
              </linearGradient>
            </defs>
            {/* Campamentos: banderines; el destino es estrella */}
            {stops.map((p, i) =>
              i < stops.length - 1 ? (
                <g key={i} transform={`translate(${p.x} ${p.y})`}>
                  <circle r="4" fill="#0B1020" stroke="#C9C9CF" strokeWidth="1.5" />
                  <line x1="0" y1="-4" x2="0" y2="-20" stroke="#C9C9CF" strokeWidth="1.5" />
                  <path d="M0 -20 L14 -15.5 L0 -11 Z" fill="#E7E7EA" />
                </g>
              ) : (
                <g key={i} transform={`translate(${p.x} ${p.y})`}>
                  <path
                    d="M0 -13 L2.6 -3.6 L12 0 L2.6 3.6 L0 13 L-2.6 3.6 L-12 0 L-2.6 -3.6 Z"
                    fill="#CFE8FF"
                    className="drop-shadow-[0_0_8px_rgba(124,199,255,0.9)]"
                  />
                </g>
              ),
            )}
          </svg>
        </div>

        <ol className="grid gap-10 sm:grid-cols-2 lg:mt-2 lg:grid-cols-4">
          {camps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className="relative border-t border-line pt-5 lg:border-t-0 lg:pt-0"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-menta">
                <Scramble text={`${String(i + 1).padStart(2, '0')} /`} speed={50} />
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
