import Link from 'next/link';
import GridBackground from '@/components/ui/GridBackground';

export default function NotFound() {
  return (
    <>
      <GridBackground />
      <main className="relative flex min-h-[100svh] items-center">
        <div className="wrap">
          <p className="eyebrow mb-8">
            Error <span className="text-accent">·</span> 404
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-medium leading-[0.95] tracking-tight text-fg">
            Página no encontrada
          </h1>
          <p className="mt-7 max-w-md leading-relaxed text-muted">
            La ruta que buscas no existe o fue movida. Volvamos a un lugar conocido.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2.5 rounded-md bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-white"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
