/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // https://developer.spotify.com/documentation/design
        spotify: { green: '#1DB954', white: '#FFF', black: '#191414' },
      },
      fontFamily: { sans: ['Inter Variable', 'sans-serif'] },
    },
  },
  plugins: [],
};
