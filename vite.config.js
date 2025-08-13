import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
      // Include refresh utilities in development
      include: '**/*.{js,jsx,ts,tsx}',
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  },
  server: {
    port: 3001,
    strictPort: false,
    cors: true,
    fs: {
      strict: false,
      allow: ['..']
    },
    middlewareMode: false,
    watch: {
      usePolling: true
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: []
  },
  esbuild: {
    loader: 'jsx',
    include: /\.(jsx|js)$/,
    exclude: [],
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})
