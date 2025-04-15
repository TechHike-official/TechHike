import React, { useState } from 'react';
import { Bell, Lock, User, Save } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-gray-50 mt-16 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-64 bg-white rounded-lg shadow p-4">
            <nav>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`flex items-center w-full text-left px-4 py-3 rounded-md mb-2 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <User size={18} className="mr-3" />
                <span className="font-medium">Profile</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('password')} 
                className={`flex items-center w-full text-left px-4 py-3 rounded-md mb-2 ${activeTab === 'password' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Lock size={18} className="mr-3" />
                <span className="font-medium">Password</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')} 
                className={`flex items-center w-full text-left px-4 py-3 rounded-md ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Bell size={18} className="mr-3" />
                <span className="font-medium">Notifications</span>
              </button>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                      placeholder="John Doe" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Password Settings */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Lock size={18} className="mr-2" />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Receive alerts even when you're not online</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={notifications} 
                        onChange={() => setNotifications(!notifications)} 
                      />
                      <div className={`w-12 h-6 rounded-full transition ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
                        <div className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${notifications ? 'translate-x-6' : 'translate-x-1'} translate-y-0.5`}></div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="w-12 h-6 bg-blue-600 rounded-full">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform translate-x-6 translate-y-0.5"></div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive text messages for urgent updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-12 h-6 bg-gray-300 rounded-full">
                        <div className="bg-white w-5 h-5 rounded-full shadow transform translate-x-1 translate-y-0.5"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 