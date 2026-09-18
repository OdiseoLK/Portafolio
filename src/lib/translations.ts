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
      { label: 'Support', href: '#respaldo' },
      { label: 'Work', href: '#casos' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contacto' },
    ],
  },
  hero: {
    eyebrow: 'Web design & development studio',
    hookA: 'Websites',
    hookB: 'that grow',
    hookC: 'your business.',
    sub: 'We design and build fast, custom websites that turn visitors into customers. From idea to launch — and we stay after.',
    availability: 'Available for new projects',
    cta: 'Start on WhatsApp',
    cta2: 'See our work',
    scroll: 'Scroll ↓',
  },
  marquee: {
    eyebrow: 'Completed expeditions',
    live: 'Destination reached',
    giros: {
      'Interiorismo · Showroom': 'Interior design · Showroom',
      'Salud visual · Institucional': 'Eye care · Institutional',
      'Cafetería · Menú interactivo': 'Coffee shop · Interactive menu',
      'Hospital · Urgencias 24h': 'Hospital · 24h ER',
      'Despacho jurídico': 'Law firm',
      'Cocina de brasa': 'Grill & smokehouse',
      'Bistró · Boulangerie': 'Bistro · Boulangerie',
    } as Record<string, string>,
  },
  about: {
    title: 'The studio',
    paragraph:
      "We don't make web pages: we guide expeditions. We take your business at its starting point and lead it to its digital destination — a fast, custom-built site of your own, working for you around the clock. Design, development and a guide who stays: we don't let go of your hand after arrival.",
    stats: [
      { n: '07', l: 'Expeditions completed' },
      { n: '07', l: 'Destinations live' },
      { n: '00', l: 'Shipwrecks' },
    ],
    ornament: 'logbook · exp. 001–007',
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
    title: 'The journey',
    eyebrow: 'From basecamp to destination',
    steps: [
      { title: 'Discovery', text: 'We understand the goal, the audience and the context of the project before writing a single line of code.' },
      { title: 'Design', text: 'We define structure, visual hierarchy and interaction details with a minimal, intentional approach.' },
      { title: 'Development', text: 'We build with modern technologies, prioritizing performance, accessibility and clean, maintainable code.' },
      { title: 'Launch', text: "We deploy, measure and refine. A product doesn't end at launch: it evolves with data and real feedback." },
    ],
  },
  serviceTags: ['cartography', 'provisions', 'route engineering', 'the guide stays'],
  serviceIncludes: [
    ['Custom UX/UI design, no templates', 'Responsive: mobile, tablet & desktop', 'Base SEO and optimized speed'],
    ['Cart and orders via WhatsApp', 'Panel to update prices', 'Ticket with order ID per branch'],
    ['Next.js + Supabase', 'Your own admin panel', 'Database and forms'],
    ['Content updates', 'Monitoring and security', 'Support via WhatsApp'],
  ],
  servicesIntro: 'Four ways to take your business to its digital destination. Everything custom, everything with a guide.',
  includes: 'Includes',
  quote: 'Get a quote',
  cases: {
    title: 'Logbook',
    sub: 'Every case is a completed expedition: real businesses we guided from idea to their destination online.',
    visit: 'Visit destination',
    stamp: 'Destination reached',
    exp: 'Exp.',
    cta: 'Is your business the next expedition?',
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
        cat: 'Coffee shop · Interactive menu',
        d: 'Coffee shop with four branches. Interactive menu by sections: customers pick a category, build their order with the house rules, and it lands with an order ID in their branch\'s WhatsApp. 15 sections, 112 products and an admin panel for prices.',
        tags: ['WhatsApp orders', 'Order ID per branch', 'Price panel'],
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
  respaldo: {
    title: 'Your safety net, after arrival',
    items: [
      { Icon: 'ShieldCheck', title: '1-year warranty', text: 'Any error on our side — a broken link, a failing section or any technical glitch — we fix it at no extra cost.' },
      { Icon: 'CalendarHeart', title: 'One month of support, free', text: 'The first month you get direct access to us for any change, tweak or question. Your month to explore the site, test it and refine what you want.' },
      { Icon: 'Clock', title: '24/7 attention', text: 'We are available anytime. If something looks off or you have a question, message us whenever.' },
      { Icon: 'Wrench', title: 'Affordable maintenance', text: 'From the second month, changes and updates have an accessible cost based on the type of adjustment. We gladly share the details.' },
    ],
  },
  faq: {
    eyebrow: 'Frequent questions',
    title: 'Everything clear before we start',
    items: [
      { q: 'How much does a website cost?', a: 'Each project is quoted to fit. We define scope with you and give you a clear price before starting — no surprises. Write to us on WhatsApp and we\'ll quote it.' },
      { q: 'How long does it take?', a: 'It depends on the type of site. A one-page site takes a couple of weeks; a store with orders or a custom panel, a bit more. We set a real timeline from day one.' },
      { q: 'Do I have to know anything technical?', a: 'Not at all. We hand it over ready and, when it applies, with an admin panel so you update prices and content on your own. And the guide stays after launch.' },
      { q: 'Do you include domain and hosting?', a: 'Yes, we help you set up your own domain (.com, .mx) and hosting. Your site, your name, your control.' },
      { q: 'Can you redesign my current site?', a: 'Of course. We take your existing site and lift it to its destination — like we did with Puerta Grande. You keep what works and gain what was missing.' },
      { q: 'How do I start?', a: 'One message on WhatsApp. We listen to your idea, quote it and start the expedition. No commitment.' },
    ],
  },
  testimonials: {
    title: 'What clients say',
    eyebrow: 'Signals from the field',
    signal: 'Signal',
    corner: 'radio · signals',
    byId: {
      'seed-fdhz': {
        role: 'Communication & Marketing Team',
        quote:
          "Working with Alexis on the web design for Hospital Puerta Grande and the Doctor Hernández Zurita Foundation has been a great experience. I'd highlight his willingness to listen to our ideas, contribute proposals and find solutions that reflect each institution's identity. Communication is close and there's always openness to review details and make adjustments. As part of the Communication and Marketing team, I really value having someone who gets involved in the projects and helps us shape them. I definitely recommend his work for his professionalism, creativity and commitment.",
      },
    } as Record<string, { role: string; quote: string }>,
  },
  emphasis: { services: 'Services', faq: 'FAQ' },
  contact: {
    title: 'Where do you want to go?',
    lede: "Tell us your business's starting point and we'll tell you how we get there.",
    email: 'Email',
    response: 'Response',
    responseTime: 'Usually within 24–48 h',
    whatsapp: 'Direct radio to the guide. → Message us directly',
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
      { label: 'Support', href: '#respaldo' },
      { label: 'Work', href: '#casos' },
      { label: 'Reviews', href: '#opiniones' },
      { label: 'Contact', href: '#contacto' },
    ],
    rights: 'End of logbook · All rights reserved.',
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
