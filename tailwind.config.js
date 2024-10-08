/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"

const fontStyles = {
  ".variant-header": {
    "font-size": "60px",
    "font-weight": "700",
    "line-height": "2",
    '@media (max-width: 500px)': {
      "font-size": "54px",
    },
    // for responsive
    // '@media (max-width: 500px)': {
    //   "font-size": "40px",
    // },
    // for states
    // '&:hover': {
    //   "font-weight": "900",
    // },
  },
  ".variant-h1": {
    "font-size": "46px",
    "font-weight": "600",
    "line-height": "2",
    '@media (max-width: 500px)': {
      "font-size": "36px",
      "line-height": "1.5",
    },
  },
  ".variant-h2": {
    "font-size": "38px",
    "font-weight": "600",
    "line-height": "2",
    '@media (max-width: 500px)': {
      "font-size": "30px",
      "line-height": "1.5",
    },
  },
  ".variant-h3": {
    "font-size": "32px",
    "font-weight": "600",
    "line-height": "1.5",
    '@media (max-width: 500px)': {
      "font-size": "24px",
      "line-height": "1.2",
    },
  },
  ".variant-h4": {
    "font-size": "26px",
    "font-weight": "500",
    "line-height": "1.5",
    '@media (max-width: 500px)': {
      "font-size": "20px",
      "line-height": "1.2",
    },
  },
  ".variant-h5": {
    "font-size": "20px",
    "font-weight": "500",
    "line-height": "1.5",
    '@media (max-width: 500px)': {
      "font-size": "18px",
      "line-height": "1.2",
    },
  },
  ".variant-h6": {
    "font-size": "16px",
    "font-weight": "500",
    "line-height": "1.5",
  },
  ".variant-p": {
    "font-size": "16px",
    "font-weight": "400",
    "line-height": "1.5",
  },
  ".variant-small": {
    "font-size": "14px",
    "font-weight": "500",
    "line-height": "1.5",
  },
}

const TailwindConfig = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    data: {
      active: 'active="true"',
      pending: 'pending="true"',
      current: 'current="true"',
    },
    container: {
      center: true,
      padding: {
        lg: "2rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents(fontStyles)
      addComponents({
        ".container-fluid": {
          maxWidth: "120rem",
          marginInline: "auto",
          paddingInline: "0",
        },
      })
    }),
  ],
}

export default TailwindConfig