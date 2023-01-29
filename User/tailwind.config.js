/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
      width: {
        '128': '80rem',
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')
],
variants: {
    scrollbar: ['rounded']
}
}
