-- ============================================================
-- ODISEO Studio · Proyectos: fuera Cielo Canela y Aborigen,
-- entra Soluciones Integrales Rivadeneyra
-- Ejecutar en: Supabase → SQL Editor → New query → Run
--
-- POR QUÉ: el sitio lee los proyectos de Supabase; cambiar el
-- código no basta. Las imágenes (/casos/sir-caso.webp) ya vienen
-- en el .zip del portafolio.
-- ============================================================

begin;

-- 1) Fuera Cielo Canela y Aborigen
delete from public.projects
where title ilike 'Aborigen%'
   or title ilike 'Cielo Canela%'
   or project_url in ('https://aborigenorizaba.com', 'https://cielocanela.com');

-- 2) Entra Rivadeneyra (sin dominio todavía: project_url vacío, no sale el botón "Visitar")
insert into public.projects (title, description, tags, image_url, project_url, published, sort_order)
select
  'Soluciones Integrales Rivadeneyra',
  'Taller de carpintería, aluminio y cristal y remodelación en Orizaba. Sitio multipágina organizado por áreas (doméstico, residencial e industrial), con fichas de proyecto, cotizador por WhatsApp que dibuja un plano con tus medidas, "Medir con foto" y "Diseña tu mueble". Dos versiones de color.',
  array['Carpintería · Remodelación', 'Multipágina', 'Cotizador por WhatsApp', 'Diseña tu mueble'],
  '/casos/sir-caso.webp',
  null,
  true,
  6
where not exists (
  select 1 from public.projects where title = 'Soluciones Integrales Rivadeneyra'
);

commit;

-- Cuando Rivadeneyra tenga dominio, corre esto con la dirección real:
-- update public.projects set project_url = 'https://TU-DOMINIO' where title = 'Soluciones Integrales Rivadeneyra';

-- Verificación: deben salir 6 filas, Rivadeneyra al final
select sort_order, title, project_url from public.projects order by sort_order;
