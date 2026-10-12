-- ODISEO Studio · La opinión de "Comunicación y Marketing" pasa a llamarse Fundación Mérida
-- Supabase → SQL Editor → New query → Run (mismo proyecto de siempre)

update public.testimonials
set name = 'Fundación Mérida'
where quote like 'Trabajar con Alexis en el diseño web del Hospital Puerta Grande%';

-- Verificación
select sort_order, name, role from public.testimonials where approved order by sort_order;
