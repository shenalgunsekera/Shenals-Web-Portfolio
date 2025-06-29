/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-dark': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#667eea',
          600: '#5a6fd8',
          700: '#4c5bc7',
          800: '#4049a8',
          900: '#374085',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#f093fb',
          600: '#e085e8',
          700: '#c026d3',
          800: '#a21caf',
          900: '#86198f',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(102, 126, 234, 0.3)',
        'glow-lg': '0 0 40px rgba(102, 126, 234, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(102, 126, 234, 0.2)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '6': '6deg',
        '12': '12deg',
        '15': '15deg',
        '30': '30deg',
        '45': '45deg',
        '60': '60deg',
        '90': '90deg',
        '180': '180deg',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '110': '1.1',
        '115': '1.15',
        '120': '1.2',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-secondary': {
          'background': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.hover-lift': {
          'transition': 'all 0.3s ease',
          '&:hover': {
            'transform': 'translateY(-5px)',
            'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        '.hover-glow': {
          'transition': 'all 0.3s ease',
          '&:hover': {
            'box-shadow': '0 0 20px rgba(102, 126, 234, 0.4)',
          },
        },
        '.hover-scale': {
          'transition': 'all 0.3s ease',
          '&:hover': {
            'transform': 'scale(1.05)',
          },
        },
        '.floating': {
          'animation': 'float 6s ease-in-out infinite',
        },
        '.glow-effect': {
          'position': 'relative',
          '&::after': {
            'content': '""',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'background': 'radial-gradient(circle at center, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
            'opacity': '0',
            'transition': 'opacity 0.3s ease',
            'pointer-events': 'none',
          },
          '&:hover::after': {
            'opacity': '1',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
}; 