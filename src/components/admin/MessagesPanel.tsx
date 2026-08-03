'use client';

import { useCallback, useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import type { ContactMessage } from '@/lib/types';
import { Button, Notice, PanelTitle } from './ui';

export default function MessagesPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages((data as ContactMessage[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (message: ContactMessage) => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from('messages').update({ read: !message.read }).eq('id', message.id);
    await load();
  };

  const remove = async (message: ContactMessage) => {
    const supabase = getSupabase();
    if (!supabase) return;
    if (!window.confirm(`¿Eliminar el mensaje de ${message.name}?`)) return;
    await supabase.from('messages').delete().eq('id', message.id);
    await load();
  };

  return (
    <section className="space-y-6">
      <PanelTitle title="Mensajes" description="Recibidos desde el formulario de contacto." />

      {messages.length === 0 ? (
        <Notice>Todavía no hay mensajes.</Notice>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`border bg-card p-5 ${
                message.read ? 'border-line' : 'border-accent/40'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-fg">
                  {message.name}
                  <a
                    href={`mailto:${message.email}`}
                    className="ml-3 font-mono text-xs text-accent hover:underline"
                  >
                    {message.email}
                  </a>
                </p>
                <time
                  dateTime={message.created_at}
                  className="font-mono text-[11px] text-muted"
                >
                  {new Date(message.created_at).toLocaleString('es-MX', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted">
                {message.message}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <Button variant="ghost" onClick={() => toggleRead(message)}>
                  {message.read ? 'Marcar como no leído' : 'Marcar como leído'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => remove(message)}
                  aria-label={`Eliminar mensaje de ${message.name}`}
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
