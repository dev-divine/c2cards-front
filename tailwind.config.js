/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F9A01B',
        secondary: '#0067B4',
        cyan: '#38D2D9',
        background: '#F2F2F2',
        'auth-background': '#F2EDE7',
        danger: '#D73035',
      },
      ringColor: {
        focus: '#F9A01B',
      },
      ringOffsetColor: {
        focus: '#F9A01B',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
