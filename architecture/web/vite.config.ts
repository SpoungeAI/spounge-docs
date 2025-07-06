import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react-swc'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSWC(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.includes('.')) {
            // Skip for files with extensions (assets)
            next()
          } else {
            // For all other requests, serve index.html
            req.url = '/'
            next()
          }
        })
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      '@/components': path.resolve(__dirname, './components'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/styles': path.resolve(__dirname, './styles')
    }
  },
  base: '/',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}) 