/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'rich-black': 'hsl(210, 26%, 7%)',
        'deep-saffron': 'hsl(32, 100%, 59%)',
        'dark-orange': 'hsl(28, 100%, 58%)',
        'champagne-pink': 'hsl(23, 61%, 86%)',
        'desert-sand': 'hsl(23, 49%, 82%)',
        tangerine: 'hsl(31, 84%, 50%)',
        cinnabar: 'hsl(3, 90%, 55%)',
        isabelline: 'hsl(38, 44%, 96%)',
        cultured: 'hsl(0, 0%, 93%)',
        gainsboro: 'hsl(0, 0%, 87%)',
        onyx: 'hsl(0, 0%, 27%)',
        'spanish-gray': 'hsl(0, 0%, 60%)',
        'sonic-silver': 'hsl(0, 0%, 47%)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'cursive'],
        body: ['var(--font-body)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      boxShadow: {
        'card-1': '0 1px 4px hsla(0, 0%, 0%, 0.2)',
        'card-2': '0 1px 2px hsla(0, 0%, 0%, 0.2)',
      },
    },
  },
  plugins: [],
};
