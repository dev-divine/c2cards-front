/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1B2E67',
        'light-blue': '#E4EFFF',
        'lighter-blue': '#F5F8FA',
        'main-text': '#333333',
        'main-green': '#93C01F',
        'green-normal': '#8ECFAD',
        'green-hover': '#17DB4E',
        'green-base': '#A1C848',
        'dark-black': '#000000E3',
        'light-gray': '#FCFCFC',
        'dark-gray': '#373737',
        'main-black': '#091747',
        'bg-gray': '#E2E2E2',
        'darker-gray': '#252525',
        'main-gray': '#B7B5B5',
        'semi-gray': '#E4E6EF',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom right, #000000, #344c8b)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
