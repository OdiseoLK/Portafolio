'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Barra de progreso de scroll: 2px de acento en el borde superior. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left grad-bg"
      style={{ scaleX }}
    />
  );
}
