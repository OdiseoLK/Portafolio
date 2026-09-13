'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Cap } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQ_ES = [
  { q: '¿Cuánto cuesta un sitio web?', a: 'Cada proyecto se cotiza a la medida. Definimos contigo el alcance y te damos un precio claro antes de empezar, sin sorpresas. Escríbenos por WhatsApp y lo cotizamos.' },
  { q: '¿Cuánto tarda?', a: 'Depende del tipo de sitio. Un one-page toma un par de semanas; una tienda con pedidos o un panel a la medida, un poco más. Marcamos un tiempo real desde el día uno.' },
  { q: '¿Necesito saber algo técnico?', a: 'Para nada. Lo entregamos listo y, cuando aplica, con un panel para que actualices precios y contenido por tu cuenta. Y el guía se queda después del lanzamiento.' },
  { q: '¿Incluyen dominio y hosting?', a: 'Sí, te ayudamos a montar tu propio dominio (.com, .mx) y hosting. Tu sitio, tu nombre, tu control.' },
  { q: '¿Pueden rediseñar mi sitio actual?', a: 'Claro. Tomamos tu sitio existente y lo llevamos a su destino, como hicimos con Puerta Grande. Conservas lo que funciona y ganas lo que faltaba.' },
  { q: '¿Cómo empiezo?', a: 'Un mensaje por WhatsApp. Escuchamos tu idea, la cotizamos y arrancamos la expedición. Sin compromiso.' },
];

/** Dudas frecuentes: acordeón que abraza el cielo activo. */
export default function FAQ() {
  const { lang } = useLang();
  const en = lang === 'en';
  const items = en ? EN.faq.items : FAQ_ES;
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <Cap n="07" es="Dudas frecuentes" en="FAQ" />

        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hero-heading mb-10 text-center font-display text-[clamp(2rem,5vw,3.4rem)] font-bold uppercase leading-[0.95] tracking-tight md:mb-12"
          >
            {en ? EN.faq.title : 'Todo claro antes de empezar'}
          </motion.h2>

          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '40px' }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                  className={`overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-md transition-colors duration-300 ${isOpen ? 'border-fg/40' : 'border-line'}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="font-medium text-fg md:text-lg">{item.q}</span>
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'none', color: 'var(--marca)' }}
                    >
                      <Plus size={15} aria-hidden="true" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? undefined : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-6 md:text-[15px]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
