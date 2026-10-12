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

/**
 * El cielo de la expedición: día (nieve), tarde (fogata) o noche (pelaje).
 * Píldora con etiquetas visibles — se entiende de un vistazo.
 */
export default function TimeToggle({
  className = '',
  compact = false,
  activa = false,
  onPick,
}: {
  className?: string;
  compact?: boolean;
  /** Solo el cielo activo muestra su nombre (para la barra en celular). */
  activa?: boolean;
  onPick?: () => void;
}) {
  const { lang } = useLang();
  const [momento, setMomento] = useState<Momento>('noche');
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('odiseo-cielo') as Momento | null;
    if (saved === 'dia' || saved === 'tarde' || saved === 'noche') setMomento(saved);
    setListo(true);
  }, []);

  // Si otra instancia cambia el cielo, esta se entera
  useEffect(() => {
    const html = document.documentElement;
    const mo = new MutationObserver(() => {
      const m = html.dataset.time as Momento;
      if (m === 'dia' || m === 'tarde' || m === 'noche') setMomento((prev) => (prev === m ? prev : m));
    });
    mo.observe(html, { attributes: true, attributeFilter: ['data-time'] });
    return () => mo.disconnect();
  }, []);

  // Solo escribe cuando ya leyó lo guardado: así un toggle recién montado (p. ej. el del menú) no pisa el cielo actual
  useEffect(() => {
    if (!listo) return;
    document.documentElement.dataset.time = momento;
    window.localStorage.setItem('odiseo-cielo', momento);
  }, [momento, listo]);

  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Sky of the expedition' : 'Cielo de la expedición'}
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 ${className}`}
    >
      {MODES.map(({ id, Icon, es, en }) => {
        const active = listo && momento === id;
        const label = lang === 'en' ? en : es;
        return (
          <button
            key={id}
            type="button"
            onClick={() => { setMomento(id); onPick?.(); }}
            aria-pressed={active}
            title={label}
            className={`inline-flex items-center rounded-full text-xs font-medium transition-colors duration-300 ${
              activa ? 'px-2.5 py-2' : 'gap-1.5 px-3 py-1.5'
            } ${active ? 'bg-fg text-bg' : 'text-muted hover:text-fg'}`}
          >
            <Icon size={13} aria-hidden="true" className="shrink-0" />
            {activa ? (
              <span
                className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                  active ? 'ml-1.5 max-w-[4.5rem] opacity-100' : 'ml-0 max-w-0 opacity-0'
                }`}
              >
                {label}
              </span>
            ) : (
              <>
                {!compact && <span className="hidden sm:inline">{label}</span>}
                <span className={compact ? 'sr-only' : 'sm:hidden'}>{label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
