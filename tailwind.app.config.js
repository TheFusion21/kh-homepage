const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/apps/*.html",
  ],
  theme: {
    extend: {
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

