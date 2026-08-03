import type { SiteContent } from './types';

/**
 * Contenido por defecto del sitio.
 * Se usa como fallback cuando Supabase no está configurado o una clave
 * todavía no existe en la tabla `site_content`. Todo esto es editable
 * desde /admin sin tocar código.
 */
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    roles: ['Código', 'Diseño', 'Experiencias'],
    description:
      'Desarrollo productos digitales con un enfoque en la simplicidad, el rendimiento y la atención al detalle.',
    photoUrl: '',
    cvUrl: '',
    availability: {
      enabled: true,
      label: 'Disponible para nuevos proyectos',
    },
  },
  about: {
    title: 'Detrás de ODISEO',
    paragraphs: [
      'Hola, soy Alexis.',
      'Soy desarrollador web y el creador de ODISEO, una marca personal enfocada en el desarrollo de productos digitales modernos.',
      'Me apasiona construir experiencias intuitivas, interfaces limpias y soluciones que combinen diseño, rendimiento y escalabilidad.',
      'Actualmente continúo ampliando mis conocimientos en desarrollo de videojuegos y busco crear productos que las personas realmente disfruten utilizar.',
    ],
  },
  skills: {
    groups: [
      {
        name: 'Frontend',
        items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
      },
      { name: 'Backend', items: ['Node.js', 'Supabase'] },
      { name: 'Bases de datos', items: ['PostgreSQL'] },
      { name: 'Herramientas', items: ['Git', 'GitHub', 'Figma', 'Visual Studio Code'] },
    ],
  },
  process: {
    title: 'Cómo trabajo',
    steps: [
      {
        title: 'Descubrimiento',
        text: 'Entiendo el objetivo, el público y el contexto del proyecto antes de escribir una sola línea de código.',
      },
      {
        title: 'Diseño',
        text: 'Defino la estructura, la jerarquía visual y los detalles de interacción con un enfoque minimalista e intencional.',
      },
      {
        title: 'Desarrollo',
        text: 'Construyo con tecnologías modernas, priorizando el rendimiento, la accesibilidad y un código limpio y mantenible.',
      },
      {
        title: 'Lanzamiento',
        text: 'Despliego, mido y refino. Un producto no termina al publicarse: evoluciona con datos y retroalimentación real.',
      },
    ],
  },
  socials: {
    github: 'https://github.com/OdiseoLK',
    linkedin: '',
    instagram: '',
    email: 'Developerlk23@gmail.com',
  },
  contact: {
    title: 'Trabajemos juntos.',
    text: 'Si tienes una idea, una oportunidad o simplemente quieres conversar sobre tecnología, estaré encantado de hablar contigo.',
    email: 'Developerlk23@gmail.com',
    location: 'Orizaba, Veracruz — México',
  },
  footer: {
    tagline: 'Productos digitales construidos con simplicidad, rendimiento y atención al detalle.',
  },
  projects: [
    {
      id: 'seed-decora',
      title: 'Decora',
      description:
        'Sitio editorial para showroom de diseño de interiores en Orizaba: galería con fotografía real, slider antes/después e integración de video. Desplegado en Hostinger.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image_url: null,
      project_url: null,
      repo_url: null,
      published: true,
      sort_order: 1,
      created_at: '',
    },
    {
      id: 'seed-zurita',
      title: 'Fundación Hernández Zurita · Hospital Puerta Grande',
      description:
        'Sitio institucional para fundación oftalmológica: fotografía real, videos de YouTube integrados y directorio de 16 sedes en el centro y sur de México.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image_url: null,
      project_url: null,
      repo_url: null,
      published: true,
      sort_order: 2,
      created_at: '',
    },
    {
      id: 'seed-flores',
      title: 'Panadería Flores',
      description:
        'Rediseño completo para panadería tradicional: catálogo de 188 productos con precios reales, ilustraciones SVG hechas a mano y pedidos directos vía WhatsApp Business.',
      tags: ['HTML', 'CSS', 'JavaScript', 'SVG'],
      image_url: null,
      project_url: null,
      repo_url: null,
      published: true,
      sort_order: 3,
      created_at: '',
    },
    {
      id: 'seed-tirado',
      title: 'Inmobiliaria Tirado',
      description:
        'Sitio inmobiliario con catálogo de propiedades y panel de administración con CRUD completo, endurecido en varias rondas de auditoría de seguridad (hash de contraseñas PBKDF2-SHA256).',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image_url: null,
      project_url: null,
      repo_url: null,
      published: true,
      sort_order: 4,
      created_at: '',
    },
  ],
  testimonials: [
    {
      id: 'seed-t1',
      name: 'Nombre del cliente',
      role: 'Puesto — Empresa',
      avatar_url: null,
      quote:
        'Alexis entendió exactamente lo que necesitábamos y lo llevó más allá. El resultado fue un sitio rápido, cuidado y fácil de administrar. Volvería a trabajar con él sin dudarlo.',
      approved: true,
      sort_order: 1,
      created_at: '',
    },
    {
      id: 'seed-t2',
      name: 'Nombre del cliente',
      role: 'Puesto — Empresa',
      avatar_url: null,
      quote:
        'Profesional, puntual y con muy buen ojo para el detalle. Nos explicó cada decisión y el acompañamiento después de la entrega marcó la diferencia.',
      approved: true,
      sort_order: 2,
      created_at: '',
    },
    {
      id: 'seed-t3',
      name: 'Nombre del cliente',
      role: 'Puesto — Empresa',
      avatar_url: null,
      quote:
        'Transformó por completo nuestra presencia en línea. La calidad del trabajo habla por sí sola y el proceso fue claro de principio a fin.',
      approved: true,
      sort_order: 3,
      created_at: '',
    },
  ],
};
