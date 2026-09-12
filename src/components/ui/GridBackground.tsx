'use client';

/**
 * Fondo de mapa de expedición: retícula de puntos finísima sobre el color
 * del cielo activo. Sin blobs de color — el fondo obedece al modo día/tarde/noche.
 */
export default function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-bg">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--fg) / 0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
