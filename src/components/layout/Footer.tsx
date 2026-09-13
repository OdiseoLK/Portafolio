'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Mail } from 'lucide-react';
import { buildSocialLinks } from '@/components/sections/Social';
import type { FooterContent, SocialsContent } from '@/lib/types';
import { useLang } from '@/components/ui/LanguageContext';
import { EN } from '@/lib/translations';

const QUICK_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'El estudio', href: '#estudio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Casos', href: '#casos' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Contacto', href: '#contacto' },
];

/**
 * Fin de la bitácora: el footer ES el horizonte.
 * Las montañas emergen del fondo (máscara superior), el contenido vive sobre
 * ellas con un velo de legibilidad, y la estrella del destino corona el pico.
 */
export default function Footer({
  socials,
  footer,
  cvUrl: _cvUrl,
}: {
  socials: SocialsContent;
  footer: FooterContent;
  cvUrl: string;
}) {
  const { lang } = useLang();
  const en = lang === 'en';
  const links = en ? [{ label: 'Home', href: '#inicio' }, ...EN.footer.links] : QUICK_LINKS;
  const socialLinks = buildSocialLinks(socials);

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden pt-44 md:pt-72">
      {/* Horizonte: las montañas emergen del fondo y sostienen todo el footer */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Un par de fotos por cielo (desktop panorámica / móvil vertical), con fundido */}
        {[
          { modo: 'm-noche', d: '/deco/montanas.jpg', m: '/deco/montanas-movil.jpg', extra: 'grayscale contrast-110' },
          { modo: 'm-tarde', d: '/deco/montanas-tarde.jpg', m: '/deco/montanas-tarde-movil.jpg', extra: '' },
          { modo: 'm-dia', d: '/deco/montanas-dia.jpg', m: '/deco/montanas-dia-movil.jpg', extra: '' },
        ].map((s) => (
          <div key={s.modo} className={`${s.modo} absolute inset-0 transition-opacity duration-700`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.d}
              alt=""
              className={`hidden h-full w-full object-cover object-[center_28%] sm:block ${s.extra}`}
              style={{
                maskImage: 'linear-gradient(180deg, transparent 0%, black 38%)',
                WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 38%)',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.m}
              alt=""
              className={`h-full w-full object-cover object-top sm:hidden ${s.extra}`}
              style={{
                maskImage: 'linear-gradient(180deg, transparent 0%, black 38%)',
                WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 38%)',
              }}
            />
          </div>
        ))}
        {/* Velo de legibilidad: se oscurece hacia el contenido */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgb(var(--bg) / 0.92) 0%, rgb(var(--bg) / 0.12) 34%, rgb(var(--bg) / 0.55) 58%, rgb(var(--bg) / 0.92) 82%, rgb(var(--bg)) 100%)',
          }}
        />
      </div>

      {/* La estrella del destino sobre el pico */}
      <svg
        aria-hidden="true"
        width="22"
        height="22"
        viewBox="0 0 26 26"
        className="cielo twinkle absolute left-1/2 top-[9%] -translate-x-1/2 drop-shadow-[0_0_10px_rgba(124,199,255,0.9)] md:top-[12%]"
      >
        <path d="M13 0 L15 11 L26 13 L15 15 L13 26 L11 15 L0 13 L11 11 Z" fill="#DCEFFF" />
      </svg>

      {/* Contenido sobre el horizonte */}
      <div className="wrap relative z-10 pb-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-head.png"
              alt="Logo de ODISEO: un husky con lentes"
              width={44}
              height={44}
              className="rounded-lg border border-fg/20"
            />
            <p className="font-display text-sm font-medium tracking-[0.28em] text-fg">
              ODISEO<span className="font-serif italic tracking-normal text-muted">&nbsp;studio</span>
            </p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-fg/70">{footer.tagline}</p>

          <nav aria-label={en ? 'Footer links' : 'Enlaces del pie'}>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-fg/70 transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label={en ? 'Email us' : 'Escríbenos por correo'}
                className="grid h-10 w-10 place-items-center rounded-full border border-fg/25 bg-bg/40 text-fg/80 backdrop-blur-[2px] transition-colors duration-300 hover:border-hielo/70 hover:text-hielo"
              >
                <Mail size={15} aria-hidden="true" />
              </a>
            )}
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-fg/25 bg-bg/40 text-fg/80 backdrop-blur-[2px] transition-colors duration-300 hover:border-hielo/70 hover:text-hielo"
              >
                {s.icon}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={en ? 'Back to basecamp (top)' : 'Volver al campamento base (inicio)'}
              className="grid h-10 w-10 place-items-center rounded-full border border-fg/25 bg-bg/40 text-fg/80 backdrop-blur-[2px] transition-colors duration-300 hover:border-hielo/70 hover:text-hielo"
            >
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </div>

          <div className="w-full max-w-3xl">
            <div className="rule mb-5" />
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <small className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/45">
                {en ? EN.footer.rights : 'Fin de la bitácora · Todos los derechos reservados.'} © {new Date().getFullYear()}
              </small>
              <div className="flex items-center gap-5">
                <a href="https://www.webzi.mx/tos/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-fg/45 transition-colors duration-300 hover:text-fg">
                  {en ? 'Privacy' : 'Privacidad'}
                </a>
                <a href="https://www.webzi.mx/tos/cookies" target="_blank" rel="noopener noreferrer" className="text-xs text-fg/45 transition-colors duration-300 hover:text-fg">
                  Cookies
                </a>
                <a href="https://www.webzi.mx/tos" target="_blank" rel="noopener noreferrer" className="text-xs text-fg/45 transition-colors duration-300 hover:text-fg">
                  Legal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
