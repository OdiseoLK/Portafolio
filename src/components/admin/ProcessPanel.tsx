'use client';

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useContentKey } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { ProcessContent } from '@/lib/types';
import { Button, Field, PanelTitle, SaveBar, TextArea, TextInput } from './ui';

export default function ProcessPanel() {
  const process = useContentKey<ProcessContent>('process', DEFAULT_CONTENT.process);
  const steps = process.value.steps;

  const updateStep = (index: number, patch: Partial<ProcessContent['steps'][number]>) => {
    const next = steps.map((s, i) => (i === index ? { ...s, ...patch } : s));
    process.setValue({ ...process.value, steps: next });
  };

  const removeStep = (index: number) => {
    process.setValue({ ...process.value, steps: steps.filter((_, i) => i !== index) });
  };

  const moveStep = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[index], next[target]] = [next[target], next[index]];
    process.setValue({ ...process.value, steps: next });
  };

  const addStep = () => {
    process.setValue({
      ...process.value,
      steps: [...steps, { title: 'Nuevo paso', text: '' }],
    });
  };

  return (
    <section className="space-y-6">
      <PanelTitle
        title="Proceso"
        description="Los pasos de tu forma de trabajar. La numeración (01, 02…) se genera sola según el orden."
      />

      <Field label="Título de la sección" htmlFor="process-title">
        <TextInput
          id="process-title"
          value={process.value.title}
          onChange={(e) => process.setValue({ ...process.value, title: e.target.value })}
        />
      </Field>

      <div className="space-y-5">
        {steps.map((step, i) => (
          <div key={i} className="space-y-4 rounded-lg border border-line bg-card p-5">
            <div className="flex items-end gap-3">
              <p className="pb-2.5 font-mono text-xs tracking-[0.3em] text-muted">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className="flex-1">
                <Field label="Paso" htmlFor={`process-step-${i}`}>
                  <TextInput
                    id={`process-step-${i}`}
                    value={step.title}
                    onChange={(e) => updateStep(i, { title: e.target.value })}
                  />
                </Field>
              </div>
              <Button
                variant="ghost"
                onClick={() => moveStep(i, -1)}
                disabled={i === 0}
                aria-label={`Subir paso ${step.title}`}
              >
                <ChevronUp size={15} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => moveStep(i, 1)}
                disabled={i === steps.length - 1}
                aria-label={`Bajar paso ${step.title}`}
              >
                <ChevronDown size={15} aria-hidden="true" />
              </Button>
              <Button
                variant="danger"
                onClick={() => removeStep(i)}
                aria-label={`Eliminar paso ${step.title}`}
              >
                <Trash2 size={15} aria-hidden="true" />
              </Button>
            </div>
            <Field label="Descripción" htmlFor={`process-text-${i}`}>
              <TextArea
                id={`process-text-${i}`}
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
        Agregar paso
      </Button>

      <SaveBar
        onSave={() => process.save()}
        saving={process.saving}
        saved={process.saved}
        error={process.error}
      />
    </section>
  );
}
