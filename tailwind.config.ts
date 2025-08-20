import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic theme colors from JSON
        'dynamic-background': 'var(--color-background)',
        'dynamic-background-secondary': 'var(--color-backgroundSecondary)',
        'dynamic-background-tertiary': 'var(--color-backgroundTertiary)',
        'dynamic-text-primary': 'var(--color-textPrimary)',
        'dynamic-text-secondary': 'var(--color-textSecondary)',
        'dynamic-text-muted': 'var(--color-textMuted)',
        'dynamic-accent': 'var(--color-accent)',
        'dynamic-accent-secondary': 'var(--color-accentSecondary)',
        'dynamic-border': 'var(--color-border)',
        'dynamic-border-hover': 'var(--color-borderHover)',
        'dynamic-card': 'var(--color-card)',
        'dynamic-card-hover': 'var(--color-cardHover)',
        'dynamic-success': 'var(--color-success)',
        'dynamic-warning': 'var(--color-warning)',
        'dynamic-error': 'var(--color-error)',
        'dynamic-info': 'var(--color-info)',
      },
      fontFamily: {
        'display': ['var(--font-playfair)', 'serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'dynamic-gradient-primary': 'var(--gradient-primary)',
        'dynamic-gradient-secondary': 'var(--gradient-secondary)',
        'dynamic-gradient-accent': 'var(--gradient-accent)',
        'dynamic-gradient-background': 'var(--gradient-background)',
        'dynamic-gradient-card': 'var(--gradient-card)',
      },
      fontFamily: {
        'dynamic-display': 'var(--font-display)',
        'dynamic-body': 'var(--font-body)',
        'dynamic-mono': 'var(--font-mono)',
      },
      fontSize: {
        'dynamic-xs': 'var(--font-size-xs)',
        'dynamic-sm': 'var(--font-size-sm)',
        'dynamic-base': 'var(--font-size-base)',
        'dynamic-lg': 'var(--font-size-lg)',
        'dynamic-xl': 'var(--font-size-xl)',
        'dynamic-2xl': 'var(--font-size-2xl)',
        'dynamic-3xl': 'var(--font-size-3xl)',
        'dynamic-4xl': 'var(--font-size-4xl)',
        'dynamic-5xl': 'var(--font-size-5xl)',
        'dynamic-6xl': 'var(--font-size-6xl)',
      },
      fontWeight: {
        'dynamic-light': 'var(--font-weight-light)',
        'dynamic-normal': 'var(--font-weight-normal)',
        'dynamic-medium': 'var(--font-weight-medium)',
        'dynamic-semibold': 'var(--font-weight-semibold)',
        'dynamic-bold': 'var(--font-weight-bold)',
        'dynamic-extrabold': 'var(--font-weight-extrabold)',
      },
      lineHeight: {
        'dynamic-tight': 'var(--line-height-tight)',
        'dynamic-normal': 'var(--line-height-normal)',
        'dynamic-relaxed': 'var(--line-height-relaxed)',
      },
      borderRadius: {
        'dynamic-small': 'var(--border-radius-small)',
        'dynamic-medium': 'var(--border-radius-medium)',
        'dynamic-large': 'var(--border-radius-large)',
        'dynamic-xl': 'var(--border-radius-xl)',
        'dynamic-full': 'var(--border-radius-full)',
      },
      boxShadow: {
        'dynamic-small': 'var(--shadow-small)',
        'dynamic-medium': 'var(--shadow-medium)',
        'dynamic-large': 'var(--shadow-large)',
        'dynamic-xl': 'var(--shadow-xl)',
      },
      transitionDuration: {
        'dynamic-fast': 'var(--duration-fast)',
        'dynamic-normal': 'var(--duration-normal)',
        'dynamic-slow': 'var(--duration-slow)',
        'dynamic-page': 'var(--duration-page)',
      },
      maxWidth: {
        'dynamic-container': 'var(--spacing-containerMaxWidth)',
      },
      padding: {
        'dynamic-section': 'var(--spacing-sectionPadding)',
        'dynamic-container': 'var(--spacing-containerPadding)',
        'dynamic-card': 'var(--spacing-cardPadding)',
        'dynamic-button': 'var(--spacing-buttonPadding)',
      },
    },
  },
  plugins: [],
};
export default config;
