'use client';

import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/admin';
import type { Project } from '@/lib/types';
import { Button, Field, Notice, PanelTitle, TextArea, TextInput, inputClass } from './ui';

interface ProjectForm {
  title: string;
  description: string;
  tags: string;
  image_url: string;
  project_url: string;
  repo_url: string;
  published: boolean;
  sort_order: number;
}

const EMPTY_FORM: ProjectForm = {
  title: '',
  description: '',
  tags: '',
  image_url: '',
  project_url: '',
  repo_url: '',
  published: false,
  sort_order: 0,
};

export default function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    setProjects((data as Project[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setForm({ ...EMPTY_FORM, sort_order: projects.length });
    setEditing('new');
    setError('');
  };

  const startEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description ?? '',
      tags: (project.tags ?? []).join(', '),
      image_url: project.image_url ?? '',
      project_url: project.project_url ?? '',
      repo_url: project.repo_url ?? '',
      published: project.published,
      sort_order: project.sort_order,
    });
    setEditing(project.id);
    setError('');
  };

  const handleImage = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file, 'projects');
    setUploading(false);
    if (url) setForm((f) => ({ ...f, image_url: url }));
  };

  const saveProject = async () => {
    const supabase = getSupabase();
    if (!supabase || !form.title.trim()) return;
    setBusy(true);
    setError('');
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      image_url: form.image_url || null,
      project_url: form.project_url.trim() || null,
      repo_url: form.repo_url.trim() || null,
      published: form.published,
      sort_order: form.sort_order,
    };
    const result =
      editing === 'new'
        ? await supabase.from('projects').insert(payload)
        : await supabase.from('projects').update(payload).eq('id', editing as string);
    setBusy(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditing(null);
    await load();
  };

  const deleteProject = async (project: Project) => {
    const supabase = getSupabase();
    if (!supabase) return;
    if (!window.confirm(`¿Eliminar "${project.title}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from('projects').delete().eq('id', project.id);
    await load();
  };

  return (
    <section className="space-y-6">
      <PanelTitle
        title="Proyectos"
        description="Solo los proyectos publicados aparecen en el sitio."
      />

      {editing === null ? (
        <>
          {projects.length === 0 ? (
            <Notice>
              Todavía no hay proyectos. El sitio muestra el mensaje de &ldquo;próximamente&rdquo;
              hasta que publiques el primero.
            </Notice>
          ) : (
            <ul className="divide-y divide-line border border-line">
              {projects.map((project) => (
                <li key={project.id} className="flex items-center gap-4 bg-card p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-fg">{project.title}</p>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                      {project.published ? 'Publicado' : 'Borrador'} · Orden {project.sort_order}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => startEdit(project)}
                    aria-label={`Editar ${project.title}`}
                  >
                    <Pencil size={14} aria-hidden="true" />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteProject(project)}
                    aria-label={`Eliminar ${project.title}`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button variant="ghost" onClick={startNew} className="inline-flex items-center gap-2">
            <Plus size={15} aria-hidden="true" />
            Nuevo proyecto
          </Button>
        </>
      ) : (
        <div className="space-y-6 rounded-lg border border-line bg-card p-6">
          <Field label="Título" htmlFor="project-title">
            <TextInput
              id="project-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>

          <Field label="Descripción" htmlFor="project-description">
            <TextArea
              id="project-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>

          <Field label="Tags" htmlFor="project-tags" hint="Separados por comas: Next.js, Supabase…">
            <TextInput
              id="project-tags"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </Field>

          <Field
            label="Imagen"
            htmlFor="project-image"
            hint={uploading ? 'Subiendo…' : 'Relación 16:9 recomendada.'}
          >
            {form.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.image_url}
                alt="Vista previa del proyecto"
                className="mb-3 aspect-video w-64 border border-line object-cover"
              />
            )}
            <input
              id="project-image"
              type="file"
              accept="image/*"
              className={`${inputClass} file:mr-3 file:border-0 file:bg-transparent file:text-sm file:text-fg`}
              onChange={(e) => handleImage(e.target.files?.[0])}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="URL del proyecto" htmlFor="project-url">
              <TextInput
                id="project-url"
                type="url"
                placeholder="https://…"
                value={form.project_url}
                onChange={(e) => setForm({ ...form, project_url: e.target.value })}
              />
            </Field>
            <Field label="Repositorio" htmlFor="project-repo">
              <TextInput
                id="project-repo"
                type="url"
                placeholder="https://github.com/…"
                value={form.repo_url}
                onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
              />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2.5 text-sm text-fg">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="h-4 w-4 accent-[#5C6BC0]"
              />
              Publicado
            </label>
            <label className="flex items-center gap-2.5 text-sm text-fg">
              Orden
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 0 })}
                className={`${inputClass} w-24`}
              />
            </label>
          </div>

          <div className="flex items-center gap-3 border-t border-line pt-6">
            <Button onClick={saveProject} disabled={busy || !form.title.trim()}>
              {busy ? 'Guardando…' : editing === 'new' ? 'Crear proyecto' : 'Guardar cambios'}
            </Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            {error && <p className="text-sm text-red-300">{error}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
