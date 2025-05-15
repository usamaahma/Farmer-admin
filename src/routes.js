import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Admin pages
import AdminLandingPage from "./components/landing";
import AdminPortal from "./components/landing";
import Login from "./components/auth/login";
import FarmerSignup from "./components/auth/signup";
import FarmerDashboard from "./components/farmerlanding";

// Not Found Page
// import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/dashboard" element={<AdminLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<FarmerSignup />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        {/* Catch-all route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
