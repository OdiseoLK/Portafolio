'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fade + slide al entrar en viewport. Una sola vez, sutil. */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  per?: 'char' | 'word';
}

/** Texto que aparece progresivamente, carácter por carácter o palabra por palabra. */
export function TextReveal({ text, className, delay = 0, per = 'char' }: TextRevealProps) {
  const reduced = useReducedMotion();
  const parts = per === 'char' ? Array.from(text) : text.split(' ');

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: per === 'char' ? 0.045 : 0.08, delayChildren: delay }}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: '0.6em' },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          {part === ' ' ? '\u00A0' : part}
          {per === 'word' && i < parts.length - 1 ? '\u00A0' : null}
        </motion.span>
      ))}
    </motion.span>
  );
}
