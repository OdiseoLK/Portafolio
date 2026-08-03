'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from './supabase';

export type AuthStatus = 'loading' | 'signed-out' | 'signed-in';

/** Estado de sesión de Supabase Auth, reactivo a cambios. */
export function useSession(): AuthStatus {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setStatus('signed-out');
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'signed-in' : 'signed-out');
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'signed-in' : 'signed-out');
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return status;
}

/**
 * Lee y guarda una clave de la tabla `site_content`, fusionando con el
 * contenido por defecto para que los formularios siempre tengan datos.
 */
export function useContentKey<T extends object>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    supabase
      .from('site_content')
      .select('value')
      .eq('key', key)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (data?.value && typeof data.value === 'object') {
          setValue((prev) => ({ ...prev, ...(data.value as Partial<T>) }));
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // `fallback` es una constante estable por panel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const save = useCallback(
    async (next?: T) => {
      const supabase = getSupabase();
      if (!supabase) return false;
      const payload = next ?? value;
      setSaving(true);
      setSaved(false);
      setError('');
      const { error: err } = await supabase
        .from('site_content')
        .upsert({ key, value: payload, updated_at: new Date().toISOString() });
      setSaving(false);
      if (err) {
        setError(err.message);
        return false;
      }
      if (next) setValue(next);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
      return true;
    },
    [key, value],
  );

  return { value, setValue, save, loading, saving, saved, error };
}

/** Sube un archivo al bucket público `media` y devuelve su URL pública. */
export async function uploadFile(file: File, folder: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const path = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('media')
    .upload(path, file, { upsert: true, cacheControl: '3600' });
  if (error) return null;
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}
