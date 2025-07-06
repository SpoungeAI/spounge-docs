import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SpoungeSystemDesign } from '@/components/spounge-system-design';
import { routes } from '@/lib/routes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/roadmap" replace />} 
        />
        {/* All routes will be handled by SpoungeSystemDesign component */}
        {routes.map(route => (
          <Route
            path={route.path}
            key={route.id}
            element={<SpoungeSystemDesign initialSection={route.id} />}
          />
        ))}
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/roadmap" replace />} />
      </Routes>
    </BrowserRouter>
  );
} 