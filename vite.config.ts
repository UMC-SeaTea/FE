import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://52.78.134.68:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});