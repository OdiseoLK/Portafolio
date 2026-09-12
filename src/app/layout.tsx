import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/archivo';
import '@fontsource-variable/caveat';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ODISEO Studio — Diseño y desarrollo web',
    template: '%s — ODISEO',
  },
  description:
    'Guiamos expediciones digitales: llevamos negocios de la idea a su destino en línea con sitios rápidos, a la medida y con acompañamiento de guía.',
  keywords: ['ODISEO', 'estudio de diseño y desarrollo web', 'diseñador de interfaces', 'portafolio', 'Next.js'],
  authors: [{ name: 'Alexis — ODISEO' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'ODISEO',
    title: 'ODISEO Studio — Diseño y desarrollo web',
    description:
      'Cada negocio es una expedición. Diseño y desarrollo web con 7 destinos reales en línea.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ODISEO Studio — Guiamos expediciones digitales' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ODISEO Studio — Diseño y desarrollo web',
    description:
      'Cada negocio es una expedición. Diseño y desarrollo web con 7 destinos reales en línea.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
