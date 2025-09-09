import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Lock, 
  Users, 
  Star,
  PlayCircle,
  DollarSign,
  Heart,
  Zap,
  Globe,
  FileCheck,
  Clock,
  Award
} from 'lucide-react';

const MobileApp = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showInstallSteps, setShowInstallSteps] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Create download link for the APK from Google Drive
  const link = document.createElement('a');
  link.href = 'https://drive.google.com/uc?export=download&id=1uYPk14tEYCQVtxq96anJy-Yj05pHtPVz';
  link.download = 'splitly.apk';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
    setTimeout(() => {
      setIsDownloading(false);
      setShowInstallSteps(true);
    }, 2000);
  };

  const trustFactors = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Safe & Secure",
      description: "Scanned by multiple antivirus engines, digitally signed, and verified safe"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "No Malware",
      description: "Clean APK with no hidden permissions or malicious code"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Official Build",
      description: "Built directly from our source code, same as web version"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trusted by Users",
      description: "Thousands of safe downloads from our community"
    }
  ];

  const whyNotPlayStore = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Google Play Store Fees",
      description: "Google charges $25 registration + 30% of any revenue. As a free app, this doesn't make financial sense for our small team."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Review Process Delays",
      description: "Play Store reviews can take weeks. We want to deliver updates and bug fixes to you immediately."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community First",
      description: "We're an indie project built for our users, not for big tech platforms. Direct distribution keeps us independent."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Faster Updates",
      description: "No waiting for store approval. When we fix bugs or add features, you get them right away."
    }
  ];

  const installSteps = [
    "Open your phone's Settings",
    "Go to Security or Privacy settings",
    "Enable 'Install from Unknown Sources' or 'Allow from this source'",
    "Open the downloaded Splitly.apk file",
    "Tap 'Install' and follow the prompts",
    "You're all set! Open Splitly and start splitting expenses"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4">
        <a href="#/" className="inline-block bg-teal-400 text-black px-4 py-2 rounded-lg font-semibold mb-4">Home</a>
      </div>
      {/* Header */}
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

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Trust Building Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-teal-400">Why Download Direct from Us?</h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              We believe in transparency. Here's why our APK isn't on the Play Store and why that's actually better for you.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {whyNotPlayStore.map((reason, index) => (
              <div 
                key={index}
                className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800 hover:border-teal-400 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mr-4 text-black">
                    {reason.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{reason.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Trust Section */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-teal-400/10 border border-teal-400/20 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400">Your Security is Our Priority</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  We understand that downloading APKs outside of app stores can feel risky. That's why we've taken 
                  extra steps to ensure our APK is completely safe and trustworthy.
                </p>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our APK is digitally signed, regularly scanned for malware, and contains the exact same code 
                  as our web application that thousands of users trust daily.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {trustFactors.map((factor, index) => (
              <div 
                key={index}
                className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center mr-3 text-black">
                    {factor.icon}
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{factor.title}</h3>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 sm:p-8 border border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full mb-6">
              <Download className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Download Splitly APK</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Latest version 2.1.0 • 8.5 MB • Compatible with Android 6.0+
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs sm:text-sm">
              <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Virus Free
              </span>
              <span className="px-3 py-1 bg-blue-900 text-blue-400 rounded-full flex items-center">
                <Lock className="w-3 h-3 mr-1" />
                Digitally Signed
              </span>
              <span className="px-3 py-1 bg-purple-900 text-purple-400 rounded-full flex items-center">
                <Award className="w-3 h-3 mr-1" />
                Latest Version
              </span>
            </div>

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

        {/* Installation Steps */}
        {showInstallSteps && (
          <div className="mb-12 sm:mb-16 animate-fade-in">
            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400 flex items-center">
                <PlayCircle className="w-6 h-6 mr-3" />
                Installation Steps
              </h2>
              
              <div className="space-y-4">
                {installSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-1">Security Note</h4>
                    <p className="text-yellow-300 text-sm">
                      Android will warn you about installing from "Unknown Sources." This is normal! 
                      Just tap "Install Anyway" or "Continue" to proceed safely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Highlight */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-400">App Features</h2>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 text-center">
              <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mx-auto mb-4 text-black">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Native performance, instant calculations, smooth animations</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 text-center">
              <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mx-auto mb-4 text-black">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Works Offline</h3>
              <p className="text-gray-400 text-sm">View expenses and calculations even without internet</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 text-center">
              <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mx-auto mb-4 text-black">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Easy Sharing</h3>
              <p className="text-gray-400 text-sm">Share groups via WhatsApp, SMS, or any messaging app</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-400">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold mb-2">Is this APK safe to install?</h3>
              <p className="text-gray-400 text-sm">
                Absolutely! Our APK is digitally signed, regularly scanned for malware, and contains the same 
                secure code as our web app. We take security very seriously.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold mb-2">Why not just use the web version?</h3>
              <p className="text-gray-400 text-sm">
                The app offers native performance, offline viewing, better notifications, and a smoother 
                mobile experience optimized for touch interactions.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold mb-2">Will you ever publish on Play Store?</h3>
              <p className="text-gray-400 text-sm">
                Maybe in the future! Right now, we prefer direct distribution to maintain independence, 
                avoid fees, and deliver faster updates to our community.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold mb-2">How do I get updates?</h3>
              <p className="text-gray-400 text-sm">
                The app will notify you when updates are available. You can also check this page 
                periodically for the latest version.
              </p>
            </div>
          </div>
        </div>

        {/* Still Prefer Web Version */}
        <div className="text-center">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400">Prefer the Web Version?</h2>
            <p className="text-gray-400 text-base sm:text-lg mb-6">
              No problem! Our web app works perfectly on mobile browsers and offers the same great experience.
            </p>
            <button className="bg-teal-400 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-500 transition-colors">
              Launch Web App
            </button>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-500 py-8 sm:py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center text-black">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-semibold">100% Secure</span>
            </div>
            <div className="flex items-center text-black">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-semibold">5000+ Downloads</span>
            </div>
            <div className="flex items-center text-black">
              <Star className="w-5 h-5 mr-2" />
              <span className="font-semibold">Community Trusted</span>
            </div>
          </div>
          <p className="text-black/80 text-base sm:text-lg">
            Join thousands of users who trust Splitly for secure, hassle-free expense sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;