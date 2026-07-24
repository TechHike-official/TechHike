import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { toggleTheme } from '../redux/generalSlice';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.general.theme);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    setShowDropdown(false);
    navigate('/auth');
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
  ];

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-slate-900/85 backdrop-blur-md shadow-xl border-b border-slate-800'
            : 'bg-white/85 backdrop-blur-md shadow-lg border-b border-gray-100'
          : isDark
          ? 'bg-slate-900 border-b border-slate-800/60'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300">
                <img src={Logo} alt="TechHike Logo" className="w-8 h-8 object-contain" />
              </div>
              <span
                className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                }`}
              >
                Tech<span className="text-blue-600">Hike</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-blue-600 bg-blue-50'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Switcher Button */}
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle Theme"
              className={`p-2.5 rounded-xl text-sm transition-all duration-200 ${
                isDark
                  ? 'text-amber-400 hover:bg-slate-800 border border-slate-700/60'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="w-4 h-4" />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                    isDark
                      ? 'bg-slate-800/80 text-slate-200 border-slate-700/80 hover:bg-slate-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : <FontAwesomeIcon icon={faUser} />}
                  </div>
                  <span>{user.name || 'Account'}</span>
                </button>

                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl py-2 z-50 border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-white border-slate-100 text-slate-700'
                    }`}
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center text-rose-500 transition-colors ${
                        isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                      }`}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all duration-200 active:scale-95"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-lg text-sm ${
                isDark ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={`md:hidden px-4 pt-2 pb-4 space-y-2 border-t ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-rose-500 hover:bg-rose-500/10 flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2.5 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
