// components/MobileNavbar.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer, setDrawerOpen, toggleTheme } from "../redux/generalSlice";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, isDrawerOpen } = useSelector((state) => state.general);
  const isLoggedIn = !!localStorage.getItem("token");

  // Toggle drawer state
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  // Toggle theme
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Close drawer when navigating
  const handleNavigation = (path) => {
    dispatch(setDrawerOpen(false));
    navigate(path);
  };

  // Navigation items
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/works", label: "Works" },
    ...(isLoggedIn ? [{ path: "/dashboard", label: "Dashboard" }] : []),
    ...(isLoggedIn
      ? [{
          path: "/logout",
          label: "Logout",
          onClick: () => {
            localStorage.removeItem("token");
            dispatch(setDrawerOpen(false));
            navigate("/login");
          }
        }]
      : [{ path: "/auth", label: "Login" }]),
  ];

  // Animation variants for theme toggle button
  const buttonVariants = {
    light: { rotate: 0, scale: 1 },
    dark: { rotate: 180, scale: 1.1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="md:hidden">
      {/* Mobile Navbar Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 p-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex group relative">
            <img src={Logo} alt="logo" className="w-10" />
            <h1
              className={`text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600 ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}
            >
              Tech Hike
            </h1>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <button onClick={handleDrawerToggle} className="focus:outline-none">
            {isLoggedIn ? (
              <svg
                className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 w-64 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } transform md:hidden`}
        initial={{ x: -256 }}
        animate={{ x: isDrawerOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Header with Close Button and Theme Toggle */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className={`${theme === "dark" ? "text-white" : "text-black"} text-xl font-bold`}>
              Tech Hike
            </Link>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={handleThemeToggle}
                className="focus:outline-none"
                variants={buttonVariants}
                initial={theme === "light" ? "light" : "dark"}
                animate={theme === "light" ? "light" : "dark"}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? (
                  <svg className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
              {/* Close Button with Theme-based Color */}
              <button onClick={handleDrawerToggle} className="focus:outline-none">
                <svg
                  className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 flex-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => item.onClick ? item.onClick() : handleNavigation(item.path)}
                className={`text-left ${theme === "dark" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"} 
                  text-lg font-medium transition-colors duration-200`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleDrawerToggle}
        />
      )}
    </div>
  );
};

export default MobileNavbar;