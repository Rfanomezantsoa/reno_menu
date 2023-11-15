/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        dark : {
          silver :"#4D4D4D",
          green :'#2a312a'
        },
        light:{
          silver :"#D9D9D9"
        },
        white : "#f7f7f7"
      },
      height :{
        body: 'calc(100vh - 6rem)',
        sm_body: 'calc(100vh - 5rem)'
      },
      width:{
        sidebar : '70vw'
      }

    },
  },
  plugins: [],
}

