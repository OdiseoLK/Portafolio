import GridBackground from '@/components/ui/GridBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import ConsoleSignature from '@/components/ui/ConsoleSignature';
import SocialRail from '@/components/layout/SocialRail';
import CaseStudies from '@/components/sections/CaseStudies';
import MarqueeCasos from '@/components/sections/MarqueeCasos';
import Contact from '@/components/sections/Contact';
import { getContent } from '@/lib/content';
import { LangProvider } from '@/components/ui/LanguageContext';

// ISR: el contenido editado desde /admin se refleja en máximo 60 segundos.
export const revalidate = 60;

export default async function Home() {
  const content = await getContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alexis',
    alternateName: 'ODISEO',
    url: siteUrl,
    jobTitle: 'Web Developer & UI Designer',
    description: content.hero.description,
    sameAs: [content.socials.linkedin, content.socials.instagram].filter(
      Boolean,
    ),
  };

  return (
    <LangProvider>
      <GridBackground />
      <CustomCursor />
      <ScrollProgress />

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
        <Hero data={content.hero} />
        <MarqueeCasos />
        <About data={content.about} />
        <Services data={content.services} />
        <Process data={content.process} />
        <CaseStudies projects={content.projects} />
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
