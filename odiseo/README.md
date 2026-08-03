# ODISEO — Portafolio personal

Portafolio con CMS propio. Tema oscuro, tipografía protagonista (Geist + Space Grotesk, servidas localmente), fondo de cuadrícula técnica reactiva al mouse, microanimaciones con Framer Motion y panel de administración protegido con Supabase Auth.

## Stack

- **Next.js 14** (App Router) + React + TypeScript
- **Tailwind CSS** con tokens de la marca
- **Framer Motion** (reveals, cursor, transiciones, scroll progress)
- **Supabase**: PostgreSQL, Auth y Storage
- **Vercel** para hosting

## Puesta en marcha

### 1. Instalar dependencias

```bash
npm install
npm run dev
```

El sitio funciona de inmediato con el contenido por defecto, incluso **sin** Supabase. El CMS y el formulario de contacto se activan al configurarlo.

### 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Abre **SQL Editor** y ejecuta completo el archivo `supabase/schema.sql` (crea tablas, políticas RLS y el bucket `media`).
3. En **Authentication → Users → Add user**, crea tu usuario de administrador (correo + contraseña). No hay registro público: solo ese usuario puede entrar al panel.
4. Copia `.env.example` a `.env.local` y llena:

```
NEXT_PUBLIC_SUPABASE_URL=       # Project Settings -> API -> Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Project Settings -> API -> anon public
NEXT_PUBLIC_SITE_URL=           # tu dominio final (para SEO/OG/sitemap)
```

5. Reinicia `npm run dev`.

### 3. Cargar tu contenido

Entra a `/admin`, inicia sesión y desde ahí puedes:

- **General**: descripción del hero, roles, subir tu fotografía y tu CV en PDF, frase del footer.
- **Sobre mí**: título y párrafos.
- **Skills**: grupos y tecnologías (aquí agregas Unreal Engine y C++ cuando toque).
- **Proyectos**: crear, editar, eliminar, subir imagen, marcar publicado y ordenar.
- **Redes**: GitHub, LinkedIn, Instagram y correo (los vacíos se ocultan del sitio).
- **Contacto**: título, texto y correo de la sección.
- **Mensajes**: lo que llega por el formulario.

El sitio usa ISR con revalidación de 60 segundos: los cambios del panel aparecen en el sitio público en máximo un minuto.

### 4. Deploy en Vercel

1. Sube el repo a GitHub e impórtalo en Vercel.
2. Agrega las tres variables de entorno del paso 2.
3. Deploy. Verifica `https://tudominio/sitemap.xml` y `robots.txt`.

## Detalles profesionales incluidos

- Insignia de disponibilidad en el hero (se activa/edita en **Admin → General**).
- Sección **Proceso — Cómo trabajo**, totalmente editable en **Admin → Proceso** (agregar, reordenar y eliminar pasos; la numeración se genera sola).
- Bloque de datos en Contacto: correo con botón de copiar, ubicación (editable en **Admin → Contacto**) y tiempo de respuesta.
- Página 404 personalizada, enlace "Saltar al contenido" (accesibilidad), sitemap, robots, Open Graph y datos estructurados Schema.org.

## Notas

- **CV**: si aún no subes uno desde el panel, el botón apunta a `/cv.pdf`; puedes colocar un `cv.pdf` dentro de `public/` como alternativa.
- **Fuentes**: Geist (paquete oficial) y Space Grotesk (Fontsource) se sirven desde el propio sitio — sin peticiones a Google Fonts, mejor para Lighthouse y privacidad.
- **Accesibilidad**: navegación por teclado, skip link, `focus-visible`, etiquetas semánticas y `prefers-reduced-motion` respetado en cursor, cuadrícula y animaciones.
- **Seguridad**: RLS activo en todas las tablas; el público solo lee contenido y proyectos publicados, y solo puede insertar mensajes. Todo lo demás requiere sesión.

## Estructura

```
src/
  app/            rutas (/, /admin, /admin/login), layout, SEO
  components/
    layout/       Navbar, Footer
    sections/     Hero, About, Skills, Projects, Social, Contact
    ui/           GridBackground, CustomCursor, ScrollProgress, Reveal…
    admin/        paneles del CMS
  lib/            supabase, contenido, defaults, hooks del panel
supabase/
  schema.sql      tablas + RLS + storage
```
