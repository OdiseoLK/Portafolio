'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Project } from '@/lib/types';

function MediaWrapper({ project, children }: { project: Project; children: React.ReactNode }) {
  const cls = 'relative block h-full w-full overflow-hidden bg-surface';
  if (project.project_url) {
    return (
      <a href={project.project_url} target="_blank" rel="noopener noreferrer"
         aria-label={`Visitar el sitio de ${project.title}`} className={`${cls} cursor-pointer`}>
        {children}
      </a>
    );
  }
  return <div className={cls}>{children}</div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <article className="group aspect-square overflow-hidden rounded-xl border border-line bg-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-fg/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
        <MediaWrapper project={project}>
          {project.image_url ? (
            <Image src={project.image_url} alt={`Sitio web de ${project.title}`} fill
                   sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                   className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span aria-hidden="true" className="font-display text-5xl font-light text-line">O.</span>
            </div>
          )}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5">
            <h3 className="font-serif text-xl font-light tracking-tight text-fg">{project.title}</h3>
            {project.project_url && (
              <span className="inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-fg/30 bg-bg/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fg opacity-0 backdrop-blur transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
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
    <section id="proyectos" className="wrap py-24 md:py-32">
      <SectionHeading eyebrow="Proyectos" title="Trabajo seleccionado" />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 5).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
        <Reveal delay={0.5}>
          <a href="#contacto" className="group flex aspect-square flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-fg/25 bg-card/40 p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-fg/60">
            <span className="font-serif text-3xl font-light leading-tight text-fg">¿Tu proyecto<br />aquí?</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-fg">Hablemos →</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
