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
      'Somos un estudio de diseño y desarrollo web. Creamos productos digitales con enfoque en la simplicidad, el rendimiento y la atención al detalle.',
    photoUrl: '',
    cvUrl: '',
    availability: {
      enabled: true,
      label: 'Disponible para nuevos proyectos',
    },
  },
  about: {
    title: 'El estudio',
    paragraphs: [
      'ODISEO es un estudio de diseño y desarrollo web.',
      'Creamos sitios y plataformas digitales para negocios que quieren destacar en línea: desde páginas corporativas hasta catálogos con pedidos y sistemas a la medida.',
      'Nos apasiona construir experiencias intuitivas, interfaces limpias y soluciones que combinan diseño, rendimiento y escalabilidad.',
      'Cada proyecto se trabaja de forma directa y cercana, con la calidad y el cuidado que tu marca merece.',
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
      { name: 'Herramientas', items: ['Git', 'Figma', 'Vercel', 'Visual Studio Code'] },
    ],
  },
  services: {
    title: 'Nuestras soluciones',
    items: [
      {
        title: 'Diseño web a la medida',
        text: 'Sitios totalmente personalizados que se ajustan a las necesidades reales de tu negocio. Desde páginas corporativas hasta landings con funcionalidades únicas, con gran rendimiento y cuidado en cada detalle.',
      },
      {
        title: 'Catálogos y pedidos en línea',
        text: 'Catálogos de productos con precios reales y pedidos directos vía WhatsApp Business. Navegación intuitiva, carga rápida y una experiencia que convierte visitas en clientes.',
      },
      {
        title: 'Desarrollo full stack',
        text: 'Del diseño visual al desarrollo funcional: paneles auto-administrables, bases de datos y plataformas a la medida con Next.js y Supabase, para que tu equipo gestione el sitio sin depender de nadie.',
      },
      {
        title: 'Mantenimiento y soporte',
        text: 'No desaparecemos después de la entrega. Actualizaciones de contenido, monitoreo, seguridad y soporte técnico para que tu sitio esté siempre al día y en línea.',
      },
    ],
  },
  process: {
    title: 'Cómo trabajamos',
    steps: [
      {
        title: 'Descubrimiento',
        text: 'Entendemos el objetivo, el público y el contexto del proyecto antes de escribir una sola línea de código.',
      },
      {
        title: 'Diseño',
        text: 'Definimos la estructura, la jerarquía visual y los detalles de interacción con un enfoque minimalista e intencional.',
      },
      {
        title: 'Desarrollo',
        text: 'Construimos con tecnologías modernas, priorizando el rendimiento, la accesibilidad y un código limpio y mantenible.',
      },
      {
        title: 'Lanzamiento',
        text: 'Desplegamos, medimos y refinamos. Un producto no termina al publicarse: evoluciona con datos y retroalimentación real.',
      },
    ],
  },
  socials: {
    github: '',
    linkedin: '',
    instagram: 'https://www.instagram.com/odiseo.dev/',
    email: 'Developerlk23@gmail.com',
  },
  contact: {
    title: 'Trabajemos juntos.',
    text: 'Si tienes una idea o un proyecto en mente, estaremos encantados de hablar contigo.',
    email: 'Developerlk23@gmail.com',
    whatsappUrl: 'https://wa.me/message/HSPNSWYWNGWBN1',
    location: '',
  },
  footer: {
    tagline: 'Productos digitales construidos con simplicidad, rendimiento y atención al detalle.',
  },
  projects: [
    {
      id: 'caso-decora',
      title: 'Decora',
      description:
        'Showroom de interiorismo en Orizaba. Sitio one-page con galería de seis proyectos reales (Mom Fit Studio, Hotel Calle 8, hospitales y residenciales), hero con fotografía propia y videos del showroom. En producción y en iteración continua con el cliente.',
      tags: ['Interiorismo · Showroom', 'One-page', 'Galería real', 'Video', 'Hostinger'],
      image_url: '/casos/decora-caso.webp',
      project_url: 'https://decorashowroom.com',
      repo_url: null,
      published: true,
      sort_order: 1,
      created_at: '',
    },
    {
      id: 'caso-zurita',
      title: 'Fundación Hernández Zurita',
      description:
        'Fundación oftalmológica con presencia en el centro y sur de México. Sitio institucional con carrusel de promociones, video y directorio de sedes; en mantenimiento activo con rondas de cambios directas con el cliente.',
      tags: ['Salud visual · Institucional', 'One-page', 'Promociones', 'Mantenimiento'],
      image_url: '/casos/zurita-caso.webp',
      project_url: 'https://fundacionzurita.com.mx',
      repo_url: null,
      published: true,
      sort_order: 2,
      created_at: '',
    },
    {
      id: 'caso-alvarez',
      title: 'Café Álvarez',
      description:
        'Cafetería con cuatro sucursales. Menú interactivo por secciones: el cliente elige categoría, arma su platillo con las reglas de la casa y el pedido llega con folio al WhatsApp de su sucursal. 15 secciones, 112 productos y panel propio para actualizar precios.',
      tags: ['Cafetería · Menú interactivo', 'Pedidos por WhatsApp', 'Folio por sucursal', 'Panel de precios'],
      image_url: '/casos/cafe-alvarez-caso.webp',
      project_url: 'https://alvarez.cafe',
      repo_url: null,
      published: true,
      sort_order: 3,
      created_at: '',
    },
    {
      id: 'caso-puerta-grande',
      title: 'Hospital Puerta Grande',
      description:
        'Hospital de la Fundación Hernández Zurita en Orizaba, con urgencias 24 horas. Su nueva cara digital: servicios, quirófano, habitaciones y membresías T-Médica, con fotografía real de sus áreas y agenda por WhatsApp.',
      tags: ['Hospital · Urgencias 24h', 'Servicios', 'T-Médica'],
      image_url: '/casos/puerta-grande-caso.webp',
      project_url: 'https://hospitalpuertagrande.com.mx',
      repo_url: null,
      published: true,
      sort_order: 4,
      created_at: '',
    },
    {
      id: 'caso-ayf',
      title: 'A&F Asociados Abogados',
      description:
        'Despacho jurídico en el centro de Orizaba, a cargo de la Lic. Alba L. Montiel y el Lic. Félix Vargas. Litigio y asesoría civil, penal, laboral, agraria, mercantil y de amparo, más servicios previsionales. Sitio sobrio con consulta directa por WhatsApp.',
      tags: ['Despacho jurídico', 'Áreas de práctica', 'Previsional', 'WhatsApp'],
      image_url: '/casos/ayf-caso.webp',
      project_url: 'https://ayfabogados.com.mx',
      repo_url: null,
      published: true,
      sort_order: 5,
      created_at: '',
    },
    {
      id: 'caso-aborigen',
      title: 'Aborigen Cocina de Brasa',
      description:
        'Restaurante de parrilla y ahumados frente al centro de Orizaba. Sitio con fotografía nocturna del local, galería de platillos y carta digital bilingüe (español e inglés) para el turismo del Pueblo Mágico.',
      tags: ['Cocina de brasa', 'Carta bilingüe', 'Galería', 'Turismo'],
      image_url: '/casos/aborigen-caso.webp',
      project_url: 'https://aborigenorizaba.com',
      repo_url: null,
      published: true,
      sort_order: 6,
      created_at: '',
    },
    {
      id: 'caso-cielo-canela',
      title: 'Cielo Canela',
      description:
        'Bistró y boulangerie en Orizaba: repostería, panadería artesanal y cocina de bistró. Sitio cálido con menú y pedidos directos, pensado para antojar desde el primer scroll.',
      tags: ['Bistró · Boulangerie', 'Menú digital', 'Pedidos'],
      image_url: '/casos/cielo-canela-caso.webp',
      project_url: 'https://cielocanela.com',
      repo_url: null,
      published: true,
      sort_order: 7,
      created_at: '',
    },
  ],
  testimonials: [
    {
      id: 'seed-fdhz',
      name: 'Fundación Doctor Hernández Zurita',
      role: 'Equipo de Comunicación y Marketing',
      avatar_url: null,
      quote:
        'Trabajar con Alexis en el diseño web del Hospital Puerta Grande y de la Fundación Doctor Hernández Zurita ha sido una muy buena experiencia. Destaco su disposición para escuchar nuestras ideas, aportar propuestas y encontrar soluciones que reflejen la identidad de cada institución. La comunicación es cercana y siempre hay apertura para revisar detalles y realizar ajustes. Como parte del equipo de Comunicación y Marketing, valoro mucho contar con alguien que se involucra en los proyectos y nos ayuda a darles forma. Sin duda, recomiendo su trabajo por su profesionalismo, creatividad y compromiso.',
      approved: true,
      sort_order: 1,
      created_at: '',
    },
  ],

};
