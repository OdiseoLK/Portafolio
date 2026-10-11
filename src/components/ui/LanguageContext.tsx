'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Lang = 'es' | 'en';
const LangContext = createContext<{ lang: Lang; toggle: () => void; setLang: (l: Lang) => void }>({
  lang: 'es',
  toggle: () => {},
  setLang: () => {},
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

  return <LangContext.Provider value={{ lang, toggle, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Idioma como píldora segmentada: ES | EN, el activo resaltado. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Language' : 'Idioma'}
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-sm ${className}`}
    >
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          title={l === 'es' ? 'Español' : 'English'}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-2 text-[11px] font-semibold uppercase leading-none tracking-[0.08em] transition-colors duration-300 sm:py-1.5 ${
            lang === l ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
