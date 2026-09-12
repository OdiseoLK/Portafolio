import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: '#7CC7FF',
        hielo: '#7CC7FF',
        aurora: '#A8A8B0',
        menta: '#8E8E96',
        lima: '#F4F4F5',
      },
      keyframes: {
        caret: {
          '0%, 55%': { opacity: '1' },
          '56%, 100%': { opacity: '0' },
        },
      },
      animation: {
        caret: 'caret 1.15s step-end infinite',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        // Una sola letra para todo el texto (etiquetas, citas, notas):
        mono: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        // Y una distinta, imponente, solo para títulos:
        display: ['"Archivo Variable"', 'var(--font-geist-sans)', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
