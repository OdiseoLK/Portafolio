'use client';

import { useEffect } from 'react';
import { useLang } from '@/components/ui/LanguageContext';

/** La pestaña te extraña: al irte a otra pestaña, el guía deja recado en el título. */
export default function TabGuardian() {
  const { lang } = useLang();

  useEffect(() => {
    const original = document.title;
    const away = lang === 'en' ? '🐺 the guide awaits…' : '🐺 el guía te espera…';
    const onVis = () => {
      document.title = document.hidden ? away : original;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      document.title = original;
    };
  }, [lang]);

  return null;
}
