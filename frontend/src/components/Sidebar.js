import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, Settings, Inbox, Moon, Sun, LifeBuoy } from 'lucide-react'; // Added LifeBuoy
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toggleTheme } from '../redux/generalSlice'; // Import toggleTheme action (adjust path)

const Sidebar = ({ navigate }) => {
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.general.theme); // Get theme from Redux
  const dispatch = useDispatch();

  // Define navItems array
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '' },
    { name: 'Request', icon: <Inbox className="w-5 h-5" />, path: 'request' },
    { name: 'Projects', icon: <FileText className="w-5 h-5" />, path: 'projects' },

    { name: 'Clients', icon: <Users className="w-5 h-5" />, path: 'clients' },
    { name: 'Assistance', icon: <LifeBuoy className="w-5 h-5" />, path: 'assistance' }, // Changed to LifeBuoy
    // { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: 'settings' },,
    
  ];

  // Filter navItems to exclude 'Clients' if user.role is 'client'
  const filteredNavItems = navItems.filter(item => 
    user.role === 'client' ? item.name !== 'Clients' : true
  );

  // Toggle theme function
  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch Redux action to toggle theme
  };

  // Sync local state with Redux theme on mount
  useEffect(() => {
    document.documentElement.className = theme; // Apply theme globally
  }, [theme]);

  return (
    <motion.aside 
      className={`w-64 ${theme === 'dark' ? 'bg-gray-900 border-r-2 border-gray-800' : 'bg-white border-r-2 '} shadow-sm hidden md:block transition-colors duration-300`}
      initial={{ x: -10 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 40 }}
    >
      <div className="p-4 flex flex-col mt-16">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-8 px-4`}>Dashboard</h1>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {filteredNavItems.map((item) => (
              <li key={item.name} className="cursor-pointer">
                <div 
                  onClick={() => navigate(`/dashboard/${item.path}`)} 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Theme toggle button */}
        <div className="mt-8 px-4">
          <button 
            onClick={handleToggleTheme}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            <span className="flex items-center">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
        
        {/* User info section */}
        <div className={`mt-8 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex items-center px-4 py-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-medium">{user.name || 'User'}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.role || 'Role'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;