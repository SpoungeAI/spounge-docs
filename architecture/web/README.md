# SpoungeAI System Design Documentation

This is an interactive documentation site for the SpoungeAI system architecture, built with React, Vite, and React Router.

## Development

To run the development server:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with the production build.

## Deployment

This application is configured for deployment on various platforms:

### Netlify

The application includes the necessary configuration files for Netlify:
- `public/_redirects` - Handles SPA routing
- `public/_headers` - Sets up proper caching and security headers

### Cloudflare Pages

The application includes a `_routes.json` file for Cloudflare Pages to handle SPA routing.

### Other Static Hosting

To deploy to other static hosting providers:
1. Build the application with `npm run build`
2. Deploy the contents of the `dist` directory
3. Configure your hosting provider to redirect all requests to `index.html`

## Routing

This application uses React Router for client-side routing. All routes are defined in `lib/routes.ts`.

## Architecture

- `components/` - React components
- `lib/` - Utility functions and data
- `hooks/` - Custom React hooks
- `styles/` - Global styles
- `public/` - Static assets 