import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

/**
 * Encabezado de sección: etiqueta técnica en mono + línea de referencia,
 * seguida del título en Space Grotesk.
 */
export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-5">
        <span className="eyebrow flex items-center gap-2.5 !text-lima">
          <span aria-hidden="true" className="font-mono text-accent">
            {'//'}
          </span>
          {eyebrow}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      <h2 className="font-display text-4xl font-light tracking-[-0.02em] text-fg md:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}
