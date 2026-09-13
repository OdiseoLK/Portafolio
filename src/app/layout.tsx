import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@fontsource-variable/archivo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ODISEO Studio — Diseño y desarrollo web en Orizaba | México, LatAm y EE.UU.',
    template: '%s — ODISEO Studio',
  },
  description:
    'Estudio de diseño y desarrollo web en Orizaba, Veracruz. Creamos sitios web a la medida, tiendas en línea y catálogos con pedidos por WhatsApp para negocios en México, Latinoamérica y Estados Unidos. 7 proyectos reales en línea.',
  keywords: [
    'diseño web Orizaba',
    'desarrollo web Orizaba',
    'páginas web Orizaba Veracruz',
    'diseño de páginas web México',
    'desarrollo web México',
    'agencia de diseño web',
    'tiendas en línea',
    'diseño web Latinoamérica',
    'web design Mexico',
    'web development for Latino businesses USA',
    'sitios web para negocios',
    'ODISEO Studio',
  ],
  authors: [{ name: 'ODISEO Studio' }],
  creator: 'ODISEO Studio',
  publisher: 'ODISEO Studio',
  alternates: {
    canonical: '/',
    languages: { 'es-MX': '/', en: '/', 'x-default': '/' },
  },
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: 'ODISEO Studio',
    title: 'ODISEO Studio — Diseño y desarrollo web en Orizaba | México, LatAm y EE.UU.',
    description:
      'Sitios web a la medida, tiendas en línea y catálogos con pedidos por WhatsApp. Desde Orizaba, Veracruz para negocios en México, Latinoamérica y Estados Unidos.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ODISEO Studio — Guiamos expediciones digitales' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ODISEO Studio — Diseño y desarrollo web',
    description:
      'Sitios web a la medida para negocios en México, Latinoamérica y EE.UU. Desde Orizaba, Veracruz. 7 proyectos reales en línea.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preload" as="image" href="/logo-mark.webp" type="image/webp" />
      </head>
      <body className="grain bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
