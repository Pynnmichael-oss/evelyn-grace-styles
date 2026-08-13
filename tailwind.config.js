/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#F4EDE4',
        espresso: '#3A2E27',
        taupe: '#B8A99A',
        terracotta: '#C17F59',
        'terracotta-deep': '#A8623F',
        cream: '#FBF8F4',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"General Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
