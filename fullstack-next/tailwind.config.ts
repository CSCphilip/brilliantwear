import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fd7e14",
      },
      backgroundImage: {
        "home-shopping-assistant": "url('../public/closet_home.jpeg')",
        "404-background": "url('../public/404-background.jpeg')",
      },
    },
  },
};

export default config;
