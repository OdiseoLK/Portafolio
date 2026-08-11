'use client';

import { motion, useReducedMotion } from 'framer-motion';
import NodeNetwork from '@/components/ui/NodeNetwork';
import { ArrowRight } from 'lucide-react';

import type { HeroContent } from '@/lib/types';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ data }: { data: HeroContent }) {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 40%, #0a1628 0%, #03080f 60%, #000 100%)' }}
    >
      {/* Red de nodos animada */}
      <NodeNetwork className="absolute inset-0 h-full w-full" />



      {/* Contenido principal — arriba izquierda como la referencia */}
      <div className="relative z-10 flex flex-1 flex-col justify-start px-8 pt-8 md:px-14 md:pt-12 lg:px-20 lg:pt-16">
        <div className="max-w-4xl">
          <motion.p
            {...fadeUp(0.1)}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-fg/50"
          >
            Desarrollador Web
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-glow font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-fg"
          >
            Código con<br />
            <span className="italic">intención.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="mt-7 max-w-md text-sm leading-relaxed text-fg/60 md:text-base"
          >
            {data.description}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-8">
            <a
              href="#proyectos"
              className="button-glow group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-white/90"
            >
              Ver proyectos
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicador inferior izquierda — como "Experience with sound" de la referencia */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-8 z-20 hidden items-center gap-3 lg:flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-fg/20">
          <span className="h-3 w-px bg-fg/60" />
        </span>
        <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-fg/50">
          Orizaba<br />México
        </span>
      </motion.div>
    </section>
  );
}
