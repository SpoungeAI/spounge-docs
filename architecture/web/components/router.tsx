import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SpoungeSystemDesign } from '@/components/spounge-system-design';
import { routes } from '@/lib/routes';
import { useEffect } from 'react';

// ScrollToTop component to handle scrolling to top when routes change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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