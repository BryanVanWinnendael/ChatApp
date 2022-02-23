module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'chat': '0.3fr 2fr 0.3fr' 
      },
      gridTemplateColumns: {
        'input': '2fr 0.5fr' 
      }
      

    },
  },
  plugins: [],
}