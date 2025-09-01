import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, IndianRupee, HandCoins, Settings } from 'lucide-react';
import Navigation from './Navigation';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  // Sample group data - in real app, you'd fetch this by groupId
  const groupData = {
    1: { name: 'Weekend Trip', members: 4, amount: 125.50, image: '/src/assets/weekend-trip.jpg' },
    2: { name: 'Apartment Expenses', members: 2, amount: 580.00, image: '/src/assets/apartment.jpg' },
    3: { name: 'Project Team Lunch', members: 8, amount: 45.75, image: '/src/assets/team-lunch.jpg' },
    4: { name: 'Game Night', members: 6, amount: 0, image: '/src/assets/game-night.jpg' }
  };

  const group = groupData[groupId] || { name: 'Unknown Group', members: 0, amount: 0, image: '' };

  const menuItems = [
    {
      icon: IndianRupee,
      title: 'Expenses',
      description: 'View and add group expenses',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate(`/group/${groupId}/expenses`)
    },
    {
      icon: HandCoins,
      title: 'Settlements',
      description: 'Settle up with group members',
      color: 'bg-teal-500 hover:bg-teal-600',
      onClick: () => navigate(`/group/${groupId}/settlements`)
    },
    {
      icon: Users,
      title: 'Members',
      description: 'Manage group members',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => {/* Add member management */}
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Group settings and preferences',
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: () => {/* Add group settings */}
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => navigate('/groups')}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {group.name}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              {group.members} Members • ₹{group.amount.toFixed(2)} Total
            </p>
          </div>
        </div>

        {/* Group Image */}
        <div className="mb-8">
          <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <img
              src={group.image}
              alt={group.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={item.onClick}
                className={`${item.color} rounded-xl p-6 text-left transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white text-opacity-80 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{group.members}</div>
              <div className="text-sm text-gray-400">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">₹{group.amount.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Total Spent</div>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-blue-400">₹{(group.amount / group.members || 0).toFixed(2)}</div>
              <div className="text-sm text-gray-400">Per Person</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupDetail;
