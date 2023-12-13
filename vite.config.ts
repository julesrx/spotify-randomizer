import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [react(), icons({ compiler: 'jsx', jsx: 'react' })],
  resolve: {
    alias: {
      '~': '/src',
      components: '/src/components',
      routes: '/src/routes',
    },
  },
});
