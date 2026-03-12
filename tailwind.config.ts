import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f8f6f1',
        ink: '#1e1d1b',
        muted: '#756f66',
        line: '#d8d2c8'
      }
    }
  },
  plugins: []
};

export default config;
