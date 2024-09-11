/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#635fc7',
        'danger': '#ea5555',
        'dark-bg': '#20212c',
        'dark-main': '#2b2c37',
        'dark-border': '#3e3f4e',
        'light-bg': '#f4f7fd',
      }
    },
  },
  plugins: [],
}

