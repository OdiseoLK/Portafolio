'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, CalendarHeart, Clock, Wrench } from 'lucide-react';
import { Cap } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS_ES = [
  {
    Icon: ShieldCheck,
    title: 'Garantía de 1 año',
    text: 'Cualquier error de nuestra parte — un enlace roto, una sección que falle o cualquier desperfecto técnico — lo corregimos sin costo adicional.',
  },
  {
    Icon: CalendarHeart,
    title: 'Un mes de acompañamiento gratis',
    text: 'El primer mes tienes acceso directo a nosotros para cualquier cambio, ajuste o consulta. Tu mes para conocer el sitio, probarlo y afinar lo que quieras.',
  },
  {
    Icon: Clock,
    title: 'Atención 24/7',
    text: 'Estamos disponibles en todo momento. Si algo no se ve bien o tienes una duda, escríbenos cuando sea.',
  },
  {
    Icon: Wrench,
    title: 'Mantenimiento accesible',
    text: 'A partir del segundo mes, los cambios y actualizaciones tienen un costo accesible según el tipo de ajuste. Con gusto te compartimos el detalle.',
  },
];

/** El guía se queda: respaldo y garantías (risk reversal antes de contactar). */
export default function Respaldo() {
  const { lang } = useLang();
  const en = lang === 'en';
  const iconMap = { ShieldCheck, CalendarHeart, Clock, Wrench };
  const items = en
    ? EN.respaldo.items.map((it) => ({ ...it, Icon: iconMap[it.Icon as keyof typeof iconMap] }))
    : ITEMS_ES;
  const reduced = useReducedMotion();

  return (
    <section id="respaldo" className="scroll-mt-24 border-y border-line/60 bg-surface/40 py-20 backdrop-blur-md md:py-28">
      <div className="wrap">
        <Cap n="03" es="El guía se queda" en="The guide stays" />

        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1.2fr,1fr] md:items-end">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hero-heading font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold uppercase leading-[0.95] tracking-tight"
          >
            {en ? EN.respaldo.title : 'Tu respaldo, después de llegar'}
          </motion.h2>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-[15px] md:justify-self-end">
            {en
              ? 'A website is not the end of the journey. This is what you get with us after launch — no fine print.'
              : 'Un sitio no es el final del viaje. Esto es lo que tienes con nosotros después del lanzamiento, sin letras chiquitas.'}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl border border-line bg-card/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fg/40"
            >
              <span
                className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-line"
                style={{ color: 'var(--marca)' }}
              >
                <item.Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display text-base font-bold uppercase leading-tight tracking-wide text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
