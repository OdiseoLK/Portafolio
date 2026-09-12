'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, Sunset } from 'lucide-react';
import { useLang } from '@/components/ui/LanguageContext';

type Momento = 'dia' | 'tarde' | 'noche';

const MODES: { id: Momento; Icon: typeof Sun; es: string; en: string }[] = [
  { id: 'dia', Icon: Sun, es: 'Día', en: 'Day' },
  { id: 'tarde', Icon: Sunset, es: 'Tarde', en: 'Dusk' },
  { id: 'noche', Icon: Moon, es: 'Noche', en: 'Night' },
];

/** El cielo de la expedición: día (nieve), tarde (fogata) o noche (pelaje). */
export default function TimeToggle({ className = '' }: { className?: string }) {
  const { lang } = useLang();
  const [momento, setMomento] = useState<Momento>('noche');

  useEffect(() => {
    const saved = window.localStorage.getItem('odiseo-cielo') as Momento | null;
    if (saved === 'dia' || saved === 'tarde' || saved === 'noche') setMomento(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.time = momento;
    window.localStorage.setItem('odiseo-cielo', momento);
  }, [momento]);

  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Sky of the expedition' : 'Cielo de la expedición'}
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1 ${className}`}
    >
      {MODES.map(({ id, Icon, es, en }) => (
        <button
          key={id}
          type="button"
          onClick={() => setMomento(id)}
          aria-pressed={momento === id}
          aria-label={lang === 'en' ? en : es}
          title={lang === 'en' ? en : es}
          className={`grid h-7 w-7 place-items-center rounded-full transition-colors duration-300 ${
            momento === id ? 'bg-fg text-bg' : 'text-muted hover:text-fg'
          }`}
        >
          <Icon size={13} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
