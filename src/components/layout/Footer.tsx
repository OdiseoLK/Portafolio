'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Download, Mail } from 'lucide-react';
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

export default function Footer({
  socials,
  footer,
  cvUrl,
}: {
  socials: SocialsContent;
  footer: FooterContent;
  cvUrl: string;
}) {
  const { lang } = useLang();
  const links = lang === 'en' ? [{ label: 'Home', href: '#inicio' }, ...EN.footer.links] : QUICK_LINKS;
  const socialLinks = buildSocialLinks(socials);

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="border-t border-line">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr,1fr,1fr,1fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-head.png"
                alt="Logo de ODISEO: un husky con lentes"
                width={44}
                height={44}
                className="rounded-lg border border-line"
              />
              <p className="font-display text-sm font-medium tracking-[0.28em] text-fg">
                ODISEO<span className="font-serif italic tracking-normal text-hielo/80">&nbsp;studio</span>
              </p>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{footer.tagline}</p>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces rápidos">
            <p className="eyebrow mb-5">Navegación</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}
          <div>
            <p className="eyebrow mb-5">Recursos</p>
            <ul className="space-y-3">
              {socials.email && (
                <li>
                  <a
                    href={`mailto:${socials.email}`}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    <Mail size={13} aria-hidden="true" />
                    Escríbeme
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-sm text-muted transition-colors duration-300 hover:text-fg"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Conecta */}
          <div>
            <p className="eyebrow mb-5">Conecta</p>
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-line text-muted transition-all duration-300 hover:border-accent hover:text-fg hover:shadow-[0_0_16px_rgba(255,255,255,0.35)]"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-line/70 pt-8">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} ODISEO. {lang === 'en' ? EN.footer.rights : 'Todos los derechos reservados.'}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver al inicio"
            className="group grid h-11 w-11 place-items-center rounded-md border border-line text-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
          >
            <ArrowUp
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
