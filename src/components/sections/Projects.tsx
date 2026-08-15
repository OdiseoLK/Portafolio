'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
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
        <p className="font-display text-xl font-light tracking-tight text-fg md:text-2xl">
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


/** La imagen entera es clicable cuando el proyecto tiene sitio en vivo. */
function MediaWrapper({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  const cls = 'relative block aspect-video overflow-hidden border-b border-line bg-surface';
  if (project.project_url) {
    return (
      <a
        href={project.project_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visitar el sitio de ${project.title}`}
        className={`${cls} cursor-pointer`}
      >
        {children}
      </a>
    );
  }
  return <div className={cls}>{children}</div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <article className="group overflow-hidden rounded-lg border border-line bg-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-fg/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
        <MediaWrapper project={project}>
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={`Sitio web de ${project.title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span aria-hidden="true" className="font-display text-5xl font-light text-line">
                O.
              </span>
            </div>
          )}

          {/* Velo inferior sutil para legibilidad del nombre */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Nombre del proyecto — lo único que el cliente necesita leer */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 md:p-6">
            <h3 className="font-display text-lg font-light tracking-tight text-fg md:text-xl">
              {project.title}
            </h3>
            {project.project_url && (
              <span className="inline-flex translate-y-2 items-center gap-2 rounded-full border border-fg/30 bg-bg/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg opacity-0 backdrop-blur transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                Visitar ↗
              </span>
            )}
          </div>
        </MediaWrapper>
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
