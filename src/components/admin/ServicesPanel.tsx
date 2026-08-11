'use client';

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useContentKey } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { ServicesContent } from '@/lib/types';
import { Button, Field, PanelTitle, SaveBar, TextArea, TextInput } from './ui';

export default function ServicesPanel() {
  const services = useContentKey<ServicesContent>('services', DEFAULT_CONTENT.services);
  const items = services.value.items;

  const updateStep = (index: number, patch: Partial<ServicesContent['items'][number]>) => {
    const next = items.map((s, i) => (i === index ? { ...s, ...patch } : s));
    services.setValue({ ...services.value, items: next });
  };

  const removeStep = (index: number) => {
    services.setValue({ ...services.value, items: items.filter((_, i) => i !== index) });
  };

  const moveStep = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    services.setValue({ ...services.value, items: next });
  };

  const addStep = () => {
    services.setValue({
      ...services.value,
      items: [...items, { title: 'Nuevo servicio', text: '' }],
    });
  };

  return (
    <section className="space-y-6">
      <PanelTitle
        title="Servicios"
        description="Los tipos de trabajo que ofreces. La numeración (01, 02…) se genera sola según el orden."
      />

      <Field label="Título de la sección" htmlFor="services-title">
        <TextInput
          id="services-title"
          value={services.value.title}
          onChange={(e) => services.setValue({ ...services.value, title: e.target.value })}
        />
      </Field>

      <div className="space-y-5">
        {items.map((step, i) => (
          <div key={i} className="space-y-4 rounded-lg border border-line bg-card p-5">
            <div className="flex items-end gap-3">
              <p className="pb-2.5 font-mono text-xs tracking-[0.3em] text-muted">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className="flex-1">
                <Field label="Servicio" htmlFor={`services-item-${i}`}>
                  <TextInput
                    id={`services-item-${i}`}
                    value={step.title}
                    onChange={(e) => updateStep(i, { title: e.target.value })}
                  />
                </Field>
              </div>
              <Button
                variant="ghost"
                onClick={() => moveStep(i, -1)}
                disabled={i === 0}
                aria-label={`Subir servicio ${step.title}`}
              >
                <ChevronUp size={15} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => moveStep(i, 1)}
                disabled={i === items.length - 1}
                aria-label={`Bajar servicio ${step.title}`}
              >
                <ChevronDown size={15} aria-hidden="true" />
              </Button>
              <Button
                variant="danger"
                onClick={() => removeStep(i)}
                aria-label={`Eliminar servicio ${step.title}`}
              >
                <Trash2 size={15} aria-hidden="true" />
              </Button>
            </div>
            <Field label="Descripción" htmlFor={`services-text-${i}`}>
              <TextArea
                id={`services-text-${i}`}
                rows={2}
                value={step.text}
                onChange={(e) => updateStep(i, { text: e.target.value })}
              />
            </Field>
          </div>
        ))}
      </div>

      <Button variant="ghost" onClick={addStep} className="inline-flex items-center gap-2">
        <Plus size={15} aria-hidden="true" />
        Agregar servicio
      </Button>

      <SaveBar
        onSave={() => services.save()}
        saving={services.saving}
        saved={services.saved}
        error={services.error}
      />
    </section>
  );
}
