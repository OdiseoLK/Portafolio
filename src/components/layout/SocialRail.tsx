'use client';

import { motion } from 'framer-motion';
import { buildSocialLinks } from '@/components/sections/Social';
import type { SocialsContent } from '@/lib/types';

/** Riel social fijo del lado izquierdo, solo en pantallas grandes. */
export default function SocialRail({ socials }: { socials: SocialsContent }) {
  const links = buildSocialLinks(socials);
  if (!links.length) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
    >
      <span aria-hidden="true" className="h-16 w-px bg-gradient-to-b from-transparent to-line" />
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-fg hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
        >
          {icon}
        </a>
      ))}
      <span aria-hidden="true" className="h-16 w-px bg-gradient-to-b from-line to-transparent" />
    </motion.aside>
  );
}
