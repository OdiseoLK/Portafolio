'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { AboutContent } from '@/lib/types';

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Un carácter que se ilumina según el avance del scroll. */
function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const p = index / total;
  const start = Math.max(0, p - 0.1);
  const end = Math.min(1, p + 0.05);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

/** "El estudio": título gigante en degradado + texto que se revela al hacer scroll. */
export default function About({ data }: { data: AboutContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const text = data.paragraphs.join(' ');
  const chars = text.split('');

  return (
    <section id="sobre-mi" className="relative px-5 pb-24 pt-4 sm:px-8 md:px-10 md:pb-32">
      <div
        ref={ref}
        className="mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center gap-14 text-center sm:gap-16 md:gap-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full font-serif font-light uppercase leading-none tracking-tight"
          style={{
            fontSize: 'clamp(3rem, 12vw, 150px)',
            background: 'linear-gradient(180deg, #646973 0%, #E8EDF2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {data.title}
        </motion.h2>

        <p
          className="max-w-[620px] text-center font-light leading-relaxed text-fg"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
        >
          {chars.map((c, i) => (
            <Char key={i} char={c} index={i} total={chars.length} progress={scrollYProgress} />
          ))}
        </p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          href="#contacto"
          className="button-glow rounded-full bg-white px-10 py-3.5 text-xs font-medium uppercase tracking-widest text-black transition-opacity duration-200 hover:opacity-90 active:opacity-75 sm:px-12 sm:py-4 sm:text-sm"
        >
          Contáctanos
        </motion.a>
      </div>
    </section>
  );
}
