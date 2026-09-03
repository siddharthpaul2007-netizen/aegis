/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: {
          top: 'var(--paper-top)',
          bottom: 'var(--paper-bottom)',
          surface: 'var(--paper-surface)',
          elevated: 'var(--paper-elevated)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
          dim: 'var(--ink-dim)',
          faint: 'var(--ink-faint)',
        },
        accent: {
          slate: 'var(--accent-slate)',
          cyan: 'var(--accent-cyan)',
          amber: 'var(--accent-amber)',
          emerald: 'var(--accent-emerald)',
          rose: 'var(--accent-rose)',
        },
        hairline: 'var(--hairline)',
        hairlineStrong: 'var(--hairline-strong)',
      },
      animation: {
        'fade-up': 'blurFadeUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards',
        'soft-in': 'softIn 1.2s ease forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        blurFadeUp: {
          '0%': { opacity: '0', filter: 'blur(16px)', transform: 'translateY(24px)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0)' },
        },
        softIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.98' },
          '50%': { opacity: '0.65' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
