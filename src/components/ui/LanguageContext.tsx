'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Lang = 'es' | 'en';
const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'es',
  toggle: () => {},
});

/** Proveedor de idioma: persiste en localStorage y actualiza <html lang>. */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    const saved = window.localStorage.getItem('odiseo-lang');
    if (saved === 'en' || saved === 'es') setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem('odiseo-lang', lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'));

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Botón ES/EN para la navbar. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className={`inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:border-fg/50 hover:text-fg ${className}`}
    >
      <span className={lang === 'es' ? 'text-fg' : ''}>ES</span>
      <span className="text-fg/25">/</span>
      <span className={lang === 'en' ? 'text-fg' : ''}>EN</span>
    </button>
  );
}
