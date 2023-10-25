/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'blue': 'blue',
      },
      height :{
        body: 'calc(100vh - 6rem)'
      },
      width:{
        sidebar : '70vw'
      }

    },
  },
  plugins: [],
}

