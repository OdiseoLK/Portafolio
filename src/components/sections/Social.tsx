import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { prettyUrl } from '@/lib/content';
import type { SocialsContent } from '@/lib/types';

interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: React.ReactNode;
}

export function buildSocialLinks(socials: SocialsContent): SocialLink[] {
  // ODISEO es un estudio: el perfil personal de GitHub queda fuera de la marca.
  const isGithub = (v: string) => /github/i.test(v);
  const links: SocialLink[] = [];
  if (socials.github) {
    links.push({
      label: 'GitHub',
      href: socials.github,
      handle: prettyUrl(socials.github),
      icon: <Github size={19} aria-hidden="true" />,
    });
  }
  if (socials.linkedin) {
    links.push({
      label: 'LinkedIn',
      href: socials.linkedin,
      handle: prettyUrl(socials.linkedin),
      icon: <Linkedin size={19} aria-hidden="true" />,
    });
  }
  if (socials.instagram) {
    links.push({
      label: 'Instagram',
      href: socials.instagram,
      handle: prettyUrl(socials.instagram),
      icon: <Instagram size={19} aria-hidden="true" />,
    });
  }
  if (socials.email) {
    links.push({
      label: 'Correo',
      href: `mailto:${socials.email}`,
      handle: socials.email,
      icon: <Mail size={19} aria-hidden="true" />,
    });
  }
  return links.filter((l) => !isGithub(l.label) && !isGithub(l.href));
}

export default function Social({ socials }: { socials: SocialsContent }) {
  const links = buildSocialLinks(socials);
  if (links.length === 0) return null;

  return (
    <section id="redes" className="scroll-mt-24 pb-28 md:pb-36">
      <div className="wrap">
        <Reveal>
          <div className="mb-10 flex items-center gap-5">
            <span className="eyebrow flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-block h-1 w-1 bg-accent" />
              Redes
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.06} className="bg-bg">
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-300 hover:bg-card"
              >
                <div className="flex items-start justify-between">
                  <span className="text-muted transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:text-accent">
                    {link.icon}
                  </span>
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="text-muted/50 transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-fg">{link.label}</p>
                  <p className="mt-1 truncate font-mono text-[11px] text-muted">{link.handle}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
