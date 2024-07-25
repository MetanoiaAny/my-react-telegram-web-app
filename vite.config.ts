import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), ],
  build: {
    target: 'es2020', // you can also use 'es2020' here
    outDir: './docs'

  },
  base: './',

})
