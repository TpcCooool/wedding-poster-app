/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans SC', 'sans-serif'],
        'art': ['Ma Shan Zheng', 'cursive'],
        'fun': ['ZCOOL KuaiLe', 'cursive'],
      },
    },
  },
  plugins: [],
}
