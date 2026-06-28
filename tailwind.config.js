/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        black:      '#050505',
        'dark-gray':'#111111',
        concrete:   '#2B2B2B',
        'off-white':'#EAEAEA',
        gold:       '#9a7f4a',
        'gold-bright':'#c4a55a',
        bone:       '#e8e3d8',
      },
      fontFamily: {
        bebas:  ['Bebas Neue', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
        mono:   ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
