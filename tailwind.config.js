// tailwind.config.js
export const darkMode = 'class';
export const content = ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      amber: {
        300: '#fbbf24',
        500: '#f59e0b',
      },
      black: '#000000',
      white: '#ffffff',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    boxShadow: {
      custom: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
};
export const plugins = [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
];
