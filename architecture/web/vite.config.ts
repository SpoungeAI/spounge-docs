import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react-swc'
import path from 'node:path'
import fs from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSWC(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            // Skip for static assets requests
            if (req.url?.match(/\.(js|css|ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)) {
              return next();
            }
            
            const indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(indexHtml);
          });
        };
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
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}) 