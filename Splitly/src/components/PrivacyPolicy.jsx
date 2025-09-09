import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle, Calendar, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Account Information: Email address, chosen nickname, and avatar selection for account creation and identification",
        "Group Data: Group names, expense details, payment records, and settlement calculations you create or participate in",
        "Usage Data: App interaction patterns, feature usage statistics, and performance metrics to improve our service",
        "Device Information: Browser type, device type, and basic technical information for compatibility and security"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Service Delivery: Process expenses, calculate settlements, and maintain group synchronization across devices",
        "Communication: Send important account updates, security notifications, and respond to support requests",
        "Improvement: Analyze usage patterns to enhance features, fix bugs, and develop new functionality",
        "Security: Monitor for suspicious activity, prevent fraud, and maintain the integrity of our platform"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        "Within Groups: Expense data and user nicknames are shared with other group members as part of the core functionality",
        "Service Providers: We work with trusted partners (Supabase, Render) who help us operate and improve Splitly",
        "Legal Requirements: We may disclose information if required by law or to protect our rights and user safety",
        "No Selling: We never sell, rent, or trade your personal information to third parties for marketing purposes"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "Encryption: All data is encrypted in transit using industry-standard SSL/TLS protocols",
        "Secure Storage: Your information is stored on secure servers with restricted access and regular security updates",
        "Authentication: We use secure authentication methods to protect your account from unauthorized access",
        "Regular Audits: Our security practices are regularly reviewed and updated to maintain the highest standards"
      ]
    }
  ];

  const quickFacts = [
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Last Updated",
      value: "September 6, 2025"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Data Retention",
      value: "As long as your account is active"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Contact",
      value: "aayanpandey8528@gmail.com"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          className="mb-8 px-4 py-2 bg-teal-400 text-black rounded-lg font-semibold hover:bg-teal-300"
          onClick={() => navigate('/')}
        >Home</button>
      </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full mb-6">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="text-teal-400">Policy</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Quick Facts */}
        <div className="mb-12 sm:mb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {quickFacts.map((fact, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 text-center">
                <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center mx-auto mb-3 text-black">
                  {fact.icon}
                </div>
                <h3 className="font-semibold mb-1 text-sm sm:text-base">{fact.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-2">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
  </div>

        {/* Main Sections */}
        <div className="space-y-8 sm:space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mr-4 text-black">
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-teal-400">{section.title}</h2>
              </div>
              
              <div className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400 flex items-center">
              <UserCheck className="w-6 h-6 mr-3" />
              Your Rights and Choices
            </h2>
            
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">Access and Control</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base">View and download your personal data at any time</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base">Update your account information and preferences</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base">Delete your account and associated data</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Communication Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base">Opt out of non-essential communications</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base">Choose how you receive notifications</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-300 text-sm sm:text-base">Request corrections to your information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400 flex items-center">
              <Database className="w-6 h-6 mr-3" />
              Data Retention and Deletion
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We retain your personal information only as long as necessary to provide our services and fulfill 
                the purposes outlined in this privacy policy. Here's what happens to your data:
              </p>
              
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-teal-400">Active Accounts</h4>
                  <p className="text-gray-400 text-sm">Data is retained while your account is active and for 30 days after deactivation</p>
                </div>
                
                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-teal-400">Deleted Accounts</h4>
                  <p className="text-gray-400 text-sm">All personal data is permanently deleted within 90 days of account deletion</p>
                </div>
                
                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-teal-400">Group Data</h4>
                  <p className="text-gray-400 text-sm">Expense records are kept for active groups but anonymized after you leave</p>
                </div>
                
                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2 text-teal-400">Legal Requirements</h4>
                  <p className="text-gray-400 text-sm">Some data may be retained longer if required by law or for dispute resolution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cookies and Tracking */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Cookies and Tracking</h2>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              We use minimal tracking to ensure Splitly works properly and to improve your experience. 
              We believe in privacy by design and only collect what's absolutely necessary.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">Essential Cookies:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">Required for login, security, and core app functionality</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">Analytics:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">Anonymous usage statistics to help us improve the app</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">No Third-Party Tracking:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">We don't use advertising trackers or sell data to marketers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Children's Privacy</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Splitly is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child has 
              provided us with personal information, please contact us immediately so we can remove it.
            </p>
          </div>
        </div>

        {/* International Users */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">International Users</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Splitly is available worldwide and we're committed to complying with applicable privacy laws 
              in all jurisdictions where we operate.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base"><strong>GDPR (EU):</strong> We comply with European data protection regulations</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base"><strong>CCPA (California):</strong> California residents have additional privacy rights</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base"><strong>Global Standards:</strong> We apply high privacy standards everywhere</p>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Third-Party Services</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Splitly integrates with trusted third-party services to provide you with the best possible experience. 
              Here are the services we use and how they handle your data:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Supabase (Database)</h4>
                <p className="text-gray-400 text-sm mb-2">Hosts and manages our secure database infrastructure</p>
                <p className="text-gray-500 text-xs">Data encrypted at rest and in transit</p>
              </div>
              
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Render (Hosting)</h4>
                <p className="text-gray-400 text-sm mb-2">Provides secure cloud hosting for the Splitly application</p>
                <p className="text-gray-500 text-xs">SOC 2 Type II compliant infrastructure</p>
              </div>
              
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">WhatsApp Integration</h4>
                <p className="text-gray-400 text-sm mb-2">Used only for sharing group invite links</p>
                <p className="text-gray-500 text-xs">No data shared with WhatsApp/Meta</p>
              </div>
              
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Email Service</h4>
                <p className="text-gray-400 text-sm mb-2">For sending important account notifications</p>
                <p className="text-gray-500 text-xs">Minimal data sharing, encrypted transmission</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Basis for Processing */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Legal Basis for Processing</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Under applicable data protection laws, we process your personal information based on the following legal grounds:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">Contract Performance:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">
                    Processing necessary to provide Splitly services and fulfill our agreement with you
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">Legitimate Interest:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">
                    Improving our services, security monitoring, and customer support
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">Consent:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">
                    For optional features like marketing communications (you can withdraw anytime)
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <span className="font-semibold">Legal Obligation:</span>
                  <span className="text-gray-400 text-sm sm:text-base ml-2">
                    When required by law, such as tax records or legal compliance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Transfers */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">International Data Transfers</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Your data may be processed and stored in countries other than your own. We ensure appropriate 
              safeguards are in place for all international data transfers:
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Standard Contractual Clauses for EU data transfers</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Adequate protection measures in all processing locations</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Regular security assessments of all data processing partners</p>
              </div>
            </div>
          </div>
        </div>

        {/* India Privacy Rights */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">India Privacy Rights</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              If you are an Indian resident, you have rights under the Information Technology Act and related privacy rules:
            </p>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Right to Access</h4>
                <p className="text-gray-400 text-sm">Request details about personal information we collect, use, and share</p>
              </div>
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Right to Correction</h4>
                <p className="text-gray-400 text-sm">Request corrections to your personal information</p>
              </div>
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Right to Deletion</h4>
                <p className="text-gray-400 text-sm">Request deletion of your personal information (subject to legal requirements)</p>
              </div>
              <div className="p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="font-semibold mb-2 text-teal-400">Right to Grievance Redressal</h4>
                <p className="text-gray-400 text-sm">Contact our Data Protection Officer for privacy concerns or complaints</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-teal-400/10 border border-teal-400/20 rounded-lg">
              <p className="text-teal-400 text-sm">
                <strong>To exercise these rights:</strong> Contact us at aayanpandey8528@gmail.com with "India Privacy Request" in the subject line. We'll respond within 30 days.
              </p>
            </div>
          </div>
        </div>

        {/* Automated Decision Making */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Automated Decision Making</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Splitly uses automated systems for certain functions, but we don't make significant decisions 
              about you without human oversight:
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Expense calculations and settlement suggestions are automated</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Basic security monitoring uses automated systems</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">No profiling or automated decisions that significantly affect you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates to Policy */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Changes to This Policy</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices or 
              applicable laws. When we do, we will:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Post the updated policy on our website</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Update the "Last Updated" date at the top</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-gray-300 text-sm sm:text-base">Notify you of significant changes via email or app notification</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Your continued use of Splitly after any changes indicates your acceptance of the updated privacy policy.
            </p>
          </div>
        </div>

        {/* Effective Date and Version */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-black rounded-xl p-6 sm:p-8 border border-gray-800 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-400">Policy Information</h2>
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Effective Date</p>
                <p className="font-semibold">September 6, 2025</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Version</p>
                <p className="font-semibold">2.1</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Next Review</p>
                <p className="font-semibold">March 2026</p>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              This privacy policy governs your use of Splitly and supersedes all previous versions.
              By using Splitly, you agree to the collection and use of information in accordance with this policy.
            </div>
          </div>
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-500 py-8 sm:py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">Questions About Your Privacy?</h2>
          <p className="text-black/80 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            We're here to help. Contact our privacy team if you have any questions, concerns, 
            or requests regarding your personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-teal-400 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-900 transition-colors">
              Contact Privacy Team
            </button>
            <button className="border-2 border-black text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-black hover:text-teal-400 transition-colors">
              Download Your Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;