/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}", "./pages/**/*.{js,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TikTokText-Regular"],
        mediumSans: ["TikTokText-Medium"],
      },
    },
  },
  plugins: [],
};
