import {
  siBootstrap,
  siCplusplus,
  siCss,
  siDocker,
  siFigma,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSass,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUnity,
  siUnrealengine,
  siVercel,
  siVite,
  siWordpress,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Resolutor de iconos de tecnología. Mapea el nombre que escribas en el CMS
 * (ej. "HTML", "Next.js", "Tailwind CSS") a su icono oficial de simple-icons.
 * Si una tecnología no tiene icono (ej. VS Code, C#), la chip se muestra
 * igual con un glifo genérico de código.
 */
const ICONS: Record<string, SimpleIcon> = {
  html: siHtml5,
  html5: siHtml5,
  css: siCss,
  css3: siCss,
  javascript: siJavascript,
  js: siJavascript,
  typescript: siTypescript,
  ts: siTypescript,
  react: siReact,
  nextjs: siNextdotjs,
  next: siNextdotjs,
  tailwindcss: siTailwindcss,
  tailwind: siTailwindcss,
  nodejs: siNodedotjs,
  node: siNodedotjs,
  supabase: siSupabase,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  git: siGit,
  github: siGithub,
  figma: siFigma,
  python: siPython,
  cpp: siCplusplus,
  cplusplus: siCplusplus,
  unrealengine: siUnrealengine,
  unreal: siUnrealengine,
  unity: siUnity,
  vercel: siVercel,
  vite: siVite,
  sass: siSass,
  scss: siSass,
  bootstrap: siBootstrap,
  docker: siDocker,
  php: siPhp,
  wordpress: siWordpress,
};

function normalize(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function getTechIcon(name: string): SimpleIcon | null {
  return ICONS[normalize(name)] ?? null;
}
