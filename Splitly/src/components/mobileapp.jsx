import React, { useState } from 'react';
import { Smartphone, Download, Instagram } from 'lucide-react';
import logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';

const MobileApp = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1uYPk14tEYCQVtxq96anJy-Yj05pHtPVz';
    link.download = 'splitly.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Download Splitly App Section */}
      <div className="bg-gradient-to-r from-black to-gray-900 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full mb-6">
            <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Download <span className="text-teal-400">Splitly</span> App
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Get the native Android experience with our secure, feature-rich mobile app
          </p>
        </div>
      </div>
      {/* Download Splitly APK Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 sm:p-8 border border-gray-800 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full mb-6">
            <Download className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Download Splitly APK</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md mx-auto">
            Latest version 1.1.0 • 59.0 MB • Compatible with Android 6.0+
          </p>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-teal-400 text-black px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-teal-500 transition-colors flex items-center justify-center space-x-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Splitly.apk</span>
              </>
            )}
          </button>
          <p className="text-gray-500 text-xs mt-4">
            By downloading, you agree to our Terms of Service and Privacy Policy
          </p>
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
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link to="/mobile-app" className="text-gray-400 hover:text-white transition-colors">Mobile App</Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <a
              href="https://www.instagram.com/ayanpandit_31/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-400 rounded flex items-center justify-center hover:bg-teal-500 transition-colors"
              title="Instagram"
            >
              <Instagram className="text-gray-900" size={22} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileApp;
