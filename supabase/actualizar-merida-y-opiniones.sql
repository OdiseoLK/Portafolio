-- ============================================================
-- ODISEO Studio · Fundación Zurita Mérida + reseñas de Google
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- (en el MISMO proyecto donde corriste el de Rivadeneyra)
-- ============================================================

begin;

-- 1) Nuevo proyecto: Fundación Zurita · Mérida
insert into public.projects (title, description, tags, image_url, project_url, published, sort_order)
select
  'Fundación Zurita · Mérida',
  'Clínica oftalmológica de la Fundación Doctor Hernández Zurita en Mérida, Yucatán. Sitio de lanzamiento con carrusel de promociones en el inicio, servicios y cirugías (catarata, carnosidad y revisión de retina para pacientes con diabetes), tecnología de la clínica, prueba de visión orientativa en línea, mapa y agenda por WhatsApp.',
  array['Salud visual · Mérida', 'Promociones', 'Prueba de visión', 'Agenda por WhatsApp'],
  '/casos/merida-caso.webp',
  'https://elaborate-chimera-04681f.netlify.app/',
  true,
  7
where not exists (select 1 from public.projects where title = 'Fundación Zurita · Mérida');

-- 2) Reseñas de Google en la sección de opiniones
insert into public.testimonials (name, role, quote, approved, sort_order)
select 'Hospital Puerta Grande', 'Reseña en Google', 'Trabajar con Alexis en la página web del Hospital Puerta Grande ha sido una experiencia muy positiva. Ha sabido escuchar nuestras necesidades y ayudarnos a proyectar una imagen profesional, con información clara sobre nuestros servicios. Destaco su atención, sus propuestas y la disposición para realizar ajustes. Lo recomiendo por su compromiso y por la facilidad de trabajar en equipo con él.', true, 2
where not exists (select 1 from public.testimonials where quote = 'Trabajar con Alexis en la página web del Hospital Puerta Grande ha sido una experiencia muy positiva. Ha sabido escuchar nuestras necesidades y ayudarnos a proyectar una imagen profesional, con información clara sobre nuestros servicios. Destaco su atención, sus propuestas y la disposición para realizar ajustes. Lo recomiendo por su compromiso y por la facilidad de trabajar en equipo con él.');

insert into public.testimonials (name, role, quote, approved, sort_order)
select 'Fundación Doctor Hernández Zurita', 'Reseña en Google', 'Lo que más valoro de trabajar con Alexis es su interés por comprender la misión de la Fundación Doctor Hernández Zurita y reflejarla en nuestra página web. Nos ha ayudado a dar forma a nuestras ideas y a presentar nuestros servicios de manera cercana y accesible. Su apertura para escuchar, proponer y resolver dudas hace que el trabajo sea muy práctico. Sin duda, recomiendo su trabajo.', true, 3
where not exists (select 1 from public.testimonials where quote = 'Lo que más valoro de trabajar con Alexis es su interés por comprender la misión de la Fundación Doctor Hernández Zurita y reflejarla en nuestra página web. Nos ha ayudado a dar forma a nuestras ideas y a presentar nuestros servicios de manera cercana y accesible. Su apertura para escuchar, proponer y resolver dudas hace que el trabajo sea muy práctico. Sin duda, recomiendo su trabajo.');

insert into public.testimonials (name, role, quote, approved, sort_order)
select 'Antar Jalil Kuri', 'Decora · Reseña en Google', '10/10 excelente servicio', true, 4
where not exists (select 1 from public.testimonials where quote = '10/10 excelente servicio');

commit;

-- Verificación
select sort_order, title, project_url from public.projects order by sort_order;
select sort_order, name, role from public.testimonials where approved order by sort_order;
