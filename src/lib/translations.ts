/**
 * Traducciones EN del sitio. El español vive en Supabase/defaults;
 * el inglés se resuelve aquí. Si una llave no existe, se usa el español.
 * Los casos se traducen por título normalizado (matchCase).
 */

export const EN = {
  nav: {
    links: [
      { label: 'Home', href: '#inicio' },
      { label: 'The studio', href: '#estudio' },
      { label: 'Services', href: '#servicios' },
      { label: 'Work', href: '#casos' },
      { label: 'Contact', href: '#contacto' },
    ],
  },
  hero: {
    eyebrow: 'Web design & development studio',
    description:
      'We are a web design and development studio. We build digital products with a focus on simplicity, performance and attention to detail.',
    availability: 'Available for new projects',
    cta: 'View case studies',
    scroll: 'Scroll ↓',
  },
  marquee: {
    eyebrow: 'Real work, real businesses',
    live: 'Live',
    giros: {
      'Interiorismo · Showroom': 'Interior design · Showroom',
      'Salud visual · Institucional': 'Eye care · Institutional',
      'Cafetería · Pedidos en línea': 'Coffee shop · Online orders',
      'Hospital · Urgencias 24h': 'Hospital · 24h ER',
      'Despacho jurídico': 'Law firm',
      'Cocina de brasa': 'Grill & smokehouse',
      'Bistró · Boulangerie': 'Bistro · Boulangerie',
    } as Record<string, string>,
  },
  about: {
    title: 'The studio',
    paragraph:
      'ODISEO is a web design and development studio. We build websites and digital platforms for businesses that want to stand out online: from corporate pages to catalogs with online ordering and custom systems. We are passionate about intuitive experiences, clean interfaces and solutions that combine design, performance and scalability.',
    stats: [
      { n: '07', l: 'Sites live' },
      { n: '07', l: 'Businesses served' },
      { n: '100%', l: 'Custom built' },
    ],
    ornament: 'lat. living studio',
  },
  services: {
    title: 'Our solutions',
    items: [
      {
        title: 'Custom web design',
        text: 'Fully custom websites tailored to what your business actually needs. From corporate pages to landings with unique features, with great performance and care in every detail.',
      },
      {
        title: 'Catalogs & online orders',
        text: 'Product catalogs with real prices and direct ordering via WhatsApp Business. Intuitive navigation, fast loading and an experience that turns visits into customers.',
      },
      {
        title: 'Full-stack development',
        text: 'From visual design to working software: self-managed admin panels, databases and custom platforms built with Next.js and Supabase, so your team can run the site on their own.',
      },
      {
        title: 'Maintenance & support',
        text: "We don't disappear after launch. Content updates, monitoring, security and technical support to keep your site up to date and online.",
      },
    ],
  },
  process: {
    title: 'How we work',
    eyebrow: 'From idea to launch',
    steps: [
      { title: 'Discovery', text: 'We understand the goal, the audience and the context of the project before writing a single line of code.' },
      { title: 'Design', text: 'We define structure, visual hierarchy and interaction details with a minimal, intentional approach.' },
      { title: 'Development', text: 'We build with modern technologies, prioritizing performance, accessibility and clean, maintainable code.' },
      { title: 'Launch', text: "We deploy, measure and refine. A product doesn't end at launch: it evolves with data and real feedback." },
    ],
  },
  cases: {
    title: 'Work',
    sub: "Sites in production for real businesses: every project was designed from the client's world, not from a template.",
    visit: 'Visit site',
    cta: 'Is your business the next case study?',
    aria: 'Scope & technology',
    byTitle: {
      decora: {
        cat: 'Interior design · Showroom',
        d: 'Interior design showroom in Orizaba. One-page site with a gallery of six real projects (Mom Fit Studio, Hotel Calle 8, hospitals and residential work), a hero with original photography and showroom videos. In production and in continuous iteration with the client.',
        tags: ['One-page', 'Real gallery', 'Video', 'Hostinger'],
      },
      zurita: {
        cat: 'Eye care · Institutional',
        d: 'Ophthalmology foundation with locations across central and southern Mexico. Institutional site with a promotions carousel, video and branch directory; under active maintenance with direct change rounds with the client.',
        tags: ['One-page', 'Promotions', 'Maintenance'],
      },
      alvarez: {
        cat: 'Coffee shop · Online orders',
        d: 'Coffee shop with four branches in Orizaba. Site with a real menu, cart and WhatsApp ordering system: branch selection, ticket with a unique order ID and a price admin panel. Delivered with training so the team runs it on their own.',
        tags: ['Cart', 'WhatsApp Business', 'Price panel'],
      },
      puerta: {
        cat: 'Hospital · 24h ER',
        d: "Hospital of the Hernández Zurita Foundation in Orizaba, with a 24-hour ER. Its new digital face: services, operating room, patient rooms and T-Médica memberships, with real photography of its facilities and WhatsApp scheduling.",
        tags: ['Services', 'T-Médica'],
      },
      ayf: {
        cat: 'Law firm',
        d: 'Law firm in downtown Orizaba, led by Alba L. Montiel and Félix Vargas. Litigation and counsel in civil, criminal, labor, agrarian, commercial and amparo matters, plus pension services. A sober site with direct WhatsApp consultation.',
        tags: ['Practice areas', 'Pension services', 'WhatsApp'],
      },
      aborigen: {
        cat: 'Grill & smokehouse',
        d: "Grill and smokehouse restaurant facing downtown Orizaba. Site with night photography of the venue, a dish gallery and a bilingual digital menu (Spanish and English) for the Pueblo Mágico's tourism.",
        tags: ['Bilingual menu', 'Gallery', 'Tourism'],
      },
      cielo: {
        cat: 'Bistro · Boulangerie',
        d: 'Bistro and boulangerie in Orizaba: pastry, artisan bread and bistro cooking. A warm site with a digital menu and direct orders, designed to make you hungry from the first scroll.',
        tags: ['Digital menu', 'Orders'],
      },
    } as Record<string, { cat: string; d: string; tags: string[] }>,
  },
  contact: {
    title: "Let's work together.",
    lede: "If you have an idea or a project in mind, we'd love to hear from you.",
    email: 'Email',
    response: 'Response',
    responseTime: 'Usually within 24–48 h',
    whatsapp: 'Prefer WhatsApp? It’s the fast lane. → Message us directly',
    name: 'Name',
    namePh: 'Your name',
    emailPh: 'you@email.com',
    message: 'Message',
    messagePh: 'Tell us about your idea…',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Message sent. Talk soon!',
    error: 'Something went wrong. Please try again or write to us on WhatsApp.',
  },
  footer: {
    links: [
      { label: 'The studio', href: '#estudio' },
      { label: 'Services', href: '#servicios' },
      { label: 'Work', href: '#casos' },
      { label: 'Contact', href: '#contacto' },
    ],
    rights: 'All rights reserved.',
  },
};

/** Empata un título de proyecto (de Supabase) con su traducción. */
export function matchCase(title: string) {
  const t = title.toLowerCase();
  if (t.includes('decora')) return EN.cases.byTitle.decora;
  if (t.includes('zurita') && !t.includes('puerta')) return EN.cases.byTitle.zurita;
  if (t.includes('álvarez') || t.includes('alvarez')) return EN.cases.byTitle.alvarez;
  if (t.includes('puerta')) return EN.cases.byTitle.puerta;
  if (t.includes('a&f') || t.includes('abogado')) return EN.cases.byTitle.ayf;
  if (t.includes('aborigen')) return EN.cases.byTitle.aborigen;
  if (t.includes('cielo')) return EN.cases.byTitle.cielo;
  return null;
}
