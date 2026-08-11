import { createClient } from '@supabase/supabase-js';
import { DEFAULT_CONTENT } from './defaults';
import type { Project, SiteContent, Testimonial } from './types';

/**
 * Obtiene el contenido del sitio desde Supabase (server-side).
 * Si Supabase no está configurado o falla, devuelve el contenido por defecto:
 * el sitio siempre renderiza.
 */
export async function getContent(): Promise<SiteContent> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return DEFAULT_CONTENT;

  try {
    const supabase = createClient(url, anonKey, { auth: { persistSession: false } });

    const [contentRes, projectsRes, testimonialsRes] = await Promise.all([
      supabase.from('site_content').select('key, value'),
      supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false }),
    ]);

    const map: Record<string, unknown> = {};
    for (const row of contentRes.data ?? []) {
      map[row.key as string] = row.value;
    }

    const merge = <T extends object>(base: T, patch: unknown): T =>
      patch && typeof patch === 'object' ? { ...base, ...(patch as Partial<T>) } : base;

    return {
      hero: merge(DEFAULT_CONTENT.hero, map.hero),
      about: merge(DEFAULT_CONTENT.about, map.about),
      skills: merge(DEFAULT_CONTENT.skills, map.skills),
      services: merge(DEFAULT_CONTENT.services, map.services),
      process: merge(DEFAULT_CONTENT.process, map.process),
      socials: merge(DEFAULT_CONTENT.socials, map.socials),
      contact: merge(DEFAULT_CONTENT.contact, map.contact),
      footer: merge(DEFAULT_CONTENT.footer, map.footer),
      projects: (projectsRes.data as Project[]) ?? [],
      testimonials: (testimonialsRes.data as Testimonial[]) ?? [],
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

/** Convierte una URL en un handle legible: github.com/odiseo */
export function prettyUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '');
}
