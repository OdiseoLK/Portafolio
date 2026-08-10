'use client';

export default function SetupNotice() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-5">
      <div className="w-full max-w-md rounded-lg border border-line bg-card p-8">
        <p className="font-display text-sm font-medium tracking-[0.28em] text-fg">
          ODISEO<span className="text-accent">.</span>
        </p>
        <h1 className="mt-6 font-display text-xl font-medium tracking-tight text-fg">
          Supabase no está configurado
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          El panel necesita las variables de entorno de Supabase para funcionar. Copia{' '}
          <code className="font-mono text-xs text-fg">.env.example</code> a{' '}
          <code className="font-mono text-xs text-fg">.env.local</code>, agrega la URL y la anon
          key de tu proyecto, ejecuta{' '}
          <code className="font-mono text-xs text-fg">supabase/schema.sql</code> en el SQL Editor y
          crea tu usuario en Authentication. Los pasos completos están en el README.
        </p>
      </div>
    </main>
  );
}
