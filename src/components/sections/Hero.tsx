'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import type { HeroContent } from '@/lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Paleta de sintaxis para el panel de código */
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent">{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neutral-300">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-lima">{children}</span>
);
const N = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neutral-200">{children}</span>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neutral-400">{children}</span>
);

export default function Hero({
  data,
  projectCount,
}: {
  data: HeroContent;
  projectCount: number;
}) {
  const reduced = useReducedMotion();
  const cvHref = data.cvUrl || '/cv.pdf';
  const roles = data.roles.length ? data.roles : ['Código', 'Diseño', 'Experiencias'];

  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-28 md:py-24"
    >
      {/* Resplandores de ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-16 h-[380px] w-[380px] rounded-full bg-lima/10 blur-[150px]"
      />

      <div className="wrap relative grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-10">
        {/* Divisor central: humano | máquina */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden h-4/5 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-line to-transparent lg:block"
        />

        {/* ===== Lado humano ===== */}
        <div className="lg:pr-12">
          {data.photoUrl && (
            <motion.div {...fadeUp(0.05)} className="mb-8 flex items-center gap-4">
              <span className="grad-bg rounded-full p-px">
                <span className="block h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src={data.photoUrl}
                    alt="Fotografía de Alexis, creador de ODISEO"
                    width={56}
                    height={56}
                    priority
                    className="h-full w-full object-cover"
                  />
                </span>
              </span>
              <span>
                <span className="block text-sm font-medium text-fg">Alexis</span>
                <span className="block font-mono text-[11px] text-muted">
                  Orizaba, Veracruz — MX
                </span>
              </span>
            </motion.div>
          )}

          <motion.p {...fadeUp(0.1)} className="eyebrow mb-8 !text-lima">
            <span className="font-mono text-accent">{'//'}</span> Desarrollador Web
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-display text-[clamp(3.25rem,10vw,7rem)] font-light leading-[0.92] tracking-[-0.03em] text-fg"
          >
            ODISEO
            <span aria-hidden="true" className="animate-caret text-accent">
              _
            </span>
          </motion.h1>

          <motion.span
            {...fadeUp(0.35)}
            aria-hidden="true"
            className="grad-bg mt-6 block h-1 w-24 rounded-full"
          />

          <motion.p
            {...fadeUp(0.45)}
            className="mt-7 font-display text-lg tracking-wide md:text-2xl"
          >
            {roles.map((role, i) => {
              const colors = ['text-accent', 'text-fg', 'text-lima'];
              return (
                <span key={role} className={`${colors[i % colors.length]} mr-3 font-medium md:mr-4`}>
                  {role}
                  <span className="text-muted">.</span>
                </span>
              );
            })}
          </motion.p>

          <motion.p {...fadeUp(0.55)} className="mt-7 max-w-xl leading-relaxed text-muted">
            {data.description}
          </motion.p>

          {data.availability?.enabled && data.availability.label && (
            <motion.p
              {...fadeUp(0.65)}
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

          <motion.div {...fadeUp(0.75)} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#proyectos"
              className="grad-bg group inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 text-sm font-semibold text-bg transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.4)] hover:brightness-110"
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
              className="inline-flex items-center gap-2.5 rounded-md border border-line px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-white"
            >
              <Download size={15} aria-hidden="true" />
              Descargar CV
            </a>
          </motion.div>
        </div>

        {/* ===== Lado máquina ===== */}
        <motion.div
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="relative select-none lg:pl-12"
        >
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-accent/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 rounded-full bg-lima/15 blur-[100px]" />

          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-xl p-px [background:linear-gradient(135deg,rgba(255,255,255,.55),rgba(37,37,37,.9)_38%,rgba(37,37,37,.9)_62%,rgba(163,163,163,.5))]"
          >
            <div className="overflow-hidden rounded-[11px] bg-[#0c0c11]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
              <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </span>
                <p className="font-mono text-[11px] tracking-wide text-muted">
                  odiseo / <span className="text-fg">identidad.ts</span>
                </p>
              </div>

              <pre className="overflow-x-auto px-6 py-6 font-mono text-[12.5px] leading-[2] md:text-sm">
                <code className="text-fg/90">
                  <K>const</K> <span className="font-semibold text-fg">alexis</span>{' '}
                  <span className="text-muted">=</span> {'{'}
                  {'\n'}
                  {'  '}
                  <P>rol</P>
                  <span className="text-muted">:</span> <S>&apos;Desarrollador Web&apos;</S>
                  <span className="text-muted">,</span>
                  {'\n'}
                  {'  '}
                  <P>frontend</P>
                  <span className="text-muted">:</span> <S>[&apos;React&apos;, &apos;Next.js&apos;, &apos;TypeScript&apos;]</S>
                  <span className="text-muted">,</span>
                  {'\n'}
                  {'  '}
                  <P>backend</P>
                  <span className="text-muted">:</span> <S>[&apos;Node.js&apos;, &apos;Supabase&apos;]</S>
                  <span className="text-muted">,</span>
                  {'\n'}
                  {'  '}
                  <P>base</P>
                  <span className="text-muted">:</span> <S>&apos;Orizaba, MX&apos;</S>
                  <span className="text-muted">,</span>
                  {'\n'}
                  {'  '}
                  <P>proyectos</P>
                  <span className="text-muted">:</span> <N>{projectCount > 0 ? projectCount : 4}</N>
                  <span className="text-muted">,</span>
                  {'\n'}
                  {'  '}
                  <P>disponible</P>
                  <span className="text-muted">:</span> <B>true</B>
                  <span className="text-muted">,</span>
                  {'\n'}
                  {'}'}
                  <span className="text-muted">;</span>
                  {'\n'}
                  {'\n'}
                  <span className="font-semibold text-fg">alexis</span>
                  <span className="text-muted">.</span>
                  <S>construir</S>
                  <span className="text-muted">(</span>
                  <S>&apos;tu proyecto&apos;</S>
                  <span className="text-muted">)</span>
                  <span className="text-muted">;</span>
                  <span className="animate-caret ml-1 inline-block text-lima">▌</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
