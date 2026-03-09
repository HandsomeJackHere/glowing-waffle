module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.08)'
      },
      boxShadow: {
        'glass': '0 10px 30px rgba(2,6,23,0.6), 0 2px 6px rgba(124,92,255,0.08)'
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' }
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
