import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const colors = {
  // Base colors
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",

  // Chart colors
  chart: {
    1: "hsl(var(--chart-1))",
    2: "hsl(var(--chart-2))",
    3: "hsl(var(--chart-3))",
    4: "hsl(var(--chart-4))",
    5: "hsl(var(--chart-5))",
  },

  border: "var(--sline-base-border-alpha)",

  // Sline colors
  sline: {
    // Text
    text: {
      light: {
        primary: "var(--text-light-primary)",
        secondary: "var(--text-light-secondary)",
        tertiary: "var(--text-light-tertiary)",
      },
      dark: {
        primary: "var(--text-dark-primary)",
        secondary: "var(--text-dark-secondary)",
        tertiary: "var(--text-dark-tertiary)",
      },
    },

    // Alpha Dark
    "alpha-dark": {
      "000": "hsla(var(--sline-colors-alpha-dark-000))",
      "050": "hsla(var(--sline-colors-alpha-dark-050))",
      100: "hsla(var(--sline-colors-alpha-dark-100))",
      200: "hsla(var(--sline-colors-alpha-dark-200))",
      300: "hsla(var(--sline-colors-alpha-dark-300))",
      400: "hsla(var(--sline-colors-alpha-dark-400))",
      500: "hsla(var(--sline-colors-alpha-dark-500))",
      600: "hsla(var(--sline-colors-alpha-dark-600))",
      700: "hsla(var(--sline-colors-alpha-dark-700))",
      900: "hsla(var(--sline-colors-alpha-dark-900))",
    },
    // Alpha Light
    "alpha-light": {
      "000": "hsla(var(--sline-colors-alpha-light-000))",
      "050": "hsla(var(--sline-colors-alpha-light-050))",
      100: "hsla(var(--sline-colors-alpha-light-100))",
      200: "hsla(var(--sline-colors-alpha-light-200))",
      300: "hsla(var(--sline-colors-alpha-light-300))",
      400: "hsla(var(--sline-colors-alpha-light-400))",
      500: "hsla(var(--sline-colors-alpha-light-500))",
      600: "hsla(var(--sline-colors-alpha-light-600))",
      700: "hsla(var(--sline-colors-alpha-light-700))",
      900: "hsla(var(--sline-colors-alpha-light-900))",
    },
    // Color scales
    blue: {
      50: "hsl(var(--sline-colors-blue-50))",
      100: "hsl(var(--sline-colors-blue-100))",
      200: "hsl(var(--sline-colors-blue-200))",
      300: "hsl(var(--sline-colors-blue-300))",
      400: "hsl(var(--sline-colors-blue-400))",
      500: "hsl(var(--sline-colors-blue-500))",
      600: "hsl(var(--sline-colors-blue-600))",
      700: "hsl(var(--sline-colors-blue-700))",
      800: "hsl(var(--sline-colors-blue-800))",
      900: "hsl(var(--sline-colors-blue-900))",
    },
    purple: {
      50: "hsl(var(--sline-colors-purple-50))",
      100: "hsl(var(--sline-colors-purple-100))",
      200: "hsl(var(--sline-colors-purple-200))",
      300: "hsl(var(--sline-colors-purple-300))",
      400: "hsl(var(--sline-colors-purple-400))",
      500: "hsl(var(--sline-colors-purple-500))",
      600: "hsl(var(--sline-colors-purple-600))",
      700: "hsl(var(--sline-colors-purple-700))",
      800: "hsl(var(--sline-colors-purple-800))",
      900: "hsl(var(--sline-colors-purple-900))",
    },

    /* Gray */
    gray: {
      50: "hsl(var(--sline-colors-gray-50))",
      100: "hsl(var(--sline-colors-gray-100))",
      200: "hsl(var(--sline-colors-gray-200))",
      300: "hsl(var(--sline-colors-gray-300))",
      400: "hsl(var(--sline-colors-gray-400))",
      500: "hsl(var(--sline-colors-gray-500))",
      600: "hsl(var(--sline-colors-gray-600))",
      700: "hsl(var(--sline-colors-gray-700))",
      800: "hsl(var(--sline-colors-gray-800))",
      900: "hsl(var(--sline-colors-gray-900))",
    },

    /* Green */
    green: {
      50: "hsl(var(--sline-colors-green-50))",
      100: "hsl(var(--sline-colors-green-100))",
      200: "hsl(var(--sline-colors-green-200))",
      300: "hsl(var(--sline-colors-green-300))",
      400: "hsl(var(--sline-colors-green-400))",
      500: "hsl(var(--sline-colors-green-500))",
      600: "hsl(var(--sline-colors-green-600))",
      700: "hsl(var(--sline-colors-green-700))",
      800: "hsl(var(--sline-colors-green-800))",
      900: "hsl(var(--sline-colors-green-900))",
    },

    /* Red */
    red: {
      50: "hsl(var(--sline-colors-red-50))",
      100: "hsl(var(--sline-colors-red-100))",
      200: "hsl(var(--sline-colors-red-200))",
      300: "hsl(var(--sline-colors-red-300))",
      400: "hsl(var(--sline-colors-red-400))",
      500: "hsl(var(--sline-colors-red-500))",
      600: "hsl(var(--sline-colors-red-600))",
      700: "hsl(var(--sline-colors-red-700))",
      800: "hsl(var(--sline-colors-red-800))",
      900: "hsl(var(--sline-colors-red-900))",
    },

    /* Yellow */
    yellow: {
      50: "hsl(var(--sline-colors-yellow-50))",
      100: "hsl(var(--sline-colors-yellow-100))",
      200: "hsl(var(--sline-colors-yellow-200))",
      300: "hsl(var(--sline-colors-yellow-300))",
      400: "hsl(var(--sline-colors-yellow-400))",
      500: "hsl(var(--sline-colors-yellow-500))",
      600: "hsl(var(--sline-colors-yellow-600))",
      700: "hsl(var(--sline-colors-yellow-700))",
      800: "hsl(var(--sline-colors-yellow-800))",
      900: "hsl(var(--sline-colors-yellow-900))",
    },

    bronze: {
      50: "hsl(var(--sline-colors-bronze-50))",
      100: "hsl(var(--sline-colors-bronze-100))",
      200: "hsl(var(--sline-colors-bronze-200))",
      300: "hsl(var(--sline-colors-bronze-300))",
      400: "hsl(var(--sline-colors-bronze-400))",
      500: "hsl(var(--sline-colors-bronze-500))",
      600: "hsl(var(--sline-colors-bronze-600))",
      700: "hsl(var(--sline-colors-bronze-700))",
      800: "hsl(var(--sline-colors-bronze-800))",
      900: "hsl(var(--sline-colors-bronze-900))",
    },
    cyan: {
      50: "hsl(var(--sline-colors-cyan-50))",
      100: "hsl(var(--sline-colors-cyan-100))",
      200: "hsl(var(--sline-colors-cyan-200))",
      300: "hsl(var(--sline-colors-cyan-300))",
      400: "hsl(var(--sline-colors-cyan-400))",
      500: "hsl(var(--sline-colors-cyan-500))",
      600: "hsl(var(--sline-colors-cyan-600))",
      700: "hsl(var(--sline-colors-cyan-700))",
      800: "hsl(var(--sline-colors-cyan-800))",
      900: "hsl(var(--sline-colors-cyan-900))",
    },
    emerald: {
      50: "hsl(var(--sline-colors-emerald-50))",
      100: "hsl(var(--sline-colors-emerald-100))",
      200: "hsl(var(--sline-colors-emerald-200))",
      300: "hsl(var(--sline-colors-emerald-300))",
      400: "hsl(var(--sline-colors-emerald-400))",
      500: "hsl(var(--sline-colors-emerald-500))",
      600: "hsl(var(--sline-colors-emerald-600))",
      700: "hsl(var(--sline-colors-emerald-700))",
      800: "hsl(var(--sline-colors-emerald-800))",
      900: "hsl(var(--sline-colors-emerald-900))",
    },
    fuchsia: {
      50: "hsl(var(--sline-colors-fuchsia-50))",
      100: "hsl(var(--sline-colors-fuchsia-100))",
      200: "hsl(var(--sline-colors-fuchsia-200))",
      300: "hsl(var(--sline-colors-fuchsia-300))",
      400: "hsl(var(--sline-colors-fuchsia-400))",
      500: "hsl(var(--sline-colors-fuchsia-500))",
      600: "hsl(var(--sline-colors-fuchsia-600))",
      700: "hsl(var(--sline-colors-fuchsia-700))",
      800: "hsl(var(--sline-colors-fuchsia-800))",
      900: "hsl(var(--sline-colors-fuchsia-900))",
    },
    indigo: {
      50: "hsl(var(--sline-colors-indigo-50))",
      100: "hsl(var(--sline-colors-indigo-100))",
      200: "hsl(var(--sline-colors-indigo-200))",
      300: "hsl(var(--sline-colors-indigo-300))",
      400: "hsl(var(--sline-colors-indigo-400))",
      500: "hsl(var(--sline-colors-indigo-500))",
      600: "hsl(var(--sline-colors-indigo-600))",
      700: "hsl(var(--sline-colors-indigo-700))",
      800: "hsl(var(--sline-colors-indigo-800))",
      900: "hsl(var(--sline-colors-indigo-900))",
    },
    skyBlue: {
      50: "hsl(var(--sline-colors-sky-blue-50))",
      100: "hsl(var(--sline-colors-sky-blue-100))",
      200: "hsl(var(--sline-colors-sky-blue-200))",
      300: "hsl(var(--sline-colors-sky-blue-300))",
      400: "hsl(var(--sline-colors-sky-blue-400))",
      500: "hsl(var(--sline-colors-sky-blue-500))",
      600: "hsl(var(--sline-colors-sky-blue-600))",
      700: "hsl(var(--sline-colors-sky-blue-700))",
      800: "hsl(var(--sline-colors-sky-blue-800))",
      900: "hsl(var(--sline-colors-sky-blue-900))",
    },
    lime: {
      50: "hsl(var(--sline-colors-lime-50))",
      100: "hsl(var(--sline-colors-lime-100))",
      200: "hsl(var(--sline-colors-lime-200))",
      300: "hsl(var(--sline-colors-lime-300))",
      400: "hsl(var(--sline-colors-lime-400))",
      500: "hsl(var(--sline-colors-lime-500))",
      600: "hsl(var(--sline-colors-lime-600))",
      700: "hsl(var(--sline-colors-lime-700))",
      800: "hsl(var(--sline-colors-lime-800))",
      900: "hsl(var(--sline-colors-lime-900))",
    },
    metal: {
      50: "hsl(var(--sline-colors-metal-50))",
      100: "hsl(var(--sline-colors-metal-100))",
      200: "hsl(var(--sline-colors-metal-200))",
      300: "hsl(var(--sline-colors-metal-300))",
      400: "hsl(var(--sline-colors-metal-400))",
      500: "hsl(var(--sline-colors-metal-500))",
      600: "hsl(var(--sline-colors-metal-600))",
      700: "hsl(var(--sline-colors-metal-700))",
      800: "hsl(var(--sline-colors-metal-800))",
      900: "hsl(var(--sline-colors-metal-900))",
    },
    orange: {
      50: "hsl(var(--sline-colors-orange-50))",
      100: "hsl(var(--sline-colors-orange-100))",
      200: "hsl(var(--sline-colors-orange-200))",
      300: "hsl(var(--sline-colors-orange-300))",
      400: "hsl(var(--sline-colors-orange-400))",
      500: "hsl(var(--sline-colors-orange-500))",
      600: "hsl(var(--sline-colors-orange-600))",
      700: "hsl(var(--sline-colors-orange-700))",
      800: "hsl(var(--sline-colors-orange-800))",
      900: "hsl(var(--sline-colors-orange-900))",
    },
    pink: {
      50: "hsl(var(--sline-colors-pink-50))",
      100: "hsl(var(--sline-colors-pink-100))",
      200: "hsl(var(--sline-colors-pink-200))",
      300: "hsl(var(--sline-colors-pink-300))",
      400: "hsl(var(--sline-colors-pink-400))",
      500: "hsl(var(--sline-colors-pink-500))",
      600: "hsl(var(--sline-colors-pink-600))",
      700: "hsl(var(--sline-colors-pink-700))",
      800: "hsl(var(--sline-colors-pink-800))",
      900: "hsl(var(--sline-colors-pink-900))",
    },
    rose: {
      50: "hsl(var(--sline-colors-rose-50))",
      100: "hsl(var(--sline-colors-rose-100))",
      200: "hsl(var(--sline-colors-rose-200))",
      300: "hsl(var(--sline-colors-rose-300))",
      400: "hsl(var(--sline-colors-rose-400))",
      500: "hsl(var(--sline-colors-rose-500))",
      600: "hsl(var(--sline-colors-rose-600))",
      700: "hsl(var(--sline-colors-rose-700))",
      800: "hsl(var(--sline-colors-rose-800))",
      900: "hsl(var(--sline-colors-rose-900))",
    },

    // Semantic colors
    base: {
      disabled: "var(--sline-base-disabled)",
      border: "var(--sline-base-border)",
      "border-alpha": "var(--sline-base-border-alpha)",
      "surface-1": "var(--sline-base-surface-1)",
      "surface-2": "var(--sline-base-surface-2)",
      "fill-1": "var(--sline-base-fill-1)",
      "fill-2": "var(--sline-base-fill-2)",
      "fill-3": "var(--sline-base-fill-3)",
      "fill-4": "var(--sline-base-fill-4)",
      "fill-5": "var(--sline-base-fill-5)",
    },

    // State colors
    state: {
      brand: {
        active: "var(--sline-state-brand-active)",
        hover: "var(--sline-state-brand-hover)",
        selected: "var(--sline-state-brand-selected)",
      },
      highlight: {
        active: "var(--sline-state-highlight-active)",
        hover: "var(--sline-state-highlight-hover)",
        selected: "var(--sline-state-highlight-selected)",
      },
      danger: {
        active: "var(--sline-state-danger-active)",
        hover: "var(--sline-state-danger-hover)",
        selected: "var(--sline-state-danger-selected)",
      },
      success: {
        active: "var(--sline-state-success-active)",
        hover: "var(--sline-state-success-hover)",
        selected: "var(--sline-state-success-selected)",
      },
    },
  },
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
