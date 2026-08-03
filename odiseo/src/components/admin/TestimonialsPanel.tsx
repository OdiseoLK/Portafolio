'use client';

import { useCallback, useEffect, useState } from 'react';
import { Check, Clock, Trash2, Upload } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/admin';
import type { Testimonial } from '@/lib/types';
import { Button, Notice, PanelTitle } from './ui';

export default function TestimonialsPanel() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('approved', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    setItems((data as Testimonial[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleApprove = async (t: Testimonial) => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from('testimonials').update({ approved: !t.approved }).eq('id', t.id);
    await load();
  };

  const remove = async (t: Testimonial) => {
    const supabase = getSupabase();
    if (!supabase) return;
    if (!window.confirm(`¿Eliminar el testimonio de ${t.name}?`)) return;
    await supabase.from('testimonials').delete().eq('id', t.id);
    await load();
  };

  const onAvatar = async (t: Testimonial, file: File) => {
    setUploading(t.id);
    const url = await uploadFile(file, 'avatars');
    const supabase = getSupabase();
    if (url && supabase) {
      await supabase.from('testimonials').update({ avatar_url: url }).eq('id', t.id);
      await load();
    }
    setUploading(null);
  };

  const pending = items.filter((t) => !t.approved);

  return (
    <section className="space-y-6">
      <PanelTitle
        title="Testimonios"
        description="Los enviados desde el sitio llegan sin publicar. Apruébalos para que aparezcan."
      />

      {pending.length > 0 && (
        <Notice>
          Tienes {pending.length} testimonio{pending.length > 1 ? 's' : ''} pendiente
          {pending.length > 1 ? 's' : ''} de revisar.
        </Notice>
      )}

      {items.length === 0 ? (
        <Notice>Todavía no hay testimonios.</Notice>
      ) : (
        <ul className="space-y-4">
          {items.map((t) => (
            <li
              key={t.id}
              className={`rounded-lg border bg-card p-5 ${
                t.approved ? 'border-line' : 'border-accent/50'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide ${
                    t.approved ? 'text-lima' : 'text-accent'
                  }`}
                >
                  {t.approved ? (
                    <>
                      <Check size={12} aria-hidden="true" /> Publicado
                    </>
                  ) : (
                    <>
                      <Clock size={12} aria-hidden="true" /> Pendiente
                    </>
                  )}
                </span>
                <time dateTime={t.created_at} className="font-mono text-[11px] text-muted">
                  {t.created_at
                    ? new Date(t.created_at).toLocaleDateString('es-MX', { dateStyle: 'medium' })
                    : '—'}
                </time>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>

              <div className="mt-4 flex items-center gap-3">
                {t.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar_url}
                    alt={t.name}
                    className="h-10 w-10 rounded-full border border-line object-cover"
                  />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface font-mono text-xs text-accent">
                    {t.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">{t.name}</p>
                  {t.role && <p className="truncate font-mono text-xs text-muted">{t.role}</p>}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
                <Button variant={t.approved ? 'ghost' : 'primary'} onClick={() => toggleApprove(t)}>
                  {t.approved ? 'Ocultar' : 'Aprobar y publicar'}
                </Button>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent/60">
                  <Upload size={14} aria-hidden="true" />
                  {uploading === t.id ? 'Subiendo…' : t.avatar_url ? 'Cambiar foto' : 'Subir foto'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onAvatar(t, file);
                    }}
                  />
                </label>

                <Button
                  variant="danger"
                  onClick={() => remove(t)}
                  aria-label={`Eliminar testimonio de ${t.name}`}
                >
                  <Trash2 size={14} aria-hidden="true" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
