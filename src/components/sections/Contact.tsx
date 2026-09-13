'use client';

import { ArrowUpRight, Mail } from 'lucide-react';
import { siWhatsapp } from 'simple-icons';
import { motion, useReducedMotion } from 'framer-motion';
import type { ContactContent } from '@/lib/types';
import { Cap } from '@/components/ui/Expedicion';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Inicia tu expedición: CTA directo a WhatsApp (sin formulario propio —
 * para eso está WhatsApp). Correo como alternativa.
 */
export default function Contact({ data }: { data: ContactContent }) {
  const { lang } = useLang();
  const en = lang === 'en';
  const reduced = useReducedMotion();

  return (
    <section id="contacto" className="scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <Cap n="06" es="Contacto" en="Contact" />

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-line bg-card/80 p-8 text-center backdrop-blur-md md:p-14"
        >
          {/* Glow de marca sutil */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 0%, color-mix(in srgb, var(--marca) 14%, transparent), transparent 60%)' }} />

          <div className="relative">
            <p className="eyebrow mb-4" style={{ color: 'var(--marca)' }}>
              {en ? 'Start your expedition' : 'Inicia tu expedición'}
            </p>
            <h2 className="hero-heading mx-auto max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-bold uppercase leading-[1] tracking-tight">
              {en ? "Let's map your route" : 'Tracemos tu ruta'}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              {en
                ? 'Tell us where your business is today and where you want it to go. One message and we quote your expedition — no commitment.'
                : 'Cuéntanos dónde está hoy tu negocio y a dónde quieres llevarlo. Un mensaje y cotizamos tu expedición, sin compromiso.'}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={data.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-[#04120a] transition-transform duration-300 hover:scale-[1.03]"
              >
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d={siWhatsapp.path} />
                </svg>
                {en ? 'Chat on WhatsApp' : 'Escríbenos por WhatsApp'}
              </a>
              <a
                href={`mailto:${data.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-fg/25 px-7 py-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg/50"
              >
                <Mail size={15} aria-hidden="true" />
                {data.email}
              </a>
            </div>

            <p className="mt-6 text-xs text-muted">
              {en ? 'We usually reply within 24–48 h.' : 'Normalmente respondemos en 24–48 h.'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
