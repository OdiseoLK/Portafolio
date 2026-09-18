'use client';

import Image from 'next/image';
import { useLang } from '@/components/ui/LanguageContext';

/** Los negocios que ya viajaron con nosotros: logos en marquee CSS infinito. */
const LOGOS = [
  { src: '/clientes/decora.webp', alt: 'Decora — Interiorismo que transforma' },
  { src: '/clientes/cafe-alvarez.webp', alt: 'Café Álvarez' },
  { src: '/clientes/fdhz.webp', alt: 'Fundación Doctor Hernández Zurita' },
  { src: '/clientes/puerta-grande.webp', alt: 'Hospital Puerta Grande' },
];

export default function ClientLogos() {
  const { lang } = useLang();
  const en = lang === 'en';
  const row = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section aria-label={en ? 'Client logos' : 'Logos de clientes'} className="border-y border-line/60 bg-surface/40 py-12 backdrop-blur-md md:py-16">
      <p className="wrap mb-8 text-center text-sm text-muted md:text-[15px]">
        {en ? 'Businesses that already travelled with us' : 'Negocios que ya viajaron con nosotros'}
      </p>
      <div className="logos-mask relative overflow-hidden">
        <div className="logos-track flex w-max items-center gap-16 md:gap-24">
          {row.map((l, i) => (
            <Image
              key={`${l.alt}-${i}`}
              src={l.src}
              alt={i < LOGOS.length ? l.alt : ''}
              aria-hidden={i >= LOGOS.length}
              width={150}
              height={70}
              className="logo-mono h-12 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-14"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
