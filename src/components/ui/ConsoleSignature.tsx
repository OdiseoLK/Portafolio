'use client';

import { useEffect } from 'react';

/** Huevo de pascua para quien abra DevTools: firma del sitio en consola. */
export default function ConsoleSignature() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '%c ODISEO %c Diseñado y desarrollado por Alexis · Next.js + Supabase \n%c ¿Curioseando el código? Escríbeme: Developerlk23@gmail.com',
      'background:linear-gradient(92deg,#ffffff,#a3a3a3);color:#090909;font-weight:700;padding:4px 8px;',
      'background:#171717;color:#F5F5F5;padding:4px 8px;',
      'color:#A3A3A3;padding:6px 0;'
    );
  }, []);

  return null;
}
