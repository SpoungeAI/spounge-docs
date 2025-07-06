import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSWC(),
    // Remove the SPA fallback plugin for now - it might be interfering
    // {
    //   name: 'spa-fallback',
    //   configureServer(server) {
    //     server.middlewares.use((req, res, next) => {
    //       // Skip for static assets requests
    //       if (req.url?.match(/\.(js|css|ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)) {
    //         return next();
    //       }
          
    //       // Skip for API routes or other non-HTML requests
    //       if (req.url?.startsWith('/api') || req.url?.startsWith('/@')) {
    //         return next();
    //       }
          
    //       try {
    //         const indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'text/html');
    //         res.end(indexHtml);
    //       } catch (error) {
    //         // If index.html doesn't exist, let the default handler take over
    //         next();
    //       }
    //     });
    //   }
    // }
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
    open: true, // Auto-open browser
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})