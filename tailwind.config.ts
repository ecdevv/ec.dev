import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero": "url('/images/me.png')",
      },
      fontFamily: {
        raleway: "var(--font-raleway)",
        openSans: "var(--font-opensans)",
        poppins: "var(--font-poppins)",
      },
      keyframes: {
        translateX: {
          '0%, 100%': { transform: 'translate(0)' },
          '50%': { transform: 'translate(1rem)' },
        }
      },
      animation: {
        translateX: 'translateX 1s linear infinite',
      }
      
    },
  },
  plugins: [],
};
export default config;
