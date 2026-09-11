import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1020',
        surface: '#111A30',
        card: '#152039',
        line: '#26304D',
        fg: '#F2F5FA',
        muted: '#93A0B8',
        accent: '#7CC7FF',
        hielo: '#7CC7FF',
        aurora: '#A78BFA',
        menta: '#5EEAD4',
        lima: '#34D399',
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
