import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@fontsource-variable/space-grotesk';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ODISEO — Developer · Designer · Creator',
    template: '%s — ODISEO',
  },
  description:
    'Desarrollo productos digitales con un enfoque en la simplicidad, el rendimiento y la atención al detalle.',
  keywords: ['ODISEO', 'desarrollador web', 'diseñador de interfaces', 'portafolio', 'Next.js'],
  authors: [{ name: 'Alexis — ODISEO' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'ODISEO',
    title: 'ODISEO — Developer · Designer · Creator',
    description:
      'Desarrollo productos digitales con un enfoque en la simplicidad, el rendimiento y la atención al detalle.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ODISEO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ODISEO — Developer · Designer · Creator',
    description:
      'Desarrollo productos digitales con un enfoque en la simplicidad, el rendimiento y la atención al detalle.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#090909',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
