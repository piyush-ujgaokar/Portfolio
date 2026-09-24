/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User requested palette: #F5F2EA, #FFFFFF, #8C8A82, #E8E5DC, #6E6E6A, #1E1E1C
        paper: "#F5F2EA",       // Primary warm canvas background
        pureWhite: "#FFFFFF",   // Crisp card & panel surface
        borderWarm: "#E8E5DC",  // Hairline architectural borders
        stoneMuted: "#8C8A82",  // Secondary metadata & captions
        stoneDark: "#6E6E6A",   // Body text & descriptions
        carbon: "#1E1E1C",      // Primary bold text & deep solid buttons

        // Compatibility aliases
        background: "#F5F2EA",
        surface: "#FFFFFF",
        surfaceLight: "#FAF8F5",
        surfaceBorder: "#E8E5DC",
        textMain: "#1E1E1C",
        textMuted: "#6E6E6A",
        accentViolet: "#1E1E1C",
        accentCyan: "#3D3D38",
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 30, 28, 0.04)',
        'card': '0 8px 30px rgba(30, 30, 28, 0.05)',
        'card-hover': '0 20px 40px -10px rgba(30, 30, 28, 0.10)',
        'pill': '0 2px 8px rgba(30, 30, 28, 0.04)',
        'elevated': '0 20px 40px -10px rgba(30, 30, 28, 0.12)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
