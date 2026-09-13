'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import type { ServicesContent } from '@/lib/types';
import { Cap } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

const TAGS_ES = ['cartografía', 'provisiones', 'ingeniería de ruta', 'el guía se queda'];
const INCLUYE_ES = [
  ['Diseño UX/UI propio, sin plantillas', 'Responsive: móvil, tablet y desktop', 'SEO base y velocidad optimizada'],
  ['Carrito y pedidos por WhatsApp', 'Panel para actualizar precios', 'Ticket con folio por sucursal'],
  ['Next.js + Supabase', 'Panel de administración propio', 'Base de datos y formularios'],
  ['Actualizaciones de contenido', 'Monitoreo y seguridad', 'Soporte por WhatsApp'],
];

/** Servicios compactos, estilo oferta: tarjeta por servicio con "incluye" y cotización. */
export default function Services({ data }: { data: ServicesContent }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const items = en ? EN.services.items : data.items;
  const title = en ? EN.services.title : data.title;
  const reduced = useReducedMotion();

  return (
    <section id="servicios" className="scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <Cap n="02" es="Servicios" en="Services" />

        <div className="mb-10 grid gap-5 md:mb-12 md:grid-cols-[1.2fr,1fr] md:items-end">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hero-heading font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold uppercase leading-[0.95] tracking-tight"
          >
            {title}
          </motion.h2>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-[15px] md:justify-self-end">
            {en ? EN.servicesIntro : 'Cuatro formas de llevar tu negocio a su destino digital. Todo a la medida, todo con guía.'}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => {
            const tag = (en ? EN.serviceTags : TAGS_ES)[i];
            const incluye = (en ? EN.serviceIncludes : INCLUYE_ES)[i] ?? [];
            return (
              <motion.article
                key={item.title}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '50px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group relative flex flex-col rounded-2xl border border-line bg-card/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fg/40"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-3xl font-bold leading-none text-fg/20 transition-colors duration-300 group-hover:text-fg/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {tag && (
                    <span className="rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                      {tag}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>

                {incluye.length > 0 && (
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted">
                      {en ? EN.includes : 'Incluye'}
                    </p>
                    <ul className="space-y-1.5">
                      {incluye.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[13px] leading-snug text-fg/85">
                          <Check size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-hielo" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href="#contacto"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity duration-300 hover:opacity-70" style={{ color: 'var(--marca)' }}
                >
                  {en ? EN.quote : 'Cotizar'}
                  <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
