import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fd7e14",
      },
      backgroundImage: {
        "404-background": "url('../public/404-background.jpeg')",
        "information-background": "url('../public/information-background.jpg')",
      },
    },
  },
  plugins: [
    require("tailwindcss-font-inter"),
    require("tailwind-scrollbar-hide"),
    require("flowbite/plugin"),
  ],
};

export default config;
