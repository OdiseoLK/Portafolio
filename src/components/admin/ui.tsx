'use client';

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

export const inputClass =
  'w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-muted/40 focus:border-accent';

export function PanelTitle({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-8 border-b border-line pb-6">
      <h2 className="font-display text-2xl font-medium tracking-tight text-fg">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </header>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-2 block">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted/80">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-y ${props.className ?? ''}`} />;
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
}) {
  const styles = {
    primary: 'bg-fg text-bg hover:bg-white disabled:opacity-60',
    ghost: 'border border-line text-fg hover:border-accent/60 disabled:pointer-events-none disabled:opacity-40',
    danger: 'border border-line text-muted hover:border-red-400/50 hover:text-red-300',
  }[variant];
  return (
    <button
      type="button"
      {...props}
      className={`rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${styles} ${className}`}
    />
  );
}

/** Botón de guardado con estado inline: guardando, guardado, error. */
export function SaveBar({
  onSave,
  saving,
  saved,
  error,
  label = 'Guardar cambios',
}: {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  error?: string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-6">
      <Button onClick={onSave} disabled={saving}>
        {saving ? 'Guardando…' : label}
      </Button>
      <p aria-live="polite" className="text-sm">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-fg">
            <Check size={14} aria-hidden="true" className="text-accent" />
            Guardado
          </span>
        )}
        {error && <span className="text-red-300">{error}</span>}
      </p>
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card p-5 text-sm leading-relaxed text-muted">
      {children}
    </div>
  );
}
