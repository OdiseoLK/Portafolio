'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import type { AboutContent } from '@/lib/types';
import Scramble from '@/components/ui/Scramble';
import { Cap, Topo } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal carácter por carácter dirigido por el scroll del propio párrafo. */
function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });

  const chars = Array.from(text);
  const pintadas = useRef<number[]>([]);

  // Un solo escritor: cada cuadro calcula la opacidad de cada letra y solo toca las que cambian
  const pinta = (p: number) => {
    const el = ref.current;
    if (!el || reduced) return;
    const letras = el.children;
    const n = letras.length;
    for (let i = 0; i < n; i++) {
      const t = Math.min(1, Math.max(0, p * n - i));
      const o = Math.round((0.18 + 0.82 * t) * 100) / 100;
      if (pintadas.current[i] !== o) {
        pintadas.current[i] = o;
        (letras[i] as HTMLElement).style.opacity = String(o);
      }
    }
  };
  useMotionValueEvent(scrollYProgress, 'change', pinta);
  useEffect(() => {
    pintadas.current = [];
    pinta(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);

  return (
    <p
      ref={ref}
      className="mx-auto max-w-2xl text-center text-[clamp(1.1rem,2.1vw,1.55rem)] font-light leading-[1.5] text-fg"
    >
      {chars.map((c, i) => (
        <span key={i} style={reduced ? undefined : { opacity: 0.18 }}>{c}</span>
      ))}
    </p>
  );
}

const fadeSide = (delay: number, x: number) => ({
  initial: { opacity: 0, x },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '50px' },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function About({ data }: { data: AboutContent }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const reduced = useReducedMotion();
  const MANIFIESTO =
    'No hacemos páginas: guiamos expediciones. Tomamos a tu negocio en su punto de partida y lo llevamos a su destino digital — un sitio propio, rápido y hecho a la medida, que trabaja por ti las 24 horas. Diseño, desarrollo y acompañamiento de guía: no te soltamos la mano después de llegar.';
  const joined = en ? EN.about.paragraph : MANIFIESTO;

  return (
    <section id="estudio" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      {/* Ornamentos de esquina: fragmentos del laboratorio */}
      <motion.div aria-hidden="true" {...(reduced ? {} : fadeSide(0.1, -80))} className="pointer-events-none absolute left-[2%] top-[6%] hidden md:block">
        <div className="h-28 w-28 rounded-full border border-aurora/25" />
      </motion.div>
      <motion.div aria-hidden="true" {...(reduced ? {} : fadeSide(0.25, -80))} className="pointer-events-none absolute bottom-[10%] left-[6%] hidden font-mono text-[10px] uppercase tracking-[0.3em] text-fg/20 md:block">
        <Scramble text={en ? EN.about.ornament : 'bitácora · exp. 001–008'} />
      </motion.div>
      <motion.div aria-hidden="true" {...(reduced ? {} : fadeSide(0.15, 80))} className="pointer-events-none absolute right-[3%] top-[8%] hidden md:block">
        <Image src="/logo-head.webp" alt="" width={110} height={110} className="rounded-2xl border border-line opacity-60" />
      </motion.div>
      <motion.div aria-hidden="true" {...(reduced ? {} : fadeSide(0.3, 80))} className="pointer-events-none absolute bottom-[12%] right-[7%] hidden md:block">
        <div className="h-16 w-16 rotate-45 border border-fg/10" />
      </motion.div>

      <Topo className="left-1/2 top-1/2 hidden w-[640px] -translate-x-1/2 -translate-y-1/2 md:block" />
      <div className="wrap">
        <Cap n="01" es="El estudio" en="The studio" />
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="hero-heading mb-10 text-center font-display text-[clamp(2.4rem,6.5vw,5rem)] font-bold uppercase leading-none tracking-tight md:mb-12"
        >
          {en ? EN.about.title : 'El estudio'}
        </motion.h2>

        <AnimatedText key={lang} text={joined} />

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 md:mt-14">
          {(en
            ? [
                { n: EN.about.stats[0].n, l: EN.about.stats[0].l, c: 'text-fg' },
                { n: EN.about.stats[1].n, l: EN.about.stats[1].l, c: 'text-fg' },
                { n: EN.about.stats[2].n, l: EN.about.stats[2].l, c: 'text-fg' },
              ]
            : [
                { n: '08', l: 'Expediciones completadas', c: 'text-fg' },
                { n: '07', l: 'Destinos en línea', c: 'text-fg' },
                { n: '00', l: 'Naufragios', c: 'text-fg' },
              ]
          ).map((s, i) => (
            <motion.div
              key={`${s.l}-${i}`}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="border-t border-line pt-4 text-center"
            >
              <p className={`font-display text-3xl font-bold md:text-4xl ${s.c}`}><Scramble text={s.n} speed={55} /></p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"><Scramble text={s.l} /></p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
