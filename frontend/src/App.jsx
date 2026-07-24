import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLightMode } from "./redux/generalSlice";
import Home from "./pages/Home.jsx";
import Services from "./components/Services.jsx";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Authentication";
import About from "./pages/About";
import Works from "./pages/Works.jsx";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar.jsx";
import MobileNavbar from "./components/MobileNavbar";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" replace />;
};

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme) {
      localStorage.setItem('theme', 'light');
      dispatch(setLightMode());
    }
    document.documentElement.className = theme;
  }, [dispatch, theme]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-white text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Navigation Bars */}
      <div className="block md:hidden">
        <MobileNavbar />
      </div>

      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Main Page Content */}
      <div className="pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
