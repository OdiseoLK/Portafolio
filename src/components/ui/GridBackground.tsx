'use client';

/** Nube volumétrica de dos tonos con base plana. */
function Nube({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 150 64" className={className} style={style} aria-hidden="true">
      <path
        d="M12 58 Q6 58 6 48 Q6 38 18 36 Q20 20 38 20 Q46 6 64 10 Q80 2 94 12 Q112 8 118 24 Q140 24 142 40 Q144 54 128 58 Z"
        fill="#BBD6EE"
      />
      <path
        d="M12 54 Q6 54 6 45 Q6 36 18 34 Q20 18 38 18 Q46 5 64 9 Q80 1 94 11 Q110 7 116 22 Q136 22 139 37 Q141 50 126 54 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * El cielo manda: fondo fijo de toda la página según el modo.
 * - noche: negro con viñeta suave (las estrellas viven en el hero + nieve global)
 * - tarde: degradado de anochecer con el sol poniéndose en el horizonte
 * - día:   azul cielo con sol radiante (rayos girando) y nubes volumétricas a la deriva
 */
export default function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Cielo del modo activo */}
      <div className="absolute inset-0 transition-[background] duration-700" style={{ background: 'var(--sky)' }} />

      {/* Retícula de mapa finísima */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--fg) / 0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ===== TARDE · anochecer ===== */}
      <div className="sky-el el-tarde absolute inset-0">
        {/* Sol poniéndose */}
        <div
          className="absolute left-[58%] top-[72%] h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, #FFE9B8 0%, #FFBE5C 22%, rgba(255,138,61,0.5) 55%, transparent 75%)',
            animation: 'sol-late 6s ease-in-out infinite',
          }}
        />
        <div className="absolute left-[58%] top-[72%] h-[13vmin] w-[13vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE2A6]" />
        {/* Horizonte */}
        <div className="absolute inset-x-0 bottom-0 h-[22vh]" style={{ background: 'linear-gradient(180deg, transparent, rgba(24,10,6,0.6))' }} />
        {/* Brumas encendidas cruzando */}
        <div className="absolute left-0 top-[26%] h-6 w-[36vw] rounded-full opacity-40 blur-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #FFB070, transparent)', animation: 'bruma-t 90s linear infinite' }} />
        <div className="absolute left-0 top-[44%] h-4 w-[28vw] rounded-full opacity-30 blur-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #FF9A55, transparent)', animation: 'bruma-t 120s linear infinite', animationDelay: '-40s' }} />
      </div>

      {/* ===== DÍA · azul cielo ===== */}
      <div className="sky-el el-dia absolute inset-0">
        {/* Sol radiante con rayos girando lento */}
        <div className="absolute left-[16%] top-[14%] h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, #FFF9E3 0%, #FFEDB0 26%, rgba(255,240,190,0.4) 60%, transparent 78%)' }} />
          <svg viewBox="0 0 200 200" className="absolute inset-[12%]" style={{ animation: 'rayos-gira 80s linear infinite' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="100" y1="100"
                x2={100 + 92 * Math.cos((i * Math.PI) / 6)}
                y2={100 + 92 * Math.sin((i * Math.PI) / 6)}
                stroke="rgba(255,244,210,0.5)" strokeWidth="2.5" strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF4CE]" />
        </div>
        {/* Nubes volumétricas a la deriva (tres planos de profundidad) */}
        <Nube className="absolute top-[10%] w-72 opacity-95 drop-shadow-[0_10px_18px_rgba(46,95,140,0.15)]" style={{ animation: 'nube-a 140s linear infinite' }} />
        <Nube className="absolute top-[30%] w-44 opacity-80" style={{ animation: 'nube-b 190s linear infinite', animationDelay: '-70s' }} />
        <Nube className="absolute top-[52%] w-96 opacity-90 drop-shadow-[0_12px_22px_rgba(46,95,140,0.18)]" style={{ animation: 'nube-a 110s linear infinite', animationDelay: '-30s' }} />
        <Nube className="absolute top-[70%] w-36 opacity-60" style={{ animation: 'nube-b 220s linear infinite', animationDelay: '-120s' }} />
      </div>
    </div>
  );
}
