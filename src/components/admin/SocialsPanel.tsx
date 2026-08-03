'use client';

import { useContentKey } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { SocialsContent } from '@/lib/types';
import { Field, PanelTitle, SaveBar, TextInput } from './ui';

export default function SocialsPanel() {
  const socials = useContentKey<SocialsContent>('socials', DEFAULT_CONTENT.socials);

  const set = (key: keyof SocialsContent, value: string) =>
    socials.setValue({ ...socials.value, [key]: value });

  return (
    <section className="space-y-6">
      <PanelTitle
        title="Redes sociales"
        description="Los campos vacíos se ocultan del sitio automáticamente."
      />

      <Field label="GitHub" htmlFor="social-github">
        <TextInput
          id="social-github"
          type="url"
          placeholder="https://github.com/usuario"
          value={socials.value.github}
          onChange={(e) => set('github', e.target.value)}
        />
      </Field>

      <Field label="LinkedIn" htmlFor="social-linkedin">
        <TextInput
          id="social-linkedin"
          type="url"
          placeholder="https://linkedin.com/in/usuario"
          value={socials.value.linkedin}
          onChange={(e) => set('linkedin', e.target.value)}
        />
      </Field>

      <Field label="Instagram" htmlFor="social-instagram">
        <TextInput
          id="social-instagram"
          type="url"
          placeholder="https://instagram.com/usuario"
          value={socials.value.instagram}
          onChange={(e) => set('instagram', e.target.value)}
        />
      </Field>

      <Field label="Correo electrónico" htmlFor="social-email">
        <TextInput
          id="social-email"
          type="email"
          placeholder="hola@tudominio.com"
          value={socials.value.email}
          onChange={(e) => set('email', e.target.value)}
        />
      </Field>

      <SaveBar
        onSave={() => socials.save()}
        saving={socials.saving}
        saved={socials.saved}
        error={socials.error}
      />
    </section>
  );
}
