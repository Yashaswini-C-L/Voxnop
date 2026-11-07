/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#0866E8',
        'deep-navy': '#071D49',
        'cyan-accent': '#12B8F5',
        'ice-grey': '#F3F7FC',
        'slate-grey': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'subtle-blue': '0 8px 30px rgba(8, 102, 232, 0.08)',
        'chip-glow': '0 0 25px rgba(18, 184, 245, 0.45)',
        'badge': '0 2px 10px rgba(8, 102, 232, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
