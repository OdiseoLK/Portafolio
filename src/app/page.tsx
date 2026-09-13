import GridBackground from '@/components/ui/GridBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TabGuardian from '@/components/ui/TabGuardian';
import CieloFX from '@/components/ui/CieloFX';
import RutaRail from '@/components/ui/RutaRail';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import Respaldo from '@/components/sections/Respaldo';
import ConsoleSignature from '@/components/ui/ConsoleSignature';
import SocialRail from '@/components/layout/SocialRail';
import CaseStudies from '@/components/sections/CaseStudies';
import ClientLogos from '@/components/sections/ClientLogos';
import FAQ from '@/components/sections/FAQ';
import MarqueeCasos from '@/components/sections/MarqueeCasos';
import Contact from '@/components/sections/Contact';
import Testimonials from '@/components/sections/Testimonials';
import { getContent } from '@/lib/content';
import { LangProvider } from '@/components/ui/LanguageContext';

// ISR: el contenido editado desde /admin se refleja en máximo 60 segundos.
export const revalidate = 60;

export default async function Home() {
  const content = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const publishedProjects = content.projects.filter((pr) => pr.published);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#organization`,
        name: 'ODISEO Studio',
        alternateName: 'Odiseo',
        url: siteUrl,
        description:
          'Estudio de diseño y desarrollo web en Orizaba, Veracruz. Sitios web a la medida, tiendas en línea y catálogos con pedidos por WhatsApp para negocios en México, Latinoamérica y Estados Unidos.',
        image: `${siteUrl}/og.png`,
        logo: `${siteUrl}/logo-head.webp`,
        priceRange: '$$',
        slogan: 'Guiamos expediciones digitales',
        knowsLanguage: ['es', 'en'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Orizaba',
          addressRegion: 'Veracruz',
          addressCountry: 'MX',
        },
        areaServed: [
          { '@type': 'City', name: 'Orizaba' },
          { '@type': 'State', name: 'Veracruz' },
          { '@type': 'Country', name: 'México' },
          { '@type': 'Country', name: 'Estados Unidos' },
          { '@type': 'Place', name: 'Latinoamérica' },
        ],
        serviceType: [
          'Diseño web',
          'Desarrollo web',
          'Tiendas en línea',
          'Catálogos con pedidos por WhatsApp',
          'Mantenimiento web',
        ],
        makesOffer: {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Diseño y desarrollo web con garantía de 1 año' },
          warranty: {
            '@type': 'WarrantyPromise',
            durationOfWarranty: { '@type': 'QuantitativeValue', value: 1, unitCode: 'ANN' },
          },
        },
        sameAs: [content.socials.linkedin, content.socials.instagram, 'https://share.google/ZQsfLlxwsYAbW9cdK'].filter(Boolean),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          url: content.contact.whatsappUrl,
          availableLanguage: ['Spanish', 'English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'ODISEO Studio',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: ['es-MX', 'en'],
      },
      {
        '@type': 'ItemList',
        name: 'Proyectos de ODISEO Studio',
        description: 'Sitios web en línea creados por ODISEO Studio para negocios reales.',
        numberOfItems: publishedProjects.length,
        itemListElement: publishedProjects.map((pr, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'WebSite',
            name: pr.title,
            description: pr.description,
            ...(pr.project_url ? { url: pr.project_url } : {}),
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { q: '¿Cuánto cuesta un sitio web?', a: 'Cada proyecto se cotiza a la medida. Definimos contigo el alcance y te damos un precio claro antes de empezar, sin sorpresas. Escríbenos por WhatsApp y lo cotizamos.' },
          { q: '¿Cuánto tarda?', a: 'Depende del tipo de sitio. Un one-page toma un par de semanas; una tienda con pedidos o un panel a la medida, un poco más. Marcamos un tiempo real desde el día uno.' },
          { q: '¿Necesito saber algo técnico?', a: 'Para nada. Lo entregamos listo y, cuando aplica, con un panel para que actualices precios y contenido por tu cuenta.' },
          { q: '¿Incluyen dominio y hosting?', a: 'Sí, te ayudamos a montar tu propio dominio (.com, .mx) y hosting. Tu sitio, tu nombre, tu control.' },
          { q: '¿Pueden rediseñar mi sitio actual?', a: 'Claro. Tomamos tu sitio existente y lo llevamos a su destino. Conservas lo que funciona y ganas lo que faltaba.' },
          { q: '¿Cómo empiezo?', a: 'Un mensaje por WhatsApp. Escuchamos tu idea, la cotizamos y arrancamos. Sin compromiso.' },
        ].map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <LangProvider>
      <GridBackground />
      <CustomCursor />
      <ScrollProgress />
      <TabGuardian />
      <CieloFX />
      <RutaRail />

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Saltar al contenido
      </a>

      <ConsoleSignature />
      <SocialRail socials={content.socials} />
      <Navbar cvUrl={content.hero.cvUrl} />

      <main>
        <Hero data={content.hero} whatsappUrl={content.contact.whatsappUrl} />
        <MarqueeCasos />
        <About data={content.about} />
        <Services data={content.services} />
        <Respaldo />
        <Process data={content.process} />
        <CaseStudies projects={content.projects} />
        <ClientLogos />
        <Testimonials items={content.testimonials} />
        <FAQ />
        <Contact data={content.contact} />
      </main>

      <Footer socials={content.socials} footer={content.footer} cvUrl={content.hero.cvUrl} />
      <WhatsAppFloat url={content.contact.whatsappUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </LangProvider>
  );
}
