import React from 'react';
import heroImage from '../assets/hero.webp';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                Split expenses, <span className="text-teal-400">not friendships.</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                The simplest way to track and group expenses and settle them
                with friends, family and roommates.
              </p>
              <button 
                className="bg-teal-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-300 transition-colors"
                onClick={() => navigate('/groups')}
              >
                Get Started
              </button>
            </div>

            {/* Right Column - Hero Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-3xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Splitly App Illustration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Why you'll love Splitly
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Simple features that make splitting expenses a breeze
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">No Registration</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Start splitting expenses immediately. No lengthy signup process or email verification needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Smart Splitting</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Automatically calculate how much each person owes with intelligent split calculations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Real-time Balances</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Keep track of who owes what in real-time. Always know your current balance with the group.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-800 rounded"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Fair Settlements</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Settle up fairly with optimized payment suggestions that minimize transactions needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                See Splitly in action
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Get Splitly for everyone to track expenses and settle balances.
                Download from the App Store or play it in your browser now.
              </p>
              <button className="bg-teal-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-300 transition-colors">
                Try Splitly for Free
              </button>
            </div>

            {/* Right Column - App Screenshot */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* App Header */}
                <div className="bg-gray-50 p-3 sm:p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-teal-400 rounded"></div>
                      <span className="text-gray-900 font-semibold text-sm sm:text-base">Splitly</span>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-300 rounded"></div>
                  </div>
                </div>

                {/* App Content */}
                <div className="p-3 sm:p-4 bg-white h-full">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Expense Items */}
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="w-16 h-3 sm:w-20 sm:h-4 bg-gray-300 rounded"></div>
                            <div className="w-12 h-2 sm:w-14 sm:h-3 bg-gray-200 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="w-8 h-3 sm:w-10 sm:h-4 bg-teal-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Splitly Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
              <span className="text-lg sm:text-xl font-semibold">Splitly</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Apps</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            </div>
            
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-400 rounded flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm sm:text-base">?</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;