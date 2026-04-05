import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  build:
    mode === 'lib'
      ? {
          copyPublicDir: false,
          emptyOutDir: true,
          lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
          },
          sourcemap: true,
        }
      : {
          outDir: 'dist-showcase',
        },
}))
