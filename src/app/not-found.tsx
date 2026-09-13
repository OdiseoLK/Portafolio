import Image from 'next/image';
import Link from 'next/link';

/** 404 — Fuera de ruta. */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-bg px-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 scale-125 rounded-full bg-fg/[0.06] blur-[80px]" aria-hidden="true" />
        <Image src="/logo-mark.webp" alt="" width={220} height={203} className="relative opacity-90" />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">404 · fuera de ruta</p>
      <h1 className="hero-heading font-display text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
        Te saliste de la ruta
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        Esta página no está en el mapa. El guía te lleva de regreso.
        <span className="mt-1 block text-fg/40">This page is off the map — the guide will take you back.</span>
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 rounded-full border border-fg/20 px-8 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-hielo/60 hover:text-hielo"
      >
        Volver al campamento base
      </Link>
    </main>
  );
}
