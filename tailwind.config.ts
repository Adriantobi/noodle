import type { Config } from "tailwindcss";
import {
  scrollbarGutter,
  scrollbarWidth,
  scrollbarColor,
} from "tailwind-scrollbar-utilities";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: "var(--dark)",
      },
      backgroundImage: {
        tick: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23919498' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'><polyline points='20 6 9 17 4 12'></polyline></svg>")`,
        creator: `linear-gradient(45deg, #ff5353, #e74d67, #b87ce5, #a16ced, #ba6ebf, #b3697e, #c0815e, #ffc747)`,
      },
      boxShadow: {
        more: "rgba(255, 255, 255, 0.1) 0px 4px 24px -1px",
        "space-info": "rgba(0, 0, 0, 0.2) 0px -2px 10px -2px",
        floating: `rgba(255, 255, 255, 0.1) 0px 4px 24px -1px`,
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [scrollbarGutter(), scrollbarWidth(), scrollbarColor()],
};
export default config;
