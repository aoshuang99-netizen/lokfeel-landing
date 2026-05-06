/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // LokFeel Brand Colors
        lokfeel: {
          rose: {
            DEFAULT: "#f43f5e",
            light: "#fb7185",
            dark: "#e11d48",
            50: "#fff1f2",
            100: "#ffe4e6",
            200: "#fecdd3",
            300: "#fda4af",
            400: "#fb7185",
            500: "#f43f5e",
            600: "#e11d48",
            700: "#be123c",
            800: "#9f1239",
            900: "#881337",
          },
          purple: {
            DEFAULT: "#9333ea",
            light: "#a855f7",
            dark: "#7e22ce",
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7e22ce",
            800: "#6b21a8",
            900: "#581c87",
          },
          amber: {
            DEFAULT: "#f59e0b",
            light: "#fbbf24",
            dark: "#d97706",
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
            900: "#78350f",
          },
          deep: {
            DEFAULT: "#0d0c11",
            light: "#1a1925",
            dark: "#050508",
          },
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          light: "hsl(var(--rose-light))",
          dark: "hsl(var(--rose-dark))",
        },
        warm: "hsl(var(--warm))",
        surface: {
          light: "hsl(var(--surface-light))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        brand: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'glow-rose': "0 0 40px -12px hsl(var(--rose) / 0.4)",
        'glow-lokfeel': "0 0 40px -12px rgba(244, 63, 94, 0.4)",
        'glow-purple': "0 0 40px -12px rgba(147, 51, 234, 0.4)",
        'heartbeat': "0 0 20px -5px rgba(244, 63, 94, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // LokFeel Brand Animations
        "gentle-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        "heartbeat-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.1)", opacity: "0.3" },
          "100%": { transform: "scale(1.2)", opacity: "0" },
        },
        "heartbeat-glow": {
          "0%, 100%": { boxShadow: "0 0 20px -5px rgba(244, 63, 94, 0.3)" },
          "50%": { boxShadow: "0 0 30px -5px rgba(244, 63, 94, 0.5)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.1) translate(0%, 0%)" },
          "50%": { transform: "scale(1.2) translate(-2%, -1%)" },
          "100%": { transform: "scale(1.1) translate(0%, 0%)" },
        },
        "ken-burns-reverse": {
          "0%": { transform: "scale(1.2) translate(-2%, -1%)" },
          "50%": { transform: "scale(1.1) translate(0%, 0%)" },
          "100%": { transform: "scale(1.2) translate(-2%, -1%)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -10px)" },
          "50%": { transform: "translate(-5px, -20px)" },
          "75%": { transform: "translate(-15px, -5px)" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "card-float-1": {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-15px) rotate(0deg)" },
        },
        "card-float-2": {
          "0%, 100%": { transform: "translateY(0) rotate(2deg)" },
          "50%": { transform: "translateY(-12px) rotate(0deg)" },
        },
        "card-float-3": {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-18px) rotate(1deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        // LokFeel Brand Animations
        "gentle-pulse": "gentle-pulse 2s ease-in-out infinite",
        "heartbeat-ring": "heartbeat-ring 2s ease-out infinite",
        "heartbeat-glow": "heartbeat-glow 2s ease-in-out infinite",
        "sparkle": "sparkle 3s ease-in-out infinite",
        "ken-burns": "ken-burns 20s ease-in-out infinite",
        "ken-burns-reverse": "ken-burns-reverse 25s ease-in-out infinite",
        "drift": "drift 15s ease-in-out infinite",
        "scroll-left": "scroll-left 40s linear infinite",
        "scroll-right": "scroll-right 45s linear infinite",
        "card-1": "card-float-1 6s ease-in-out infinite",
        "card-2": "card-float-2 7s ease-in-out infinite",
        "card-3": "card-float-3 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
