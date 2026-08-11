'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FileCode2, Folder, FolderOpen } from 'lucide-react';

/* Paleta de sintaxis */
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-lima">{children}</span>
);
const C = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neutral-400">{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neutral-300">{children}</span>
);
const N = ({ children }: { children: React.ReactNode }) => (
  <span className="text-neutral-200">{children}</span>
);

const LINES: React.ReactNode[] = [
  <>
    <K>import</K> {'{ '}
    <C>motion</C>
    {' }'} <K>from</K> <S>&quot;framer-motion&quot;</S>;
  </>,
  <>&nbsp;</>,
  <>
    <K>export default function</K> <C>Home</C>() {'{'}
  </>,
  <>
    {'  '}
    <K>return</K> (
  </>,
  <>
    {'    '}&lt;<C>main</C> <P>className</P>=<S>&quot;flex min-h-screen</S>
  </>,
  <>
    {'      '}
    <S>flex-col items-center justify-center&quot;</S>&gt;
  </>,
  <>
    {'      '}&lt;<C>motion.h1</C>
  </>,
  <>
    {'        '}
    <P>initial</P>={'{{'} <P>opacity</P>: <N>0</N>, <P>y</P>: <N>20</N> {'}}'}
  </>,
  <>
    {'        '}
    <P>animate</P>={'{{'} <P>opacity</P>: <N>1</N>, <P>y</P>: <N>0</N> {'}}'}
  </>,
  <>
    {'        '}
    <P>transition</P>={'{{'} <P>duration</P>: <N>0.6</N> {'}}'}
  </>,
  <>
    {'        '}
    <P>className</P>=<S>&quot;text-5xl font-bold&quot;</S>&gt;
  </>,
  <>
    {'        '}ODISEO
  </>,
  <>
    {'      '}&lt;/<C>motion.h1</C>&gt;
  </>,
  <>
    {'    '}&lt;/<C>main</C>&gt;
  </>,
  <>{'  );'}</>,
  <>{'}'}</>,
];

const TREE: { name: string; type: 'open' | 'dir' | 'file'; active?: boolean; depth: number }[] = [
  { name: 'portfolio', type: 'open', depth: 0 },
  { name: 'app', type: 'open', depth: 1 },
  { name: 'page.tsx', type: 'file', active: true, depth: 2 },
  { name: 'components', type: 'dir', depth: 1 },
  { name: 'sections', type: 'dir', depth: 1 },
  { name: 'lib', type: 'dir', depth: 1 },
  { name: 'styles', type: 'dir', depth: 1 },
  { name: '.env.local', type: 'file', depth: 1 },
  { name: 'next.config.js', type: 'file', depth: 1 },
  { name: 'package.json', type: 'file', depth: 1 },
  { name: 'README.md', type: 'file', depth: 1 },
];

/**
 * Ventana de editor de código: la "foto" del hero mientras no subas una real.
 * Decorativa (aria-hidden): el contenido ya está descrito en el texto del hero.
 */
export default function CodeWindow() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="relative select-none"
    >
      {/* Resplandores */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/25 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-14 h-64 w-64 rounded-full bg-lima/20 blur-[110px]" />

      <motion.div
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-xl p-px [background:linear-gradient(135deg,rgba(255,255,255,.55),rgba(37,37,37,.9)_38%,rgba(37,37,37,.9)_62%,rgba(163,163,163,.5))]"
      >
        <div className="overflow-hidden rounded-[11px] bg-[#0c0c11]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
          {/* Barra de la ventana */}
          <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
            <p className="font-mono text-[11px] tracking-wide text-muted">
              portfolio / app / <span className="text-fg">page.tsx</span>
            </p>
          </div>

          <div className="flex">
            {/* Código */}
            <div className="min-w-0 flex-1 overflow-x-auto px-4 py-4">
              <pre className="font-mono text-[10.5px] leading-[1.75] md:text-[11.5px]">
                {LINES.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-7 shrink-0 select-none pr-3 text-right text-muted/40">
                      {i + 1}
                    </span>
                    <code className="whitespace-pre text-fg/90">{line}</code>
                  </div>
                ))}
              </pre>
            </div>

            {/* Explorador */}
            <div className="hidden w-40 shrink-0 border-l border-line/80 px-3 py-4 sm:block">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted/60">
                Explorer
              </p>
              <ul className="space-y-1.5 font-mono text-[10.5px] text-muted">
                {TREE.map((item) => (
                  <li
                    key={item.name}
                    style={{ paddingLeft: item.depth * 10 }}
                    className={`flex items-center gap-1.5 ${
                      item.active ? 'rounded bg-accent/15 px-1.5 py-0.5 text-fg' : ''
                    }`}
                  >
                    {item.type === 'file' ? (
                      <FileCode2 size={11} className={item.active ? 'text-accent' : 'text-muted/60'} />
                    ) : item.type === 'open' ? (
                      <FolderOpen size={11} className="text-muted/60" />
                    ) : (
                      <Folder size={11} className="text-muted/60" />
                    )}
                    <span className="truncate">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
