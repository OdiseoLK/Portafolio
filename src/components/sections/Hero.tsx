'use client';

import Image from 'next/image';
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

      {/* Emblema husky — flota con profundidad sobre la red */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[9%] top-[51%] hidden -translate-y-1/2 lg:block"
      >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -14, 0], rotateY: [-10, -6, -10] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformPerspective: 900, rotateX: 4 }}
          className="relative"
        >
          <div className="absolute inset-0 scale-110 rounded-full bg-white/10 blur-[100px]" />
          <Image
            src="/logo-mark.png"
            alt=""
            width={520}
            height={481}
            priority
            className="relative opacity-90 drop-shadow-[0_0_50px_rgba(255,255,255,0.12)]"
          />
        </motion.div>
      </motion.div>
      </div>



      {/* Contenido principal — arriba izquierda como la referencia */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 md:px-14 lg:pl-48 lg:pr-20">
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
