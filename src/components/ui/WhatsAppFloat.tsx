'use client';

import { siWhatsapp } from 'simple-icons';

/**
 * Botón flotante de WhatsApp — vidrio esmerilado monocromático que
 * revela la etiqueta y un glow verde sutil al pasar el cursor.
 */
export default function WhatsAppFloat({ url }: { url: string }) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="liquid-glass group fixed bottom-6 right-6 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-line/60 px-[13px] py-[13px] transition-all duration-500 ease-out hover:border-[#25D366]/50 hover:shadow-[0_0_28px_rgba(37,211,102,0.35)] md:bottom-8 md:right-8"
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 fill-fg/85 transition-colors duration-300 group-hover:fill-[#25D366]"
      >
        <path d={siWhatsapp.path} />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-fg opacity-0 transition-all duration-500 ease-out group-hover:ml-2.5 group-hover:max-w-[110px] group-hover:opacity-100">
        Escríbeme
      </span>
    </a>
  );
}
