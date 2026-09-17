/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Mau thuong hieu rieng cua airkido
        brand: {
          50: '#fff1f3',
          100: '#ffe0e5',
          200: '#ffc6d0',
          300: '#ff9aad',
          400: '#fb6383',
          500: '#f13a63',
          600: '#e11d48',
          700: '#bd1240',
          800: '#9f123c',
          900: '#881338',
        },
        // Thang mau trung tinh theo phong cach Airbnb
        ink: {
          DEFAULT: '#222222',
          soft: '#5e5e5e',
          muted: '#717171',
        },
        line: '#dddddd',
        surface: '#f7f7f7',
        chip: '#f2f2f2',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['14px', '20px'],
      },
      borderRadius: {
        card: '18px',
        pill: '999px',
      },
      boxShadow: {
        pill: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'pill-hover': '0 2px 4px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.12)',
        panel: '0 6px 16px rgba(0,0,0,0.12)',
        booking: '0 6px 16px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        shell: '1280px',
      },
    },
  },
  plugins: [],
};
