import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050506',
        surface: '#0E0E10',
        card: '#121214',
        line: '#232327',
        fg: '#F4F4F5',
        muted: '#8E8E96',
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
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        hand: ['"Caveat Variable"', 'cursive'],
        display: ['"Archivo Variable"', '"Space Grotesk Variable"', 'var(--font-geist-sans)', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
