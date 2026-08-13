'use client';

import { useContentKey } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { ContactContent } from '@/lib/types';
import { Field, PanelTitle, SaveBar, TextArea, TextInput } from './ui';

export default function ContactPanel() {
  const contact = useContentKey<ContactContent>('contact', DEFAULT_CONTENT.contact);

  return (
    <section className="space-y-6">
      <PanelTitle title="Contacto" description="Título, texto y correo visible de la sección." />

      <Field label="Título" htmlFor="contact-title">
        <TextInput
          id="contact-title"
          value={contact.value.title}
          onChange={(e) => contact.setValue({ ...contact.value, title: e.target.value })}
        />
      </Field>

      <Field label="Texto" htmlFor="contact-text">
        <TextArea
          id="contact-text"
          rows={3}
          value={contact.value.text}
          onChange={(e) => contact.setValue({ ...contact.value, text: e.target.value })}
        />
      </Field>

      <Field
        label="Correo de contacto"
        htmlFor="contact-email"
        hint="Se muestra junto al formulario. Déjalo vacío para ocultarlo."
      >
        <TextInput
          id="contact-email"
          type="email"
          value={contact.value.email}
          onChange={(e) => contact.setValue({ ...contact.value, email: e.target.value })}
        />
      </Field>

      <Field
        label="WhatsApp (enlace)"
        htmlFor="contact-wa"
        hint="Tu enlace de WhatsApp Business (wa.me/...). Déjalo vacío para ocultar el botón flotante."
      >
        <TextInput
          id="contact-wa"
          type="url"
          value={contact.value.whatsappUrl}
          onChange={(e) => contact.setValue({ ...contact.value, whatsappUrl: e.target.value })}
          placeholder="https://wa.me/message/..."
        />
      </Field>

      <Field
        label="Ubicación"
        htmlFor="contact-location"
        hint="Ej. Orizaba, Veracruz — México. Déjalo vacío para ocultarla."
      >
        <TextInput
          id="contact-location"
          value={contact.value.location}
          onChange={(e) => contact.setValue({ ...contact.value, location: e.target.value })}
        />
      </Field>

      <SaveBar
        onSave={() => contact.save()}
        saving={contact.saving}
        saved={contact.saved}
        error={contact.error}
      />
    </section>
  );
}
