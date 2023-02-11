/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        701: "500px",
        38: "32px",
      },
      width: {
        505: "400px",
        132: "100px",
      },
      inset: {
        114: "114px",
        111: "111px",
        30: "30px",
        30: "30px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      colors: {
        blackish: "#878787",
        whitish: "#FFFFFF",
        whitish1: "#E5E5E5",
        customgray: "#7D7D7D",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      lineHeight: {
        welcome: "38px",
      },
      fontSize: {
        custom: "25px",
      },
    },
  },
  plugins: [],
};
