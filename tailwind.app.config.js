const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/apps/*.html",
  ],
  theme: {
    extend: {
      //steam colors
      colors: {
        steam: {
          black: '#171d25',
          white: '#e5e5e5',
          back: '#1b2838',
          green: '#BEEE11',
          green2: '#4c6b22',
          grey: '#344654',
          blue: '#4f94bc',
        }
      },
      textShadow: {
        sm: '2px 2px 0px var(--tw-shadow-color)',
        DEFAULT: '2px px 0px var(--tw-shadow-color)',
        lg: '4px 4px 0px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

