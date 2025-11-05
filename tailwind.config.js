/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#7C3AED',
        },
        student: '#2563EB',
        lecturer: '#10B981',
        parent: '#F97316',
        principal: '#7C3AED',
        admin: '#11171A',
        danger: '#DC2626',
        surface: '#FFFFFF',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['32px', { fontWeight: '700' }],
        'headline-l': ['24px', { fontWeight: '600' }],
        'body': ['16px', { fontWeight: '400' }],
        'small': ['12px', { fontWeight: '400' }],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'lift': 'lift 0.2s ease-out',
      },
      keyframes: {
        lift: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(.16,.84,.33,1)',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(16,24,40,0.04)',
      },
    },
  },
  plugins: [],
}