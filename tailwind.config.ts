import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003f98",
        secondary: "#3671cf",
        accent: "#ff9800",
        "bg-white": "#FFFFFF",
        "bg-light": "#f2f6ff",
        "text-dark": "#000f24",
        "text-p": "#525a66",
      },
      container: {
        center: true,
        padding: "40px",
      },
    },
  },
  plugins: [],
};
export default config;
