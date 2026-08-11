'use client';

import { useEffect, useRef } from 'react';


const TEXTURES = {
  day:    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
  night:  'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png',
  normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
  spec:   'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
};

/** Globo 3D fotorrealista con Three.js: texturas NASA, atmósfera y luces nocturnas. */
export default function Globe3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let disposed = false;

    const run = async () => {
      const THREE = (await import('three'));


      // ── Renderer ──
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.8;
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera ──
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 2.6);

      // ── Luz solar ──
      const sun = new THREE.DirectionalLight(0xffffff, 2.2);
      sun.position.set(-5, 3, 5);
      scene.add(sun);
      scene.add(new THREE.AmbientLight(0x111133, 0.6));

      // ── Cargar texturas ──
      const loader = new THREE.TextureLoader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loadTex = (url: string) => new Promise<any>((res, rej) => loader.load(url, res, undefined, rej));

      const [texDay, texNight, texNormal, texSpec] = await Promise.all([
        loadTex(TEXTURES.day),
        loadTex(TEXTURES.night),
        loadTex(TEXTURES.normal),
        loadTex(TEXTURES.spec),
      ]);

      if (disposed) { renderer.dispose(); return; }

      // ── Material: día + noche combinados via shader ──
      const earthMat = new THREE.ShaderMaterial({
        uniforms: {
          dayTexture:   { value: texDay },
          nightTexture: { value: texNight },
          normalTexture:{ value: texNormal },
          specTexture:  { value: texSpec },
          sunDirection: { value: sun.position.clone().normalize() },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D dayTexture;
          uniform sampler2D nightTexture;
          uniform sampler2D normalTexture;
          uniform sampler2D specTexture;
          uniform vec3 sunDirection;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(sunDirection);
            float diff = dot(normal, lightDir);

            // mezcla suave día/noche
            float blend = smoothstep(-0.25, 0.35, diff);

            vec4 day   = texture2D(dayTexture,   vUv);
            vec4 night = texture2D(nightTexture, vUv);
            vec4 color = mix(night * 1.8, day, blend);

            // especular suave en el océano
            vec3 spec = texture2D(specTexture, vUv).rgb;
            vec3 viewDir = normalize(-vPosition);
            vec3 reflDir = reflect(-lightDir, normal);
            float sp = pow(max(dot(viewDir, reflDir), 0.0), 32.0) * spec.r * blend * 0.6;
            color.rgb += sp * vec3(0.8, 0.9, 1.0);

            gl_FragColor = color;
          }
        `,
      });

      const earth = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        earthMat
      );
      scene.add(earth);

      // ── Atmósfera exterior (glow azul) ──
      const atmoMat = new THREE.ShaderMaterial({
        uniforms: {
          sunDirection: { value: sun.position.clone().normalize() },
          color: { value: new THREE.Color(0x2266ff) },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 sunDirection;
          uniform vec3 color;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vec3 viewDir = normalize(-vPosition);
            float rim = 1.0 - abs(dot(viewDir, vNormal));
            rim = pow(rim, 3.5);
            float sunFactor = max(0.0, dot(normalize(vNormal), normalize(sunDirection)));
            gl_FragColor = vec4(color, rim * (0.5 + sunFactor * 0.5));
          }
        `,
        side: THREE.FrontSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.08, 64, 64), atmoMat);
      scene.add(atmo);

      // ── Estrellas de fondo ──
      const starGeo = new THREE.BufferGeometry();
      const starPts = new Float32Array(3000 * 3);
      for (let i = 0; i < starPts.length; i++) starPts[i] = (Math.random() - 0.5) * 80;
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPts, 3));
      const stars = new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, sizeAttenuation: true, transparent: true, opacity: 0.7 })
      );
      scene.add(stars);

      // ── Animación ──
      let angle = 0;
      const animate = () => {
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        if (!reduced) {
          angle += 0.0015;
          earth.rotation.y = angle;
          atmo.rotation.y = angle;
        }
        renderer.render(scene, camera);
      };
      animate();
    };
    run();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      const canvas = mount.querySelector('canvas');
      if (canvas) mount.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    ></div>
  );
}
