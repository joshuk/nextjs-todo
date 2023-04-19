/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'black': '#000000',
      'purple': '#4D455D',
      'red': '#E96479',
      'cream': '#F5E9CF',
      'creamLight': '#FBF4E4',
      'blue': '#7DB9B6'
    },
    extend: {
      backgroundSize: {
        '0': '0%',
        'full': '100%'
      }
    }
  },
  plugins: []
}
