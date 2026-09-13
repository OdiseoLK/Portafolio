'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Scramble from '@/components/ui/Scramble';
import { LangToggle, useLang } from '@/components/ui/LanguageContext';
import TimeToggle from '@/components/ui/TimeToggle';
import { EN } from '@/lib/translations';

const LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'El estudio', href: '#estudio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Respaldo', href: '#respaldo' },
  { label: 'Casos', href: '#casos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar({ cvUrl }: { cvUrl: string }) {
  const { lang } = useLang();
  const links = lang === 'en' ? EN.nav.links : LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#inicio');
  const cvHref = cvUrl || '/cv.pdf';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line/70 bg-bg/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Principal">
        <a
          href="#inicio"
          className="flex items-center gap-2 font-display text-sm font-medium tracking-[0.12em] text-fg transition-colors hover:text-white sm:gap-2.5 sm:tracking-[0.28em]"
        >
          <Image
            src="/logo-mark.webp"
            alt=""
            width={30}
            height={30}
            priority
            className="h-7 w-7 object-contain sm:h-[30px] sm:w-[30px]"
          />
          ODISEO<span className="hidden font-serif italic tracking-normal text-muted xs:inline sm:inline">&nbsp;studio</span>
        </a>

        {/* Enlaces desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    data-scramble-parent
                    className={`group relative text-sm transition-colors duration-300 hover:text-fg ${
                      isActive ? 'text-fg' : 'text-muted'
                    }`}
                  >
                    <Scramble text={link.label} trigger="hover" speed={26} />
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-[13px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-fg shadow-[0_0_8px_rgba(244,244,245,0.9)] transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <TimeToggle />
            <LangToggle />
          </div>
        </div>

        {/* Botón de menú móvil (los toggles viven dentro del menú) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-line text-fg md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-[90] flex flex-col bg-bg md:hidden"
          >
            {/* Barra superior del menú (logo + cerrar) */}
            <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-line/60">
              <span className="flex items-center gap-2 font-display text-sm font-medium tracking-[0.12em] text-fg">
                <Image src="/logo-mark.webp" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                ODISEO
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md border border-line text-fg"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="wrap flex flex-1 flex-col gap-1 overflow-y-auto pt-6"
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line/60 py-5 font-display text-2xl font-medium text-fg"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Barra fija inferior: siempre visible, sin necesidad de scrollear */}
            <div className="wrap shrink-0 border-t border-line/60 py-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted">
                    {lang === 'en' ? 'Sky' : 'Cielo'}
                  </span>
                  <TimeToggle />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted">
                    {lang === 'en' ? 'Language' : 'Idioma'}
                  </span>
                  <LangToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
