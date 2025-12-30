import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    __webpack_public_path__: '""',
  },
  server: {
    host: true,
    port: 3000,
  },
})
