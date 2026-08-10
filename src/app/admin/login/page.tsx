'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { useSession } from '@/lib/admin';
import SetupNotice from '@/components/admin/SetupNotice';
import { Button, Field, TextInput } from '@/components/admin/ui';

export default function AdminLoginPage() {
  const router = useRouter();
  const status = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'signed-in') router.replace('/admin');
  }, [status, router]);

  if (!isSupabaseConfigured) return <SetupNotice />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      return;
    }
    router.replace('/admin');
  };

  return (
    <main className="grid min-h-[100svh] place-items-center px-5">
      <div className="w-full max-w-sm">
        <p className="font-display text-sm font-medium tracking-[0.28em] text-fg">
          ODISEO<span className="text-accent">.</span>
        </p>
        <h1 className="mt-6 font-display text-2xl font-medium tracking-tight text-fg">
          Panel de administración
        </h1>
        <p className="mt-2 text-sm text-muted">Inicia sesión para editar el contenido del sitio.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Field label="Correo electrónico" htmlFor="login-email">
            <TextInput
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Contraseña" htmlFor="login-password">
            <TextInput
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          <Button type="submit" disabled={busy} className="w-full">
            {busy ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>
      </div>
    </main>
  );
}
