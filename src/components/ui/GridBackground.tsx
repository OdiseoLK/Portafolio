'use client';

/**
 * Fondo ambiental del sitio: sin cuadrícula. Auroras de color en movimiento
 * lento que dan vida al lienzo oscuro sin cansar la vista.
 */
export default function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <style>{`
        @keyframes drift-a { 0%,100% { transform: translate(-10%, -6%) scale(1); } 50% { transform: translate(14%, 10%) scale(1.15); } }
        @keyframes drift-b { 0%,100% { transform: translate(8%, 12%) scale(1.1); } 50% { transform: translate(-12%, -8%) scale(0.95); } }
        @keyframes drift-c { 0%,100% { transform: translate(0%, 0%) scale(1); } 50% { transform: translate(-8%, 14%) scale(1.2); } }
      `}</style>
      <div
        className="absolute -left-[15%] top-[-10%] h-[55vw] w-[55vw] rounded-full opacity-[0.13]"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(90px)', animation: 'drift-a 26s ease-in-out infinite' }}
      />
      <div
        className="absolute right-[-12%] top-[30%] h-[48vw] w-[48vw] rounded-full opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 65%)', filter: 'blur(100px)', animation: 'drift-b 32s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] h-[50vw] w-[50vw] rounded-full opacity-[0.09]"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 65%)', filter: 'blur(110px)', animation: 'drift-c 38s ease-in-out infinite' }}
      />
    </div>
  );
}
