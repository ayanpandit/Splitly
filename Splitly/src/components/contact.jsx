import React, { useState, useRef } from 'react';
import { sendContactEmail } from '../services/emailService';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageSquare, Bug, Lightbulb, Send, MapPin, Clock, Phone } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSending(true);

    try {
  await sendContactEmail(formData);

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      setError('Sorry, there was a problem sending your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const contactReasons = [
    // Business Inquiries removed
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="text-teal-400">Us</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We're here to help! Get in touch with our friendly support team
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Contact Reasons */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-400">How Can We Help?</h2>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactReasons.map((reason, index) => (
              <div 
                key={index}
                className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-teal-400 transition-colors text-center"
              >
                <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mx-auto mb-4 text-black">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-teal-400 focus:outline-none text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-teal-400 focus:outline-none text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-teal-400 focus:outline-none text-white"
                  >
                    {/* Removed General Support, Bug Report, and Feature Request options */}
                    <option value="business">Business Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-teal-400 focus:outline-none text-white placeholder-gray-400"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-teal-400 focus:outline-none text-white placeholder-gray-400 resize-none"
                    placeholder="Please provide as much detail as possible..."
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-teal-400 text-black py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-teal-500 transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSending ? 'Sending…' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Contact */}
            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-gray-400 text-sm">aayanpandey8528@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Response Time</h4>
                    <p className="text-gray-400 text-sm">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-400 text-sm">Online Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-teal-400">Common Questions</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2">How do I create a group?</h4>
                  <p className="text-gray-400 text-sm">Simply tap "Create Group" on the main screen and share the invite code with friends.</p>
                </div>

                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2">Is my data secure?</h4>
                  <p className="text-gray-400 text-sm">Yes! All data is encrypted and we never share your information with third parties.</p>
                </div>

                <div className="p-4 bg-black rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-2">Can I use Splitly offline?</h4>
                  <p className="text-gray-400 text-sm">You need an internet connection to sync data, but basic viewing works offline.</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl p-6 sm:p-8 text-black">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Follow Our Updates</h3>
              <p className="mb-6 opacity-80">Stay updated with new features and improvements</p>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://twitter.com/ayanpandit_31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-teal-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >Twitter</a>
                <a
                  href="https://www.linkedin.com/in/ayan-pandey-b66067296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-teal-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >LinkedIn</a>
                <a
                  href="https://www.instagram.com/ayanpandit_31/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-teal-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >Instagram</a>
                <a
                  href="https://github.com/ayanpandit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-teal-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;