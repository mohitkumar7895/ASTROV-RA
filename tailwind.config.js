/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        astro: {
          midnight: "#080D24",
          navy: "#111B3A",
          gold: "#D6B56D",
          goldLight: "#F5D98B",
          goldDark: "#C59B3C",
          ivory: "#F8FAFC",
          slate: "#E2E8F0",
          darkCard: "#0C1433",
          border: "rgba(214, 181, 109, 0.25)",
          borderHover: "rgba(214, 181, 109, 0.5)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Cormorant Garamond", "serif"],
        heading: ["var(--font-cinzel)", "Cinzel", "Cormorant Garamond", "serif"],
        body: ["var(--font-inter)", "Inter", "Lato", "sans-serif"],
        accent: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      boxShadow: {
        goldGlow: "0 0 25px -5px rgba(214, 181, 109, 0.25)",
        goldGlowLg: "0 0 40px -2px rgba(214, 181, 109, 0.35)",
        navyGlow: "0 10px 30px -10px rgba(8, 13, 36, 0.8)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFF4D2 0%, #F5D98B 50%, #D4AF37 100%)",
        "gold-shimmer": "linear-gradient(90deg, rgba(214,181,109,0) 0%, rgba(214,181,109,0.3) 50%, rgba(214,181,109,0) 100%)",
        "cosmic-radial": "radial-gradient(circle at 50% 20%, #1A2854 0%, #0D1636 50%, #080D24 100%)",
        "card-glass": "linear-gradient(135deg, rgba(17, 27, 58, 0.7) 0%, rgba(8, 13, 36, 0.85) 100%)",
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
