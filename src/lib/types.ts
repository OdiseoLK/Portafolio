export interface HeroContent {
  roles: string[];
  description: string;
  photoUrl: string;
  cvUrl: string;
  /** Estado de disponibilidad mostrado en el hero (editable desde /admin). */
  availability: {
    enabled: boolean;
    label: string;
  };
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SkillsContent {
  groups: SkillGroup[];
}

export interface ServiceItem {
  title: string;
  text: string;
}

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface ProcessContent {
  title: string;
  steps: ProcessStep[];
}

export interface SocialsContent {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export interface ContactContent {
  title: string;
  text: string;
  email: string;
  whatsappUrl: string;
  /** Ubicación mostrada junto al formulario, ej. "Orizaba, México". */
  location: string;
}

export interface FooterContent {
  tagline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  avatar_url: string | null;
  quote: string;
  approved: boolean;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  tags: string[] | null;
  image_url: string | null;
  project_url: string | null;
  repo_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  services: ServicesContent;
  process: ProcessContent;
  socials: SocialsContent;
  contact: ContactContent;
  footer: FooterContent;
  projects: Project[];
  testimonials: Testimonial[];
}
