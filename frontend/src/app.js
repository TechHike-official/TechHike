// App.js
import React, { useEffect } from "react";
import { BrowserRouter  as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLightMode } from "./redux/generalSlice";
import Home from "./pages/Home";
import Contact from "./components/contact";
import Navbar from "./components/navbar";
import MobileNavbar from "./components/MobileNavbar"; // Import the new component
import Services from "./components/service";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/Authentication";
import About from "./pages/About";
import RequestManagement from "./pages/RequestManagement";
import Work from "./pages/works";
import MaintenancePage from "./pages/MaintenancePage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("Please log in to use this service.");
      navigate('/auth');
    }
  }, [token, navigate]);

  return token ? children : <Navigate to="/auth" replace />;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme);

  useEffect(() => {
    if (user) {
      console.log("Logged-in user name from Redux in App.js:", user.name);
    } else {
      console.log("No user logged in (App.js)");
    }
  }, [user]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (!storedTheme) {
      localStorage.setItem('theme', 'light');
      dispatch(setLightMode());
    }
    document.documentElement.className = theme;
  }, [dispatch, theme]);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      {/* Mobile Navbar */}
      <MobileNavbar />

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Content */}
      <div className="md:mt-0 mt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<MaintenancePage />} />
          <Route path="*" element={<MaintenancePage />} />
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