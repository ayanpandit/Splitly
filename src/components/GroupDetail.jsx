import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, IndianRupee, HandCoins } from 'lucide-react';
import Navigation from './Navigation';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [showMembers, setShowMembers] = useState(false);

  // Sample members data for each group
  const membersData = {
    1: [
      { id: 1, name: 'Ayan', nickname: 'Ayan', avatar: '/src/assets/5.jpg' },
      { id: 2, name: 'Priya Sharma', nickname: 'Priya', avatar: '/src/assets/6.jpg' },
      { id: 3, name: 'Vikram Singh', nickname: 'Vikram', avatar: '/src/assets/7.jpg' },
      { id: 4, name: 'Anika Gupta', nickname: 'Anika', avatar: '/src/assets/1.jpg' }
    ],
    2: [
      { id: 1, name: 'Rohit Kumar', nickname: 'Rohit', avatar: '/src/assets/2.jpg' },
      { id: 2, name: 'Sneha Patel', nickname: 'Sneha', avatar: '/src/assets/3.jpg' }
    ],
    3: [
      { id: 1, name: 'Arjun Reddy', nickname: 'Arjun', avatar: '/src/assets/4.jpg' },
      { id: 2, name: 'Kavya Nair', nickname: 'Kavya', avatar: '/src/assets/5.jpg' },
      { id: 3, name: 'Rahul Jain', nickname: 'Rahul', avatar: '/src/assets/6.jpg' },
      { id: 4, name: 'Pooja Singh', nickname: 'Pooja', avatar: '/src/assets/7.jpg' },
      { id: 5, name: 'Amit Gupta', nickname: 'Amit', avatar: '/src/assets/1.jpg' },
      { id: 6, name: 'Neha Sharma', nickname: 'Neha', avatar: '/src/assets/2.jpg' },
      { id: 7, name: 'Karan Mehta', nickname: 'Karan', avatar: '/src/assets/3.jpg' },
      { id: 8, name: 'Divya Agarwal', nickname: 'Divya', avatar: '/src/assets/4.jpg' }
    ],
    4: [
      { id: 1, name: 'Sachin Tendulkar', nickname: 'Sachin', avatar: '/src/assets/5.jpg' },
      { id: 2, name: 'Virat Kohli', nickname: 'Virat', avatar: '/src/assets/6.jpg' },
      { id: 3, name: 'MS Dhoni', nickname: 'MSD', avatar: '/src/assets/7.jpg' },
      { id: 4, name: 'Rohit Sharma', nickname: 'Hitman', avatar: '/src/assets/1.jpg' },
      { id: 5, name: 'KL Rahul', nickname: 'KL', avatar: '/src/assets/2.jpg' },
      { id: 6, name: 'Hardik Pandya', nickname: 'Hardik', avatar: '/src/assets/3.jpg' }
    ]
  };

  const groupMembers = membersData[groupId] || [];

  // Sample group data - in real app, you'd fetch this by groupId
  const groupData = {
    1: { name: 'Weekend Trip', members: 4, image: '/src/assets/1.jpg' },
    2: { name: 'Apartment Expenses', members: 2, image: '/src/assets/2.jpg' },
    3: { name: 'Project Team Lunch', members: 8, image: '/src/assets/3.jpg' },
    4: { name: 'Game Night', members: 6, image: '/src/assets/4.jpg' }
  };

  const group = groupData[groupId] || { name: 'Unknown Group', members: 0, image: '/src/assets/1.jpg' };

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
      description: 'View group members',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => setShowMembers(true)
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8">
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
              {group.members} Members
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
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
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

        {/* Members Modal */}
        {showMembers && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Group Members</h3>
                <button 
                  onClick={() => setShowMembers(false)}
                  className="p-1 hover:bg-gray-900 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg">
                    <img 
                      src={member.avatar} 
                      alt={member.nickname}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm" style={{display: 'none'}}>
                      {member.nickname.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{member.nickname}</h4>
                      <p className="text-gray-400 text-sm">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GroupDetail;
