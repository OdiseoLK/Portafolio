'use client';

import { useContentKey } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { AboutContent } from '@/lib/types';
import { Field, PanelTitle, SaveBar, TextArea, TextInput } from './ui';

export default function AboutPanel() {
  const about = useContentKey<AboutContent>('about', DEFAULT_CONTENT.about);

  return (
    <section className="space-y-6">
      <PanelTitle title="Sobre mí" description="Título y párrafos de la sección." />

      <Field label="Título" htmlFor="about-title">
        <TextInput
          id="about-title"
          value={about.value.title}
          onChange={(e) => about.setValue({ ...about.value, title: e.target.value })}
        />
      </Field>

      <Field
        label="Párrafos"
        htmlFor="about-paragraphs"
        hint="Un párrafo por línea. El primero se muestra destacado."
      >
        <TextArea
          id="about-paragraphs"
          rows={8}
          value={about.value.paragraphs.join('\n')}
          onChange={(e) =>
            about.setValue({
              ...about.value,
              paragraphs: e.target.value.split('\n').filter((p) => p.trim().length > 0),
            })
          }
        />
      </Field>

      <SaveBar
        onSave={() => about.save()}
        saving={about.saving}
        saved={about.saved}
        error={about.error}
      />
    </section>
  );
}
