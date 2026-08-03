/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Evita que el sitio se incruste en iframes ajenos (clickjacking).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // El navegador no adivina tipos MIME (evita ejecución encubierta).
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // No filtra la URL completa al navegar a sitios externos.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Desactiva APIs sensibles que el sitio no usa.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Fuerza HTTPS en visitas futuras.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
