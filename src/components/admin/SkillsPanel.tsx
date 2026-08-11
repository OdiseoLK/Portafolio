'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useContentKey } from '@/lib/admin';
import { DEFAULT_CONTENT } from '@/lib/defaults';
import type { SkillsContent } from '@/lib/types';
import { Button, Field, PanelTitle, SaveBar, TextInput } from './ui';

export default function SkillsPanel() {
  const skills = useContentKey<SkillsContent>('skills', DEFAULT_CONTENT.skills);
  const groups = skills.value.groups;

  const updateGroup = (index: number, patch: Partial<SkillsContent['groups'][number]>) => {
    const next = groups.map((g, i) => (i === index ? { ...g, ...patch } : g));
    skills.setValue({ groups: next });
  };

  const removeGroup = (index: number) => {
    skills.setValue({ groups: groups.filter((_, i) => i !== index) });
  };

  const addGroup = () => {
    skills.setValue({ groups: [...groups, { name: 'Nuevo grupo', items: [] }] });
  };

  return (
    <section className="space-y-6">
      <PanelTitle
        title="Skills"
        description="Grupos de tecnologías que muestras en el sitio."
      />

      <div className="space-y-5">
        {groups.map((group, i) => (
          <div key={i} className="space-y-4 rounded-lg border border-line bg-card p-5">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Field label="Grupo" htmlFor={`skill-group-${i}`}>
                  <TextInput
                    id={`skill-group-${i}`}
                    value={group.name}
                    onChange={(e) => updateGroup(i, { name: e.target.value })}
                  />
                </Field>
              </div>
              <Button
                variant="danger"
                onClick={() => removeGroup(i)}
                aria-label={`Eliminar grupo ${group.name}`}
              >
                <Trash2 size={15} aria-hidden="true" />
              </Button>
            </div>
            <Field
              label="Tecnologías"
              htmlFor={`skill-items-${i}`}
              hint="Separadas por comas. Los iconos se asignan solos (HTML, CSS, JS, React, Node…)."
            >
              <TextInput
                id={`skill-items-${i}`}
                value={group.items.join(', ')}
                onChange={(e) =>
                  updateGroup(i, {
                    items: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </Field>
          </div>
        ))}
      </div>

      <Button variant="ghost" onClick={addGroup} className="inline-flex items-center gap-2">
        <Plus size={15} aria-hidden="true" />
        Agregar grupo
      </Button>

      <SaveBar
        onSave={() => skills.save()}
        saving={skills.saving}
        saved={skills.saved}
        error={skills.error}
      />
    </section>
  );
}
