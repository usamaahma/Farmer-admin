import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Admin pages
import AdminLandingPage from "./components/landing";
import Login from "./components/auth/login";
import FarmerSignup from "./components/auth/signup";
import FarmerDashboard from "./components/farmerlanding";

// Route Guard Components
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Navigate to="/farmer/dashboard" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <FarmerSignup />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Optional: Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
