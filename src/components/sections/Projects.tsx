'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import type { Project } from '@/lib/types';

function EmptyState() {
  const reduced = useReducedMotion();
  return (
    <Reveal>
      <div className="relative mx-auto max-w-3xl rounded-lg border border-line bg-card/60 px-8 py-16 text-center md:px-16 md:py-24">
        <div className="mb-8 flex items-center justify-center gap-3">
          <motion.span
            aria-hidden="true"
            className="block h-1.5 w-1.5 rounded-full bg-accent"
            animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="eyebrow">En desarrollo</span>
        </div>
        <p className="font-display text-xl font-medium tracking-tight text-fg md:text-2xl">
          Actualmente me encuentro desarrollando nuevos proyectos.
        </p>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
          Próximamente compartiré casos de estudio completos donde mostraré el proceso de diseño,
          desarrollo y las decisiones técnicas detrás de cada proyecto.
        </p>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card transition-colors duration-300 hover:border-accent/40 hover:shadow-[0_0_32px_-8px_rgba(139,92,246,0.3)]">
        <div className="relative aspect-video overflow-hidden border-b border-line bg-surface">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={`Vista previa de ${project.title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span aria-hidden="true" className="font-display text-5xl font-medium text-line">
                O.
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="flex items-start justify-between gap-4 font-display text-xl font-medium tracking-tight text-fg">
            {project.title}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="mt-1 shrink-0 text-muted transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </h3>
          {project.description && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
          )}
          {project.tags && project.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex items-center gap-5 pt-6">
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
              >
                Ver proyecto
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Código de ${project.title} en GitHub`}
                className="text-muted transition-colors hover:text-fg"
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="proyectos" className="scroll-mt-24 py-28 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow="Proyectos" title="Trabajo seleccionado" />
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
