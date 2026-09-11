'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import Scramble, { DotsDivider } from '@/components/ui/Scramble';
import { useLang } from '@/components/ui/LanguageContext';
import { EN, matchCase } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Paleta tipográfica por cliente para las portadas sin captura. */
const FLAVORS: Record<string, { tone: string; ink: string; mono: string }> = {
  decora:  { tone: 'linear-gradient(150deg, #201812 0%, #100d0a 70%)', ink: '#d8b98a', mono: 'D.' },
  zurita:  { tone: 'linear-gradient(150deg, #0a2023 0%, #081013 70%)', ink: '#6fd3c7', mono: 'Z.' },
  alvarez: { tone: 'linear-gradient(150deg, #1b1512 0%, #0b0a09 70%)', ink: '#c9a074', mono: 'A.' },
  puerta:  { tone: 'linear-gradient(150deg, #0c1526 0%, #080a12 70%)', ink: '#7cc7ff', mono: 'P.' },
  ayf:     { tone: 'linear-gradient(150deg, #0d1730 0%, #090d1a 70%)', ink: '#d4b26a', mono: 'A&F' },
  aborigen:{ tone: 'linear-gradient(150deg, #1c110a 0%, #0d0806 70%)', ink: '#e07b39', mono: 'AB.' },
  cielo:   { tone: 'linear-gradient(150deg, #201510 0%, #100b08 70%)', ink: '#d9a05b', mono: 'C.' },
};

function flavorFor(p: Project) {
  const t = p.title.toLowerCase();
  if (t.includes('decora')) return FLAVORS.decora;
  if (t.includes('zurita') || t.includes('fundación')) return FLAVORS.zurita;
  if (t.includes('álvarez') || t.includes('alvarez')) return FLAVORS.alvarez;
  if (t.includes('puerta')) return FLAVORS.puerta;
  if (t.includes('a&f') || t.includes('abogado')) return FLAVORS.ayf;
  if (t.includes('aborigen')) return FLAVORS.aborigen;
  if (t.includes('cielo')) return FLAVORS.cielo;
  return { tone: 'linear-gradient(150deg, #14141c 0%, #0a0a10 70%)', ink: '#7cc7ff', mono: 'O.' };
}

function Card({
  project, index, total, progress, reduced, en,
}: {
  project: Project; index: number; total: number;
  progress: MotionValue<number>; reduced: boolean; en: boolean;
}) {
  const tr = en ? matchCase(project.title) : null;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const flavor = flavorFor(project);
  const tags = project.tags ?? [];
  const upcoming = /próximamente/i.test(tags.join(' '));
  const category = tr?.cat ?? tags[0] ?? 'Caso de estudio';
  const stack = tr?.tags ?? tags.slice(1);
  const description = tr?.d ?? project.description;

  return (
    <div className="sticky top-24 md:top-28" style={{ paddingTop: index * 24 }}>
      <motion.article
        style={reduced ? undefined : { scale }}
        className="overflow-hidden rounded-[32px] border border-fg/[0.12] bg-bg md:rounded-[44px]"
      >
        {/* Fila superior editorial */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-fg/[0.08] p-6 md:p-8">
          <span className="font-display text-5xl font-bold leading-none text-fg/[0.15] md:text-7xl">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: flavor.ink }}>
              <Scramble text={category} trigger="hover" speed={24} />
            </p>
            <h3 className="mt-1 truncate font-display text-xl font-bold tracking-tight text-fg md:text-3xl">
              {project.title}
            </h3>
          </div>
          {upcoming ? (
            <span className="rounded-full border border-hielo/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-hielo">
              Próximamente
            </span>
          ) : project.project_url ? (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-fg/25 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg transition-colors hover:border-hielo/60 hover:text-hielo"
            >
              {en ? EN.cases.visit : 'Visitar sitio'}
              <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="rounded-full border border-lima/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-lima/90">
              Entregado
            </span>
          )}
        </div>

        {/* Cuerpo: portada + descripción */}
        <div className="grid gap-6 p-6 md:grid-cols-[1.1fr,1fr] md:gap-8 md:p-8">
          <div
            className="relative flex aspect-[16/10] items-end overflow-hidden rounded-3xl border border-fg/[0.06] p-6"
            style={{ background: flavor.tone }}
          >
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={`Sitio web de ${project.title}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <span aria-hidden="true" className="absolute right-5 top-3 font-serif text-[7rem] italic leading-none opacity-25 md:text-[9rem]" style={{ color: flavor.ink }}>
                  {flavor.mono}
                </span>
                <p className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40">
                  {project.title}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col justify-between gap-6">
            <p className="text-sm leading-relaxed text-muted md:text-[15px]">{description}</p>
            {stack.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label={en ? EN.cases.aria : 'Alcance y tecnología'}>
                {stack.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/60">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function CaseStudies({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const list = projects.filter((p) => p.published).slice(0, 8);

  return (
    <section id="casos" className="scroll-mt-24 py-24 md:py-32">
      <div className="wrap">
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="hero-heading mb-6 text-center font-display text-[clamp(3rem,11vw,9rem)] font-bold uppercase leading-none tracking-tight"
        >
          {en ? EN.cases.title : 'Casos'}
        </motion.h2>
        <p className="mx-auto mb-16 max-w-md text-center text-sm leading-relaxed text-muted md:mb-20">
          {en ? EN.cases.sub : 'Sitios en producción para negocios reales: cada caso se diseñó desde el mundo del cliente, no desde una plantilla.'}
        </p>

        <div ref={containerRef} className="flex flex-col gap-[12vh]">
          {list.map((p, i) => (
            <Card key={p.id} project={p} index={i} total={list.length} progress={scrollYProgress} reduced={!!reduced} en={en} />
          ))}
        </div>

        <DotsDivider />
        <div className="mt-14 text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2.5 rounded-full border border-fg/20 px-8 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-hielo/60 hover:text-hielo"
          >
            {en ? EN.cases.cta : '¿Tu negocio es el siguiente caso?'}
            <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
