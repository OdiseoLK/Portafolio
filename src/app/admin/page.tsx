'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, LogOut } from 'lucide-react';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { useSession } from '@/lib/admin';
import SetupNotice from '@/components/admin/SetupNotice';
import GeneralPanel from '@/components/admin/GeneralPanel';
import AboutPanel from '@/components/admin/AboutPanel';
import SkillsPanel from '@/components/admin/SkillsPanel';
import ProcessPanel from '@/components/admin/ProcessPanel';
import TestimonialsPanel from '@/components/admin/TestimonialsPanel';
import ProjectsPanel from '@/components/admin/ProjectsPanel';
import SocialsPanel from '@/components/admin/SocialsPanel';
import ContactPanel from '@/components/admin/ContactPanel';
import MessagesPanel from '@/components/admin/MessagesPanel';

const PANELS = [
  { id: 'general', label: 'General', component: GeneralPanel },
  { id: 'about', label: 'Sobre mí', component: AboutPanel },
  { id: 'skills', label: 'Skills', component: SkillsPanel },
  { id: 'process', label: 'Proceso', component: ProcessPanel },
  { id: 'projects', label: 'Proyectos', component: ProjectsPanel },
  { id: 'testimonials', label: 'Testimonios', component: TestimonialsPanel },
  { id: 'socials', label: 'Redes', component: SocialsPanel },
  { id: 'contact', label: 'Contacto', component: ContactPanel },
  { id: 'messages', label: 'Mensajes', component: MessagesPanel },
] as const;

type PanelId = (typeof PANELS)[number]['id'];

export default function AdminPage() {
  const router = useRouter();
  const status = useSession();
  const [active, setActive] = useState<PanelId>('general');

  useEffect(() => {
    if (status === 'signed-out' && isSupabaseConfigured) {
      router.replace('/admin/login');
    }
  }, [status, router]);

  if (!isSupabaseConfigured) return <SetupNotice />;

  if (status !== 'signed-in') {
    return (
      <main className="grid min-h-[100svh] place-items-center">
        <p className="eyebrow">Cargando…</p>
      </main>
    );
  }

  const signOut = async () => {
    await getSupabase()?.auth.signOut();
    router.replace('/admin/login');
  };

  const ActivePanel = PANELS.find((p) => p.id === active)?.component ?? GeneralPanel;

  return (
    <div className="min-h-[100svh] md:grid md:grid-cols-[240px,1fr]">
      {/* Sidebar */}
      <aside className="flex flex-col border-b border-line md:border-b-0 md:border-r">
        <div className="p-6">
          <p className="font-display text-sm font-medium tracking-[0.28em] text-fg">
            ODISEO<span className="text-accent">.</span>
          </p>
          <p className="eyebrow mt-2">Panel</p>
        </div>

        <nav aria-label="Secciones del panel" className="flex-1 px-3 pb-4">
          <ul className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {PANELS.map((panel) => (
              <li key={panel.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(panel.id)}
                  aria-current={active === panel.id ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                    active === panel.id ? 'bg-card text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-4 w-px ${active === panel.id ? 'bg-accent' : 'bg-transparent'}`}
                  />
                  {panel.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden border-t border-line p-3 md:block">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Ver sitio
          </a>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-muted transition-colors hover:text-fg"
          >
            <LogOut size={14} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="p-6 md:p-10">
        <div className="max-w-3xl">
          <ActivePanel />
        </div>
        <div className="mt-10 flex gap-4 border-t border-line pt-6 md:hidden">
          <a href="/" className="text-sm text-muted underline underline-offset-4">
            Ver sitio
          </a>
          <button
            type="button"
            onClick={signOut}
            className="text-sm text-muted underline underline-offset-4"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  );
}
