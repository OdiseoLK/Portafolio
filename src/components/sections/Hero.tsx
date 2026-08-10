'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { TextReveal } from '@/components/ui/Reveal';
import CodeWindow from '@/components/ui/CodeWindow';
import ParticleGlobe from '@/components/ui/ParticleGlobe';
import type { HeroContent } from '@/lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Marcas de registro en las esquinas, como en un plano técnico. */
function CornerMarks() {
  const cls = 'absolute h-3.5 w-3.5 border-fg/25';
  return (
    <>
      <span aria-hidden="true" className={`${cls} -left-px -top-px border-l border-t`} />
      <span aria-hidden="true" className={`${cls} -right-px -top-px border-r border-t`} />
      <span aria-hidden="true" className={`${cls} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden="true" className={`${cls} -bottom-px -right-px border-b border-r`} />
    </>
  );
}

export default function Hero({ data }: { data: HeroContent }) {
  const reduced = useReducedMotion();
  const cvHref = data.cvUrl || '/cv.pdf';

  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Resplandores de ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-8 h-[380px] w-[380px] rounded-full bg-lima/10 blur-[150px]"
      />

      <div className="wrap grid items-center gap-14 pb-24 pt-32 lg:grid-cols-[1.35fr,1fr] lg:gap-20 lg:pb-16 lg:pt-24">
        {/* Columna de texto */}
        <div>
          <motion.p {...fadeUp(0.1)} className="eyebrow mb-8 !text-lima">
            Desarrollador Web
          </motion.p>

          <h1 className="font-display text-[clamp(3.75rem,13vw,9rem)] font-medium leading-[0.95] tracking-tight text-fg">
            <TextReveal text="ODISEO" delay={0.2} />
            <span aria-hidden="true" className="animate-caret ml-2 inline-block text-accent">
              _
            </span>
          </h1>

          <motion.span
            {...fadeUp(0.55)}
            aria-hidden="true"
            className="grad-bg mt-6 block h-1 w-24 rounded-full"
          />

          <motion.p
            {...fadeUp(0.65)}
            className="mt-7 font-display text-lg font-normal tracking-wide text-muted md:text-2xl"
          >
            {data.roles.map((role, i) => {
              const colors = ['text-accent', 'text-fg', 'text-lima'];
              return (
                <span key={role} className={`${colors[i % colors.length]} mr-3 font-medium md:mr-4`}>
                  {role}
                  <span className="text-muted">.</span>
                </span>
              );
            })}
          </motion.p>

          <motion.p {...fadeUp(0.8)} className="mt-7 max-w-xl leading-relaxed text-muted">
            {data.description}
          </motion.p>

          {data.availability?.enabled && data.availability.label && (
            <motion.p
              {...fadeUp(0.9)}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lima opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lima" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                {data.availability.label}
              </span>
            </motion.p>
          )}

          <motion.div {...fadeUp(1.0)} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#proyectos"
              className="grad-bg group inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 text-sm font-semibold text-bg transition-all duration-300 hover:shadow-[0_0_28px_rgba(139,92,246,0.4)] hover:brightness-110"
            >
              Ver proyectos
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border border-line px-6 py-3.5 text-sm text-fg transition-colors duration-300 hover:border-accent hover:text-white"
            >
              <Download size={15} aria-hidden="true" />
              Descargar CV
            </a>
          </motion.div>
        </div>

        {/* Visual: foto real si la subes, editor de código mientras tanto */}
        {data.photoUrl ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mx-auto w-full max-w-sm lg:max-w-none"
          >
            <figure className="relative aspect-[4/5] border border-line bg-card">
              <CornerMarks />
              <Image
                src={data.photoUrl}
                alt="Fotografía de Alexis, creador de ODISEO"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
              <figcaption className="absolute -bottom-7 right-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
                Fig. 01 — Odiseo
              </figcaption>
            </figure>
          </motion.div>
        ) : (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ParticleGlobe className="absolute -right-36 -top-40 hidden h-[480px] w-[480px] opacity-80 lg:block" />
            <div className="relative">
              <CodeWindow />
            </div>
          </div>
        )}
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted/70">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-accent"
            animate={reduced ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
