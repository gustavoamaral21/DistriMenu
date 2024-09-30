/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        vermelho: '#a81508', // Vermelho
        vermelho2: '#f96342', // Vermelho2
        amarelo: '#a88028', // Amarelo
        branco: '#f9f8f7',  // Branco
        marrom: '#241301',  // Marrom
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/aspect-ratio')
  ],
}


