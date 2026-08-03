'use client';

import { useState } from 'react';
import { useContentKey, uploadFile } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { FooterContent, HeroContent } from '@/lib/types';
import { Field, PanelTitle, SaveBar, TextArea, TextInput, inputClass } from './ui';

export default function GeneralPanel() {
  const hero = useContentKey<HeroContent>('hero', DEFAULT_CONTENT.hero);
  const footer = useContentKey<FooterContent>('footer', DEFAULT_CONTENT.footer);
  const [uploading, setUploading] = useState<'photo' | 'cv' | null>(null);

  const handleUpload = async (file: File | undefined, kind: 'photo' | 'cv') => {
    if (!file) return;
    setUploading(kind);
    const url = await uploadFile(file, kind === 'photo' ? 'photos' : 'cv');
    setUploading(null);
    if (!url) return;
    const next =
      kind === 'photo' ? { ...hero.value, photoUrl: url } : { ...hero.value, cvUrl: url };
    await hero.save(next);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <PanelTitle
          title="General"
          description="Contenido principal del hero, fotografía y CV descargable."
        />

        <Field
          label="Descripción"
          htmlFor="hero-description"
          hint="El texto que aparece bajo tu nombre en el hero."
        >
          <TextArea
            id="hero-description"
            rows={3}
            value={hero.value.description}
            onChange={(e) => hero.setValue({ ...hero.value, description: e.target.value })}
          />
        </Field>

        <Field label="Roles" htmlFor="hero-roles" hint="Separados por comas.">
          <TextInput
            id="hero-roles"
            value={hero.value.roles.join(', ')}
            onChange={(e) =>
              hero.setValue({
                ...hero.value,
                roles: e.target.value.split(',').map((r) => r.trim()).filter(Boolean),
              })
            }
          />
        </Field>

        <Field
          label="Disponibilidad"
          htmlFor="hero-availability-label"
          hint="Insignia de estado en el hero (ej. Disponible para nuevos proyectos)."
        >
          <div className="flex flex-wrap items-center gap-4">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={hero.value.availability?.enabled ?? false}
                onChange={(e) =>
                  hero.setValue({
                    ...hero.value,
                    availability: {
                      enabled: e.target.checked,
                      label: hero.value.availability?.label ?? '',
                    },
                  })
                }
                className="h-4 w-4 accent-accent"
              />
              Mostrar
            </label>
            <TextInput
              id="hero-availability-label"
              value={hero.value.availability?.label ?? ''}
              onChange={(e) =>
                hero.setValue({
                  ...hero.value,
                  availability: {
                    enabled: hero.value.availability?.enabled ?? true,
                    label: e.target.value,
                  },
                })
              }
              className="flex-1"
            />
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Fotografía"
            htmlFor="hero-photo"
            hint={uploading === 'photo' ? 'Subiendo…' : 'JPG o PNG. Mientras no subas una, el hero muestra un editor de código.'}
          >
            {hero.value.photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.value.photoUrl}
                alt="Fotografía actual del hero"
                className="mb-3 aspect-[4/5] w-40 border border-line object-cover"
              />
            )}
            <input
              id="hero-photo"
              type="file"
              accept="image/*"
              className={`${inputClass} file:mr-3 file:border-0 file:bg-transparent file:text-sm file:text-fg`}
              onChange={(e) => handleUpload(e.target.files?.[0], 'photo')}
            />
          </Field>

          <Field
            label="CV (PDF)"
            htmlFor="hero-cv"
            hint={uploading === 'cv' ? 'Subiendo…' : 'Se guarda al subir.'}
          >
            {hero.value.cvUrl && (
              <a
                href={hero.value.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 block truncate text-sm text-accent underline underline-offset-4"
              >
                Ver CV actual
              </a>
            )}
            <input
              id="hero-cv"
              type="file"
              accept="application/pdf"
              className={`${inputClass} file:mr-3 file:border-0 file:bg-transparent file:text-sm file:text-fg`}
              onChange={(e) => handleUpload(e.target.files?.[0], 'cv')}
            />
          </Field>
        </div>

        <SaveBar
          onSave={() => hero.save()}
          saving={hero.saving}
          saved={hero.saved}
          error={hero.error}
        />
      </section>

      <section className="space-y-6">
        <PanelTitle title="Footer" description="Frase breve que acompaña a la marca." />
        <Field label="Frase de la marca" htmlFor="footer-tagline">
          <TextArea
            id="footer-tagline"
            rows={2}
            value={footer.value.tagline}
            onChange={(e) => footer.setValue({ ...footer.value, tagline: e.target.value })}
          />
        </Field>
        <SaveBar
          onSave={() => footer.save()}
          saving={footer.saving}
          saved={footer.saved}
          error={footer.error}
        />
      </section>
    </div>
  );
}
