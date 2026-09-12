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
      style={{ boxShadow: '0 0 0 0 rgba(37,211,102,0.0)' }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="liquid-glass group fixed bottom-6 right-6 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-line/60 px-[18px] py-[18px] transition-all duration-500 ease-out hover:border-[#25D366]/50 hover:shadow-[0_0_28px_rgba(37,211,102,0.35)] md:bottom-8 md:right-8"
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        className="h-8 w-8 shrink-0 fill-fg/85 transition-colors duration-300 group-hover:fill-[#25D366]"
      >
        <path d={siWhatsapp.path} />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-base font-medium text-fg opacity-0 transition-all duration-500 ease-out group-hover:ml-2.5 group-hover:max-w-[130px] group-hover:opacity-100">
        Escríbenos
      </span>
    </a>
  );
}
