'use client';

import { useState } from 'react';
import { ArrowRight, Check, Copy, Send } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getSupabase } from '@/lib/supabase';
import type { ContactContent } from '@/lib/types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full rounded-md border border-line bg-surface px-4 py-3 text-fg outline-none transition-colors duration-300 placeholder:text-muted/40 focus:border-accent';

export default function Contact({ data }: { data: ContactContent }) {
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!data.email) return;
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Si el portapapeles no está disponible, no hacemos nada.
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    // Honeypot: campo invisible; si viene lleno es un bot.
    const trap = String(formData.get('company') ?? '').trim();
    if (trap) {
      setStatus('sent'); // Fingimos éxito para no dar pistas al bot.
      form.reset();
      return;
    }
    if (!name || !email || !message) return;
    // Límites de tamaño (defensa en profundidad; la BD también los aplica).
    if (name.length > 100 || email.length > 150 || message.length > 2000) {
      setStatus('error');
      return;
    }
    // Validación básica de correo.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    const supabase = getSupabase();

    // Sin Supabase configurado: abrir el cliente de correo como fallback.
    if (!supabase) {
      const to = data.email || '';
      const subject = encodeURIComponent(`Contacto desde ODISEO — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    const { error } = await supabase.from('messages').insert({ name, email, message });
    if (error) {
      setStatus('error');
      return;
    }
    form.reset();
    setStatus('sent');
  };

  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden pb-28 md:pb-36">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 300"
        fill="none"
        className="pointer-events-none absolute -bottom-16 -left-24 h-72 w-[600px] opacity-25"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A3A3A3" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {[0, 22, 44, 66].map((off) => (
          <path
            key={off}
            d={`M -20 ${190 + off * 0.4} C 120 ${90 + off}, 260 ${260 - off}, 620 ${120 + off * 0.6}`}
            stroke="url(#wave-grad)"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="wrap">
        <SectionHeading eyebrow="Contacto" title={data.title} />

        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-muted">{data.text}</p>
            <div className="mt-10 space-y-5 border-t border-line/70 pt-8">
              {data.email && (
                <div className="flex flex-wrap items-center gap-3">
                  <p className="eyebrow w-28 shrink-0">Correo</p>
                  <a
                    href={`mailto:${data.email}`}
                    className="font-mono text-sm text-fg transition-colors hover:text-accent"
                  >
                    {data.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copiar correo"
                    className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
                  >
                    {copied ? (
                      <Check size={13} aria-hidden="true" className="text-accent" />
                    ) : (
                      <Copy size={13} aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
              {data.location && (
                <div className="flex flex-wrap items-center gap-3">
                  <p className="eyebrow w-28 shrink-0">Ubicación</p>
                  <p className="font-mono text-sm text-muted">{data.location}</p>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow w-28 shrink-0">Respuesta</p>
                <p className="font-mono text-sm text-muted">Normalmente en 24–48 h</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Honeypot anti-bots: oculto para humanos, tentador para bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-company">No llenar</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="contact-name" className="eyebrow mb-2 block">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="eyebrow mb-2 block">
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={150}
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="eyebrow mb-2 block">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Cuéntame sobre tu idea…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="button-glow group inline-flex items-center gap-2.5 rounded-full bg-fg px-8 py-3.5 text-sm font-medium tracking-wide text-bg transition-all duration-300 hover:bg-white/90 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  <Send
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
                <p aria-live="polite" className="text-sm">
                  {status === 'sent' && (
                    <span className="text-fg">Mensaje enviado. Te responderé pronto.</span>
                  )}
                  {status === 'error' && (
                    <span className="text-muted">
                      No se pudo enviar el mensaje. Intenta de nuevo.
                    </span>
                  )}
                </p>
              </div>
              <p className="font-mono text-[11px] text-muted/60">
                Al enviar aceptas el{' '}
                <a href="/privacidad" className="underline decoration-line underline-offset-2 transition-colors hover:text-fg hover:decoration-accent">
                  Aviso de Privacidad
                </a>
                .
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
