import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, Shield, Smartphone, Heart, Code } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
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
            About <span className="text-teal-400">Splitly</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Making expense sharing simple, fun, and hassle-free for friends everywhere
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Mission Statement */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full mb-6">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">Our Mission</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Splitly was born from the simple idea that sharing expenses with friends shouldn't be complicated or stressful. 
            We believe in making financial interactions transparent, fair, and friendly - because money matters shouldn't affect friendships.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-400">What Makes Splitly Special</h2>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800 hover:border-teal-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mr-4">
                  <Smartphone className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Mobile-First Design</h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Built specifically for mobile users with lightning-fast performance. No need to download another app - 
                access Splitly directly from your browser on any device.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800 hover:border-teal-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Playful Experience</h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Each user gets a unique cartoon-style avatar and nickname, making expense sharing fun and personal. 
                We believe managing money should be enjoyable, not boring.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800 hover:border-teal-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Instant Calculations</h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Our smart algorithm automatically calculates who owes what and suggests the most efficient way to settle up. 
                No more manual calculations or confusion.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-800 hover:border-teal-400 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Privacy Focused</h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Your financial data is encrypted and secure. We only collect what's necessary to provide our service 
                and never share your information with third parties.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-teal-400">How It Works</h2>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                1
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Create or Join a Group</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Start a new group for your next trip, dinner, or shared expense, or join an existing group with a unique invite code.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                2
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Add Expenses</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Quickly add expenses as they happen. Choose who paid, who benefits, and let Splitly handle the math.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal-400 text-black rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                3
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Settle Up</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  See exactly who owes what and get smart settlement suggestions. Share group details via WhatsApp with one tap.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full mb-6">
            <Code className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-400">Built with Modern Technology</h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Splitly is powered by React with Vite for blazing-fast performance, Supabase for reliable backend services, 
            and hosted on Render for 99.9% uptime. We use the latest web technologies to ensure a smooth, 
            responsive experience across all devices.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Render'].map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-900 text-teal-400 rounded-lg border border-gray-800 text-sm sm:text-base"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-teal-400 to-teal-500 py-8 sm:py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">Ready to Split Smarter?</h2>
          <p className="text-black/80 text-base sm:text-lg mb-6">
            Join thousands of users who've made expense sharing effortless with Splitly.
          </p>
          <button className="bg-black text-teal-400 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-900 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;