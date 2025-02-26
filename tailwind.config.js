/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f8faf8',
          100: '#f1f5f1',
          200: '#e3eae4',
          300: '#c9d6cc',
          400: '#a6baa9',
          500: '#87a18b',
          600: '#687f6c',
          700: '#546558',
          800: '#445248',
          900: '#3a453d',
          950: '#1f2620',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Lato', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} 