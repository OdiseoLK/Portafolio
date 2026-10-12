-- ============================================================
-- ODISEO Studio · Nuevo proyecto: Ventuno Arquitectura
-- Supabase → SQL Editor → New query → Run (mismo proyecto de siempre)
-- ============================================================

insert into public.projects (title, description, tags, image_url, project_url, published, sort_order)
select
  'Ventuno Arquitectura',
  'Estudio de visualización, diseño y construcción arquitectónica. Sitio que deja ver la casa antes de construirla: la fachada del Proyecto ME de día, con niebla y de noche, la cocina del Proyecto J con tres materiales a elegir, un comparador de luz natural y artificial, y misión, visión y valores.',
  array['Arquitectura · Renders', 'Antes de construir', 'Materiales interactivos', 'Misión y visión'],
  '/casos/ventuno-caso.webp',
  'https://velvety-pothos-c1e282.netlify.app/',
  true,
  8
where not exists (select 1 from public.projects where title = 'Ventuno Arquitectura');

-- Verificación: deben salir 8 proyectos, Ventuno al final
select sort_order, title, project_url from public.projects order by sort_order;
