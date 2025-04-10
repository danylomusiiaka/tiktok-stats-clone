/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.{js,ts,tsx}", "./src/components/**/*.{js,ts,tsx}", "./src/screens/**/*.{js,ts,tsx}"],

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
