'use client';

import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';
import { useLang } from '@/components/ui/LanguageContext';

/**
 * Invitación a descubrir los tres cielos: aparece una sola vez,
 * unos segundos después de llegar, y no vuelve si ya lo probaron.
 */
export default function PistaCielo({ visto, centrada = false }: { visto: boolean; centrada?: boolean }) {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visto) return;
    if (window.localStorage.getItem('odiseo-pista-cielo') === 'visto') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const t1 = setTimeout(() => setShow(true), 3500);
    const t2 = setTimeout(() => {
      setShow(false);
      window.localStorage.setItem('odiseo-pista-cielo', 'visto');
    }, 11500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visto]);

  useEffect(() => {
    if (visto && show) {
      setShow(false);
      window.localStorage.setItem('odiseo-pista-cielo', 'visto');
    }
  }, [visto, show]);

  if (!show) return null;

  const burbuja = (
    <div role="status" className="relative animate-[pista_.4s_cubic-bezier(.22,1,.36,1)]">
      {/* Piquito */}
      <span
        aria-hidden="true"
        className={`absolute -top-[7px] h-3 w-3 rotate-45 rounded-[2px] ${centrada ? 'left-1/2 -ml-1.5' : 'right-14'}`}
        style={{ background: 'var(--marca)' }}
      />
      <span
        className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-bg shadow-lg"
        style={{ background: 'var(--marca)' }}
      >
        <Sun size={14} aria-hidden="true" />
        {lang === 'en' ? 'Try changing the sky' : 'Prueba cambiar el cielo'}
      </span>
    </div>
  );

  return (
    <div
      className={`pointer-events-none absolute top-full z-[60] mt-3 whitespace-nowrap ${
        centrada ? 'left-1/2 -translate-x-1/2' : 'right-2'
      }`}
    >
      {burbuja}
    </div>
  );
}
