/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        colors: {
          "dark-gray": "#374151", // Dark gray custom color
       "dark-teal": "#0D9488", // Custom dark teal
        }
      },

      // ✅ WOW Color Palette (More Vibrant)
      colors: {
        "primary": "#F8FAFC", // Light background
        "accent": "#1A73E8", // Vibrant Blue
        "dark": "#1F2937", // Dark Gray for contrast
        "secondary": "#34D399", // Fresh Green for CTA
        "warning": "#F87171", // Red for alerts
        "highlight": "#FBBF24", // Orange for highlights
        "muted": "#E5E7EB", // Muted gray
      },

      // ✅ Box Shadows (More Depth)
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'soft': '0 4px 15px rgba(0, 0, 0, 0.05)',
      },

      // ✅ Background Images & Gradients
      backgroundImage: {
        'landing-gradient': 'linear-gradient(to right, #1A73E8, #34D399)',
        'dark-gradient': 'linear-gradient(to bottom, #1F2937, #374151)',
      },

      // ✅ Grid Templates for Sections
      gridTemplateColumns: {
        'hero': '1fr 1fr',
        'hero-three': '1fr 1fr 1fr',
      },

      // ✅ Smooth Transitions & Animations
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        }
      },

      screens: {
        "wide": "1440px",
      }
    },
  },
  plugins: [],
}
