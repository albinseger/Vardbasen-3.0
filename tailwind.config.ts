import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vardbasen: {
          DEFAULT: '#709b8c',
          dark: '#3e443f',
          light: '#8ab0a3',
        },
      },
    },
  },
  plugins: [],
}
export default config 