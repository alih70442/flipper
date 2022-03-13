module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },

    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1330px',
      '2xl': '1640px',
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        sm: "1rem",
        lg: "1.5rem",
      },
    },
  },
  plugins: [],
}