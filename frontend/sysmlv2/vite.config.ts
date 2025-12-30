import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To include only specific polyfills
      include: ['path', 'stream', 'fs', 'url'],
      // To polyfill specific globals like Buffer, global, process
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  resolve : {
    alias: {
      "source-map-js": "source-map",
    },
  },
  define: {
    global: 'globalThis',
    __webpack_public_path__: '""',
  },
  server: {
    host: true,
    port: 3000,
  },
})
