import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice'; // Ensure path matches your structure
import { toggleTheme } from '../redux/generalSlice'; // Import toggleTheme action
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.user); // Get user from Redux
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Logged-in user name from Redux in Navbar:', user.name);
    } else {
      console.log('No user logged in (Navbar)');
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    navigate('/auth');
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Toggle theme using Redux action (syncs to localStorage in slice)
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    ...(user
      ? [
          {
            path: '#',
            label: `Welcome, ${user.name}`,
            isWelcome: true,
          },
          { path: '/dashboard', label: 'Dashboard' },
        ]
      : [{ path: '/auth', label: 'Login', isLogin: true }]),
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'light'
            ? 'bg-white/90 shadow-lg'
            : 'bg-gray-900/90 shadow-lg'
          : theme === 'light'
          ? 'bg-white border-b-2'
          : 'bg-gray-900  border-b-2 border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
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
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isWelcome ? (
                <div key="welcome" className="flex items-center space-x-4">
                  <span
                    className={`cursor-pointer ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                    onClick={() => setShowLogout(!showLogout)}
                  >
                    {item.label}
                  </span>
                  {showLogout && (
                    <button
                      onClick={handleLogout}
                      className={`${
                        theme === 'light' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'
                      } px-3 py-2 transition-all duration-300 flex items-center`}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Logout
                    </button>
                  )}
                </div>
              ) : item.isLogin ? (
                <Link
                  key="auth"
                  to="/auth"
                  className={`${
                    theme === 'light' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'
                  } px-3 py-2 transition-all duration-300 flex items-center`}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Login
                </Link>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 transition-all duration-300
                    ${
                      location.pathname === item.path
                        ? 'text-blue-600'
                        : theme === 'light'
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-gray-300 hover:text-blue-400'
                    }
                    before:content-[''] before:absolute before:bottom-0 before:left-0
                    before:w-0 before:h-0.5 before:bg-blue-600
                    before:transition-all before:duration-300
                    hover:before:w-full`}
                >
                  {item.label}
                </Link>
              )
            )}
            {/* Theme Toggle Button (Desktop) */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-full ${
                theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'
              } transition-all duration-300`}
            >
              <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} size="lg" />
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle Button (Mobile, before hamburger) */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-full ${
                theme === 'light' ? 'text-gray-700 hover:bg-gray-200' : 'text-gray-300 hover:bg-gray-700'
              } transition-all duration-300`}
            >
              <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} size="lg" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                theme === 'light' ? 'text-gray-700 hover:bg-blue-50' : 'text-gray-300 hover:bg-gray-700'
              } transition-colors duration-300`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-inner ${
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          }`}
        >
          {navItems.map((item) =>
            item.isWelcome ? (
              <div key="welcome" className="flex justify-between items-center px-3 py-2">
                <span
                  className={`cursor-pointer ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
                  onClick={() => setShowLogout(!showLogout)}
                >
                  {item.label}
                </span>
                {showLogout && (
                  <button
                    onClick={handleLogout}
                    className={`${
                      theme === 'light' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'
                    } transition-colors duration-300 flex items-center`}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                )}
              </div>
            ) : item.isLogin ? (
              <Link
                key="login"
                to="/auth"
                className={`block px-3 py-2 rounded-md transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                } flex items-center`}
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md transition-colors duration-300
                  ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : theme === 'light'
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
