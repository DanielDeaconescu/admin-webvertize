// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './Login';
import Dashboard from './Dashboard';

export default function App() {
  // Simple auth flag stored in memory (can replace with cookies later)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        />

        {/* Dashboard Page (protected route) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* Default: redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
