'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Quote, Send } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getSupabase } from '@/lib/supabase';
import type { Testimonial } from '@/lib/types';

const inputClass =
  'w-full rounded-md border border-line bg-surface px-4 py-3 text-fg outline-none transition-colors duration-300 placeholder:text-muted/40 focus:border-accent';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Avatar({ t }: { t: Testimonial }) {
  if (t.avatar_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={t.avatar_url}
        alt={t.name}
        className="h-12 w-12 rounded-full border border-line object-cover"
      />
    );
  }
  return (
    <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card font-mono text-sm text-accent">
      {initials(t.name)}
    </span>
  );
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const hasItems = items.length > 0;
  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + items.length) % items.length);
  const active = hasItems ? items[index] : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('t-name') ?? '').trim();
    const role = String(fd.get('t-role') ?? '').trim();
    const quote = String(fd.get('t-quote') ?? '').trim();
    const trap = String(fd.get('t-website') ?? '').trim();

    if (trap) {
      setStatus('sent');
      form.reset();
      return;
    }
    if (!name || !quote) return;
    if (name.length > 100 || role.length > 120 || quote.length > 600) {
      setStatus('error');
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    const { error } = await supabase
      .from('testimonials')
      .insert({ name, role: role || null, quote, approved: false });
    if (error) {
      setStatus('error');
      return;
    }
    form.reset();
    setStatus('sent');
  };

  return (
    <section id="testimonios" className="scroll-mt-24 py-28 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow="Testimonios" title="Lo que dicen mis clientes" />

        {hasItems && active && (
          <Reveal>
            <div className="relative mx-auto max-w-3xl">
              <Quote
                aria-hidden="true"
                size={48}
                className="mx-auto mb-8 text-accent/30"
              />

              <div className="min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={active.id}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <blockquote className="font-display text-xl leading-relaxed text-fg/90 md:text-2xl">
                      &ldquo;{active.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex flex-col items-center gap-3">
                      <Avatar t={active} />
                      <div>
                        <p className="font-medium text-fg">{active.name}</p>
                        {active.role && (
                          <p className="font-mono text-xs tracking-wide text-muted">
                            {active.role}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {items.length > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Testimonio anterior"
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-fg"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <div className="flex gap-2">
                    {items.map((t, i) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ir al testimonio ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index ? 'w-6 bg-accent' : 'w-1.5 bg-line hover:bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Testimonio siguiente"
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-fg"
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* Enviar testimonio */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-xl text-center">
            {!open ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-fg hover:decoration-accent"
              >
                ¿Trabajamos juntos? Deja tu testimonio
              </button>
            ) : status === 'sent' ? (
              <p className="inline-flex items-center gap-2 rounded-md border border-lima/40 bg-lima/5 px-5 py-3 text-sm text-fg">
                <Check size={15} aria-hidden="true" className="text-lima" />
                ¡Gracias! Tu testimonio se revisará antes de publicarse.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Honeypot */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="t-website">No llenar</label>
                  <input id="t-website" name="t-website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="t-name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Tu nombre"
                    aria-label="Tu nombre"
                    className={inputClass}
                  />
                  <input
                    name="t-role"
                    type="text"
                    maxLength={120}
                    placeholder="Puesto — Empresa (opcional)"
                    aria-label="Puesto y empresa"
                    className={inputClass}
                  />
                </div>
                <textarea
                  name="t-quote"
                  required
                  rows={3}
                  maxLength={600}
                  placeholder="Comparte tu experiencia trabajando conmigo…"
                  aria-label="Tu testimonio"
                  className={`${inputClass} resize-none`}
                />
                {status === 'error' && (
                  <p className="text-sm text-red-300">
                    No se pudo enviar. Revisa los campos e inténtalo de nuevo.
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="grad-bg group inline-flex items-center gap-2.5 rounded-md px-6 py-3 text-sm font-semibold text-bg transition-all duration-300 hover:shadow-[0_0_28px_rgba(139,92,246,0.4)] hover:brightness-110 disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Enviando…' : 'Enviar testimonio'}
                    <Send size={14} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    Cancelar
                  </button>
                </div>
                <p className="font-mono text-[11px] text-muted/60">
                  Tu testimonio no se publica automáticamente: primero lo reviso. Al enviar
                  aceptas el{' '}
                  <a href="/privacidad" className="underline decoration-line underline-offset-2 transition-colors hover:text-fg hover:decoration-accent">
                    Aviso de Privacidad
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
