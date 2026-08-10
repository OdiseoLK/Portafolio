import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ODISEO — Portafolio de Alexis',
    short_name: 'ODISEO',
    description:
      'Desarrollo productos digitales con un enfoque en la simplicidad, el rendimiento y la atención al detalle.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090909',
    theme_color: '#090909',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
