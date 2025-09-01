import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Users, Home, X, Eye, EyeOff, Edit2 } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ayan Pandit',
    email: 'ayan.pandit@example.com',
    password: 'mypassword123'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false
  });
  const [tempData, setTempData] = useState({ ...profileData });

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/groups', label: 'Groups', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  const handleEditToggle = (field) => {
    if (editMode[field]) {
      // Save changes
      setProfileData(prev => ({
        ...prev,
        [field]: tempData[field]
      }));
    } else {
      // Start editing
      setTempData({ ...profileData });
    }
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleCancel = (field) => {
    setEditMode(prev => ({
      ...prev,
      [field]: false
    }));
    setTempData({ ...profileData });
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="/src/assets/logo.webp" 
                alt="Splitly Logo" 
                className="h-8 w-8"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM5OTBGRiIvPgo8cGF0aCBkPSJNMTYgOEwxMiAxNkwyMCAxNkwxNiA4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
                }}
              />
              <span className="text-xl font-bold text-white">Splitly</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowProfile(true)}
                className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform"
              >
                <span className="text-sm font-medium text-white">
                  {profileData.name.charAt(0).toUpperCase()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <div className="grid grid-cols-2 h-16">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom padding for mobile navigation */}
      <div className="h-16 md:hidden"></div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-800 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">Profile</h3>
              <button 
                onClick={() => setShowProfile(false)}
                className="p-1 hover:bg-gray-900 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Profile Avatar */}
              <div className="text-center">
                <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-white">
                    {profileData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white">{profileData.name}</h4>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Name</label>
                <div className="flex items-center space-x-2">
                  {editMode.name ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <div className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white">
                      {profileData.name}
                    </div>
                  )}
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditToggle('name')}
                      className={`p-2 rounded-lg transition-colors ${
                        editMode.name 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {editMode.name ? <span className="text-xs px-1">Save</span> : <Edit2 className="h-4 w-4" />}
                    </button>
                    {editMode.name && (
                      <button
                        onClick={() => handleCancel('name')}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <div className="flex items-center space-x-2">
                  {editMode.email ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white">
                      {profileData.email}
                    </div>
                  )}
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditToggle('email')}
                      className={`p-2 rounded-lg transition-colors ${
                        editMode.email 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {editMode.email ? <span className="text-xs px-1">Save</span> : <Edit2 className="h-4 w-4" />}
                    </button>
                    {editMode.email && (
                      <button
                        onClick={() => handleCancel('email')}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <div className="flex items-center space-x-2">
                  {editMode.password ? (
                    <div className="flex-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={tempData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full px-3 py-2 pr-10 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 relative">
                      <div className="px-3 py-2 pr-10 bg-gray-900 border border-gray-800 rounded-lg text-white">
                        {showPassword ? profileData.password : '•'.repeat(profileData.password.length)}
                      </div>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  )}
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditToggle('password')}
                      className={`p-2 rounded-lg transition-colors ${
                        editMode.password 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {editMode.password ? <span className="text-xs px-1">Save</span> : <Edit2 className="h-4 w-4" />}
                    </button>
                    {editMode.password && (
                      <button
                        onClick={() => handleCancel('password')}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={() => setShowProfile(false)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
