import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090909',
        surface: '#111111',
        card: '#171717',
        line: '#252525',
        fg: '#F5F5F5',
        muted: '#A3A3A3',
        accent: '#8B5CF6',
        lima: '#22C55E',
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
        display: ['"Space Grotesk Variable"', 'var(--font-geist-sans)', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
