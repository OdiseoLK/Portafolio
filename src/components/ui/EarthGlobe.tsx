'use client';

import { useEffect, useRef } from 'react';

/**
 * Tierra animada en canvas — esfera 3D con océano, continentes,
 * atmósfera y luces de ciudades. Rota suavemente y responde a
 * prefers-reduced-motion.
 */
export default function EarthGlobe({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const R = size * 0.46;
    const cx = size / 2;
    const cy = size / 2;

    // ── Continentes (polígonos simplificados en coords esféricas lat/lon) ──
    // Cada continente: array de [lat, lon] en grados
    const continents: [number, number][][] = [
      // América del Norte
      [[72,-140],[72,-70],[30,-60],[20,-80],[15,-90],[20,-105],[30,-120],[50,-130],[72,-140]],
      // América del Sur
      [[10,-80],[10,-50],[0,-50],[-10,-37],[-55,-68],[-55,-73],[-20,-80],[0,-78],[10,-80]],
      // Europa
      [[72,10],[60,30],[45,40],[36,30],[36,5],[45,-5],[55,-5],[65,15],[72,10]],
      // África
      [[37,10],[37,37],[15,42],[0,42],[-35,20],[-35,18],[0,-17],[15,-17],[37,10]],
      // Asia
      [[72,30],[72,140],[50,140],[25,120],[10,105],[10,80],[25,60],[45,60],[72,30]],
      // Australia
      [[-15,130],[-15,150],[-40,150],[-40,114],[-22,114],[-15,130]],
      // Groenlandia
      [[85,-55],[72,-20],[65,-35],[65,-55],[85,-55]],
    ];

    // Convertir lat/lon a coordenadas 3D esféricas
    const toXYZ = (lat: number, lon: number, angle: number) => {
      const φ = (lat * Math.PI) / 180;
      const λ = (lon * Math.PI) / 180 + angle;
      const x = Math.cos(φ) * Math.cos(λ);
      const y = Math.sin(φ);
      const z = Math.cos(φ) * Math.sin(λ);
      return { x, y, z };
    };

    // Proyectar a 2D (ortográfica)
    const project = (x: number, y: number, z: number) => ({
      px: cx + x * R,
      py: cy - y * R,
      visible: z > -0.1,
    });

    // Ciudades con luces (lat, lon)
    const cities: [number, number][] = [
      [40.7,-74],[51.5,-0.1],[48.8,2.3],[55.7,37.6],[35.6,139.7],
      [22.3,114.2],[1.3,103.8],[19.4,-99.1],[34,-118],[41.8,-87.6],
      [23.1,113.3],[30.5,114.3],[39.9,116.4],[28.6,77.2],[18.9,72.8],
      [-23.5,-46.6],[-33.8,151],[-33.9,18.4],[6.5,3.3],[30,31.2],
      [45.5,-73.5],[43.6,-79.4],[-34.6,-58.4],[37.5,127],[59.9,30.3],
    ];

    let angle = 0;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // ── Espacio exterior (negro con estrellas) ──
      // (ya viene del fondo de la página)

      // ── Atmósfera exterior ──
      const atmo = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.18);
      atmo.addColorStop(0, 'rgba(30,100,200,0.25)');
      atmo.addColorStop(0.5, 'rgba(20,60,160,0.12)');
      atmo.addColorStop(1, 'rgba(0,20,80,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      // ── Océano ──
      const ocean = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
      ocean.addColorStop(0, '#1a4a8a');
      ocean.addColorStop(0.4, '#0d2f6b');
      ocean.addColorStop(0.75, '#071a4a');
      ocean.addColorStop(1, '#030d28');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();

      // ── Lado oscuro (noche) ──
      const night = ctx.createRadialGradient(cx + R * 0.5, cy, 0, cx + R * 0.3, cy, R * 1.1);
      night.addColorStop(0, 'rgba(0,0,0,0)');
      night.addColorStop(0.45, 'rgba(0,0,0,0)');
      night.addColorStop(0.7, 'rgba(0,0,0,0.45)');
      night.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = night;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      // ── Continentes ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      for (const cont of continents) {
        const pts = cont.map(([lat, lon]) => {
          const { x, y, z } = toXYZ(lat, lon, angle);
          return { ...project(x, y, z), z };
        });

        // solo dibujar si la mayoría de puntos es visible
        const visCount = pts.filter(p => p.z > 0).length;
        if (visCount < pts.length * 0.4) continue;

        ctx.beginPath();
        let started = false;
        for (const pt of pts) {
          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.closePath();

        // gradiente de continente
        const g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
        g.addColorStop(0, '#3d6e3a');
        g.addColorStop(0.3, '#2e5a2b');
        g.addColorStop(0.7, '#1f4a1c');
        g.addColorStop(1, '#4a7a3d');
        ctx.fillStyle = g;
        ctx.fill();

        // borde de costa suave
        ctx.strokeStyle = 'rgba(100,180,100,0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── Luces de ciudades (lado oscuro) ──
      for (const [lat, lon] of cities) {
        const { x, y, z } = toXYZ(lat, lon, angle);
        const { px, py } = project(x, y, z);
        if (z < 0) continue; // oculta detrás

        // brillo solo en zona de noche (x > 0.1 relativo al centro)
        const nightFactor = Math.max(0, Math.min(1, (x + 0.15) / 0.5));
        if (nightFactor < 0.15) continue;

        const alpha = nightFactor * 0.85;
        const cityGlow = ctx.createRadialGradient(px, py, 0, px, py, 3.5);
        cityGlow.addColorStop(0, `rgba(255,230,150,${alpha})`);
        cityGlow.addColorStop(0.5, `rgba(255,200,80,${alpha * 0.4})`);
        cityGlow.addColorStop(1, 'rgba(255,180,50,0)');
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = cityGlow;
        ctx.fill();
      }

      ctx.restore();

      // ── Brillo de luz solar (lado iluminado) ──
      const specular = ctx.createRadialGradient(
        cx - R * 0.28, cy - R * 0.32, 0,
        cx - R * 0.28, cy - R * 0.32, R * 0.6
      );
      specular.addColorStop(0, 'rgba(255,255,255,0.12)');
      specular.addColorStop(0.4, 'rgba(200,230,255,0.05)');
      specular.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = specular;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      // ── Atmósfera en el borde (azul brillante) ──
      const atmoEdge = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R);
      atmoEdge.addColorStop(0, 'rgba(40,120,255,0)');
      atmoEdge.addColorStop(0.5, 'rgba(40,120,255,0.08)');
      atmoEdge.addColorStop(0.85, 'rgba(80,160,255,0.28)');
      atmoEdge.addColorStop(1, 'rgba(120,200,255,0.35)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = atmoEdge;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      angle += 0.0018;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
