import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GridBackground from '@/components/ui/GridBackground';

/**
 * Marco compartido para las páginas legales: cabecera mínima con la marca,
 * contenido en prosa y pie discreto. Sin navbar de anclas (no aplican aquí).
 */
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <div className="relative">
        <header className="border-b border-line/60">
          <div className="wrap flex items-center justify-between py-5">
            <Link href="/" className="font-display text-lg font-semibold tracking-wide text-fg">
              ODIS<span className="text-lima">E</span><span className="text-accent">O</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Volver al inicio
            </Link>
          </div>
        </header>

        <main className="wrap max-w-3xl py-16 md:py-20">
          <p className="eyebrow mb-6 !text-lima">
            <span className="font-mono text-accent">{'//'}</span> Legal
          </p>
          <h1 className="font-display text-4xl font-medium tracking-tight text-fg md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-xs text-muted">Última actualización: {updated}</p>

          <div className="legal-prose mt-12 space-y-10">{children}</div>
        </main>

        <footer className="border-t border-line/60">
          <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6">
            <p className="font-mono text-[11px] text-muted">
              © {new Date().getFullYear()} ODISEO
            </p>
            <div className="flex gap-5">
              <Link
                href="/privacidad"
                className="font-mono text-[11px] text-muted transition-colors hover:text-fg"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="font-mono text-[11px] text-muted transition-colors hover:text-fg"
              >
                Términos
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-medium text-fg">{title}</h2>
      <div className="space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}
