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
      colors: {
        main: "rgba(var(--main))",
        primaryColor: "rgba(var(--primary-color))",
        secondaryColor: "rgba(var(--secondary-color))",

        navbarMobileColor: "rgba(var(--navbar-mobile-color))",
        aboutHistoryColor: "rgba(var(--about-history-color))",
        contactIconBGColor: "rgba(var(--contact-iconbg-color))",

        footerColor: "rgba(var(--footer-color))",
        footerSecondaryColor: "rgba(var(--footer-secondary-color))",

        baseTextColor: "rgba(var(--base-text-color))",
        baseTextColor2: "rgba(var(--base-text-color2))",

        primaryBorderColor: "rgba(var(--primary-border-color))",
        secondaryBorderColor: "rgba(var(--secondary-border-color))",

        buttonColor: "rgba(var(--button-color))",
        buttonHoverColor: "rgba(var(--button-hover-color))",
        buttonActiveColor: "rgba(var(--button-active-color))",

        projectBG: "rgba(var(--project-bg))",
      },
      fontFamily: {
        raleway: "var(--font-raleway)",
        openSans: "var(--font-opensans)",
        poppins: "var(--font-poppins)",
      },
      screens: {        
        'mh-xl': { 'raw': '(max-height: 1280px)' },
        'mh-lg': { 'raw': '(max-height: 1024px)' },
        'mh-md': { 'raw': '(max-height: 768px)' },
        'mh-sm': { 'raw': '(max-height: 640px)' },
        'mh-xs': { 'raw': '(max-height: 400px)' },
        'mh-xxs': { 'raw': '(max-height: 256px)' },
        
        'mw-xl': { 'raw': '(max-width: 1280px)' },
        'mw-lg': { 'raw': '(max-width: 1024px)' },
        'mw-md': { 'raw': '(max-width: 768px)' },
        'mw-sm': { 'raw': '(max-width: 640px)' },
        'mw-xs': { 'raw': '(max-width: 400px)' },
        'mw-xxs': { 'raw': '(max-width: 256px)' },
        
        'xxs': { 'raw': '(min-width: 256px)' },
        'xs': { 'raw': '(min-width: 400px)' },
        'sm': { 'raw': '(min-width: 640px)' },
        'md': { 'raw': '(min-width: 768px)' },
        'lg': { 'raw': '(min-width: 1024px)' },
        'xl': { 'raw': '(min-width: 1280px)' },
        
        'h-xxs': { 'raw': '(min-height: 256px)' },
        'h-xs': { 'raw': '(min-height: 400px)' },
        'h-600': { 'raw': '(min-height: 600px)' },
        'h-sm': { 'raw': '(min-height: 640px)' },
        'h-md': { 'raw': '(min-height: 768px)' },
        'h-825': { 'raw': '(min-height: 825px)' },
        'h-lg': { 'raw': '(min-height: 1024px)' },
        'h-xl': { 'raw': '(min-height: 1280px)' },
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
