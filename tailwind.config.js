/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lime': {
          200: '#f0f7f0',
          600: '#65c465',
          800: '#4fb24f',
          900: '#3d963d',
        },
        'amber': {
          200: '#fff7e0',
          600: '#ffd94f',
          800: '#ffc61a',
          900: '#e6ad00',
        },
        'sky': {
          200: '#e3f8ff',
          600: '#5fc1e0',
          800: '#38a1cc',
          900: '#1c7bbf',
        },
        'red': {
          200: '#fde8e8',
          600: '#f56565',
          800: '#e53e3e',
          900: '#c53030',
        },
        'emerald': {
          200: '#e3fcec',
          600: '#2ecc71',
          800: '#27ae60',
          900: '#219653',
        },
        'rose': {
          200: '#fdf2f2',
          600: '#f66d9b',
          800: '#eb5286',
          900: '#d71868',
        },
        'orange': {
          200: '#fff3e0',
          600: '#ff9f43',
          800: '#f57c00',
          900: '#d25600',
        },
        'blue': {
          200: '#ebf8ff',
          600: '#3498db',
          800: '#2779bd',
          900: '#1c6ea4',
        },
      },
    },
  },
  plugins: [],
}
