'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import Scramble, { DotsDivider } from '@/components/ui/Scramble';
import BeforeAfter from '@/components/ui/BeforeAfter';
import { Cap } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN, matchCase } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Paleta por cliente para portadas sin captura y acentos. */
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
  if (t.includes('zurita') && !t.includes('puerta')) return FLAVORS.zurita;
  if (t.includes('álvarez') || t.includes('alvarez')) return FLAVORS.alvarez;
  if (t.includes('puerta')) return FLAVORS.puerta;
  if (t.includes('a&f') || t.includes('abogado')) return FLAVORS.ayf;
  if (t.includes('aborigen')) return FLAVORS.aborigen;
  if (t.includes('cielo')) return FLAVORS.cielo;
  return { tone: 'linear-gradient(150deg, #14141c 0%, #0a0a10 70%)', ink: '#7cc7ff', mono: 'O.' };
}

/** Capturas del sitio anterior del cliente (antes/después). */
const ANTES: Record<string, string> = {
  'caso-puerta-grande': '/casos/puerta-grande-antes.webp',
};

function Card({ project, index, en, reduced }: { project: Project; index: number; en: boolean; reduced: boolean }) {
  const tr = en ? matchCase(project.title) : null;
  const flavor = flavorFor(project);
  const tags = project.tags ?? [];
  const category = tr?.cat ?? tags[0] ?? 'Caso de estudio';
  const stack = (tr?.tags ?? tags.slice(1)).slice(0, 3);
  const description = tr?.d ?? project.description;
  const antesSrc = ANTES[project.id];
  const [antesFail, setAntesFail] = useState(false);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
      data-scramble-parent
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fg/40"
    >
      {/* Portada */}
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: flavor.tone }}>
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 z-10 -rotate-6 rounded border-2 px-2 py-0.5 text-[8px] uppercase tracking-[0.22em] backdrop-blur-[2px]"
          style={{ borderColor: flavor.ink, color: flavor.ink, background: 'rgba(4,6,12,0.45)' }}
        >
          {en ? EN.cases.stamp : 'Destino alcanzado'}
        </span>
        {project.image_url && antesSrc && !antesFail ? (
          <BeforeAfter
            before={antesSrc}
            after={project.image_url}
            beforeLabel={en ? 'Before' : 'Antes'}
            afterLabel={en ? 'After' : 'Después'}
            alt={`Sitio web de ${project.title}`}
            onBeforeError={() => setAntesFail(true)}
          />
        ) : project.image_url ? (
          <Image
            src={project.image_url}
            alt={`Sitio web de ${project.title}`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <span aria-hidden="true" className="absolute right-4 top-2 text-[6rem] italic leading-none opacity-25" style={{ color: flavor.ink }}>
            {flavor.mono}
          </span>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="truncate text-[10px] uppercase tracking-[0.25em]" style={{ color: flavor.ink }}>
            <Scramble text={category} trigger="hover" speed={24} />
          </p>
          <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-fg/35">
            {en ? EN.cases.exp : 'Exp.'} {String(index + 1).padStart(3, '0')}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-fg">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted">{description}</p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
          <ul className="flex flex-wrap gap-1.5" aria-label={en ? EN.cases.aria : 'Alcance y tecnología'}>
            {stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-fg/60">
                {t}
              </li>
            ))}
          </ul>
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-fg transition-colors hover:text-hielo"
            >
              {en ? EN.cases.visit : 'Visitar'}
              <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/** Bitácora compacta: cuadrícula de expediciones completadas. */
export default function CaseStudies({ projects }: { projects: Project[] }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const reduced = useReducedMotion();
  const list = projects.filter((p) => p.published).slice(0, 9);

  return (
    <section id="casos" className="scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <Cap n="04" es="Bitácora" en="Logbook" />

        <div className="mb-10 grid gap-5 md:mb-12 md:grid-cols-[1.2fr,1fr] md:items-end">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hero-heading font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold uppercase leading-[0.95] tracking-tight"
          >
            {en ? EN.cases.title : 'Bitácora'}
          </motion.h2>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-[15px] md:justify-self-end">
            {en ? EN.cases.sub : 'Cada caso es una expedición completada: negocios reales que llevamos de la idea a su destino en línea.'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <Card key={p.id} project={p} index={i} en={en} reduced={!!reduced} />
          ))}
        </div>

        <DotsDivider />
        <div className="mt-8 text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2.5 rounded-full border border-fg/20 px-8 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-hielo/60 hover:text-hielo"
          >
            {en ? EN.cases.cta : '¿Tu negocio es la siguiente expedición?'}
            <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
