import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f7f8',
          100: '#efeff1',
          900: '#0e0e10'
        }
      }
    }
  },
  plugins: []
} satisfies Config;