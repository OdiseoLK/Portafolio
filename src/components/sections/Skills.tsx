'use client';

import { Code2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getTechIcon } from '@/lib/techIcons';
import type { SkillsContent } from '@/lib/types';

function TechTile({ name }: { name: string }) {
  const icon = getTechIcon(name);

  return (
    <li
      style={icon ? ({ '--brand': `#${icon.hex}` } as React.CSSProperties) : undefined}
      className="group flex w-16 flex-col items-center gap-2.5 transition-transform duration-300 hover:-translate-y-1"
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-8 w-8 fill-[var(--brand)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_var(--brand)]"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <Code2
          size={30}
          aria-hidden="true"
          className="text-accent transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(139,92,246,0.9)]"
        />
      )}
      <span className="text-center text-xs leading-tight text-muted transition-colors duration-300 group-hover:text-fg">
        {name}
      </span>
    </li>
  );
}

export default function Skills({ data }: { data: SkillsContent }) {
  return (
    <section id="skills" className="scroll-mt-24 py-28 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow="Skills" title="Tecnologías con las que trabajo" />

        <div className="border-y border-line">
          {data.groups.map((group, i) => (
            <Reveal key={group.name} delay={i * 0.06}>
              <div
                className={`grid gap-5 py-9 md:grid-cols-[220px,1fr] md:items-baseline ${
                  i > 0 ? 'border-t border-line' : ''
                }`}
              >
                <h3 className="eyebrow">{group.name}</h3>
                <ul className="flex flex-wrap gap-x-8 gap-y-7 md:gap-x-10">
                  {group.items.map((item) => (
                    <TechTile key={item} name={item} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
