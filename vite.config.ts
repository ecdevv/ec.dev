import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing third-party deps into their own chunks so
        // they get cached across deploys. Updates to your code don't bust
        // these.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Lookahead anchors prevent `react-github-calendar` etc. from
            // accidentally landing in react-vendor.
            if (/[\\/]node_modules[\\/](\.pnpm[\\/])?(?:react|react-dom|react-router|react-router-dom|scheduler)(?=[\\/@]|$)/.test(id)) {
              return 'react-vendor'
            }
            if (/[\\/]node_modules[\\/](\.pnpm[\\/])?(?:framer-motion|motion-dom|motion-utils)(?=[\\/@]|$)/.test(id)) {
              return 'motion-vendor'
            }
          }
        },
      },
    },
  },
})
