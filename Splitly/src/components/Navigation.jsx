import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Users, Home, X, Eye, EyeOff, Edit2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, updatePassword } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Show appropriate nav items based on auth status
  const navItems = user ? [
    { path: '/', label: 'Home', icon: Home },
    { path: '/groups', label: 'Groups', icon: Users },
  ] : [];

  const isActive = (path) => location.pathname === path;

  const handlePasswordUpdate = async () => {
    if (!newPassword) {
      setPasswordError('Password is required');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsUpdating(true);
    const result = await updatePassword(newPassword);
    
    if (result.error) {
      setPasswordError(result.error.message);
    } else {
      setEditMode(false);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      alert('Password updated successfully!');
    }
    
    setIsUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowProfile(false);
    navigate('/');
  };

  const resetPasswordForm = () => {
    setEditMode(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
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
                src="/assets/logo.webp" 
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
              {user ? (
                <>
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <Bell className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setShowProfile(true)}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform relative overflow-hidden"
                  >
                    {user.user_metadata?.avatar ? (
                      <img 
                        src={`/assets/${user.user_metadata.avatar}`} 
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span className="text-sm font-medium text-white">
                      {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {user && (
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
      )}

      {/* Bottom padding for mobile navigation */}
      {user && <div className="h-16 md:hidden"></div>}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Profile Modal */}
      {showProfile && user && (
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
                <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-3 relative overflow-hidden">
                  {user.user_metadata?.avatar && (
                    <img 
                      src={`/assets/${user.user_metadata.avatar}`} 
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <div className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white">
                  {user.email}
                </div>
              </div>

              {/* Nickname Field (Read-only) */}
              {user.user_metadata?.nickname && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Nickname</label>
                  <div className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-blue-400">
                    @{user.user_metadata.nickname}
                  </div>
                </div>
              )}

              {/* Password Field (Editable) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                {editMode ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError('');
                        }}
                        className="w-full px-3 py-2 pr-10 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError('');
                      }}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm new password"
                    />
                    {passwordError && (
                      <p className="text-red-400 text-sm">{passwordError}</p>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={handlePasswordUpdate}
                        disabled={isUpdating}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                      >
                        {isUpdating ? 'Updating...' : 'Update'}
                      </button>
                      <button
                        onClick={resetPasswordForm}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white">
                      ••••••••
                    </div>
                    <button
                      onClick={() => setEditMode(true)}
                      className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-400"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setShowProfile(false)}
                  className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
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
