'use client';
import { Instagram } from 'lucide-react';
export default function InstagramBand() {
  return (
    <section className="wrap py-20 text-center md:py-24">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Síguenos</p>
      <h2 className="font-serif font-light leading-none tracking-tight text-fg text-glow" style={{ fontSize: 'clamp(2rem, 6vw, 72px)' }}>@odiseo.dev</h2>
      <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-fg/60">Proyectos recientes, procesos y lanzamientos del estudio, primero en Instagram.</p>
      <a href="https://www.instagram.com/odiseo.dev/" target="_blank" rel="noopener noreferrer" className="button-glow mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-black transition-opacity hover:opacity-90">
        <Instagram size={15} aria-hidden="true" /> Ver publicaciones
      </a>
    </section>
  );
}
