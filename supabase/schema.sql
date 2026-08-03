-- ============================================================
-- ODISEO — Schema de Supabase
-- Ejecutar completo en: Supabase Dashboard -> SQL Editor -> Run
-- ============================================================

-- ------------------------------------------------------------
-- Contenido editable del sitio (clave/valor en JSONB)
-- Claves usadas: hero, about, skills, socials, contact, footer
-- ------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Proyectos del portafolio
-- ------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tags text[] not null default '{}',
  image_url text,
  project_url text,
  repo_url text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Mensajes del formulario de contacto
-- ------------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Testimonios (moderados: aparecen solo cuando approved = true)
-- ------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  avatar_url text,
  quote text not null,
  approved boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint testimonials_name_len check (char_length(name) between 1 and 100),
  constraint testimonials_role_len check (role is null or char_length(role) <= 120),
  constraint testimonials_quote_len check (char_length(quote) between 1 and 600)
);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.site_content enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.testimonials enable row level security;

-- site_content: lectura pública, escritura solo autenticada
create policy "site_content: lectura publica"
  on public.site_content for select
  using (true);

create policy "site_content: escritura autenticada"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);

-- projects: los publicados son públicos; el panel (autenticado) ve y edita todo
create policy "projects: lectura publica de publicados"
  on public.projects for select
  using (published = true);

create policy "projects: acceso total autenticado"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- messages: cualquiera puede enviar; solo autenticado puede leer/gestionar
-- Límites de tamaño en messages (defensa a nivel base de datos)
alter table public.messages
  add constraint messages_name_len check (char_length(name) between 1 and 100),
  add constraint messages_email_len check (char_length(email) between 3 and 150),
  add constraint messages_message_len check (char_length(message) between 1 and 2000);

create policy "messages: insercion publica"
  on public.messages for insert
  to anon, authenticated
  with check (true);

create policy "messages: lectura autenticada"
  on public.messages for select
  to authenticated
  using (true);

create policy "messages: actualizacion autenticada"
  on public.messages for update
  to authenticated
  using (true)
  with check (true);

create policy "messages: borrado autenticado"
  on public.messages for delete
  to authenticated
  using (true);

-- testimonials: el público solo ve los aprobados
create policy "testimonials: lectura publica de aprobados"
  on public.testimonials for select
  using (approved = true);

-- testimonials: cualquiera puede enviar uno (queda sin aprobar)
create policy "testimonials: envio publico"
  on public.testimonials for insert
  to anon, authenticated
  with check (approved = false);

-- testimonials: solo tú (autenticado) ves todos, apruebas, editas y borras
create policy "testimonials: acceso total autenticado"
  on public.testimonials for select
  to authenticated
  using (true);

create policy "testimonials: actualizacion autenticada"
  on public.testimonials for update
  to authenticated
  using (true)
  with check (true);

create policy "testimonials: borrado autenticado"
  on public.testimonials for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- Storage: bucket público `media` (fotos, CV, imágenes de proyectos)
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media: lectura publica"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media: subida autenticada"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "media: actualizacion autenticada"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

create policy "media: borrado autenticado"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ============================================================
-- Proyectos iniciales (editables o eliminables desde /admin)
-- ============================================================
insert into public.projects (id, title, description, tags, published, sort_order)
values
  (
    'a1000000-0000-4000-8000-000000000001',
    'Decora',
    'Sitio editorial para showroom de diseño de interiores en Orizaba: galería con fotografía real, slider antes/después e integración de video. Desplegado en Hostinger.',
    array['HTML', 'CSS', 'JavaScript'],
    true,
    1
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'Fundación Hernández Zurita · Hospital Puerta Grande',
    'Sitio institucional para fundación oftalmológica: fotografía real, videos de YouTube integrados y directorio de 16 sedes en el centro y sur de México.',
    array['HTML', 'CSS', 'JavaScript'],
    true,
    2
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'Panadería Flores',
    'Rediseño completo para panadería tradicional: catálogo de 188 productos con precios reales, ilustraciones SVG hechas a mano y pedidos directos vía WhatsApp Business.',
    array['HTML', 'CSS', 'JavaScript', 'SVG'],
    true,
    3
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'Inmobiliaria Tirado',
    'Sitio inmobiliario con catálogo de propiedades y panel de administración con CRUD completo, endurecido en varias rondas de auditoría de seguridad (hash de contraseñas PBKDF2-SHA256).',
    array['HTML', 'CSS', 'JavaScript'],
    true,
    4
  )
on conflict (id) do nothing;
