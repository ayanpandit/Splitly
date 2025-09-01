import React, { useState } from 'react';
import { Search, Users, DollarSign, Plus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Sample groups data based on your design
  const groups = [
    {
      id: 1,
      name: 'Weekend Trip',
      members: 4,
      amount: 125.50,
      image: '/src/assets/weekend-trip.jpg',
      status: 'active'
    },
    {
      id: 2,
      name: 'Apartment Expenses',
      members: 2,
      amount: 580.00,
      image: '/src/assets/apartment.jpg',
      status: 'active'
    },
    {
      id: 3,
      name: 'Project Team Lunch',
      members: 8,
      amount: 45.75,
      image: '/src/assets/team-lunch.jpg',
      status: 'active'
    },
    {
      id: 4,
      name: 'Game Night',
      members: 6,
      amount: 0,
      image: '/src/assets/game-night.jpg',
      status: 'settled'
    }
  ];


  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = () => {
    if (!joinCode.trim()) {
      setJoinError("Please enter a group code.");
      return;
    }
    // Simulate join logic
    setShowJoinModal(false);
    setJoinCode("");
    setJoinError("");
    // You can add actual join logic here
    alert(`Joined group with code: ${joinCode}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
            Your Groups
          </h1>
          <div className="flex flex-col space-y-3">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors font-medium">
              <Plus className="h-5 w-5" />
              <span>Create New Group</span>
            </button>
            <button
              className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg transition-colors font-medium"
              onClick={() => setShowJoinModal(true)}
            >
              <Users className="h-5 w-5" />
              <span>Join a Group</span>
            </button>
          </div>
        </div>

        {/* Join Group Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-black border border-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-auto">
              <h2 className="text-xl font-bold text-white mb-4 text-center">Join a Group</h2>
              <input
                type="text"
                value={joinCode}
                onChange={e => { setJoinCode(e.target.value); setJoinError(""); }}
                className="w-full px-4 py-3 mb-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter group code"
              />
              {joinError && <div className="text-red-400 text-sm mb-2">{joinError}</div>}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium"
                  onClick={handleJoinGroup}
                >
                  Join
                </button>
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium"
                  onClick={() => { setShowJoinModal(false); setJoinCode(""); setJoinError(""); }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search your groups..."
          />
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:bg-gray-950 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate(`/group/${group.id}`)}
            >
              {/* Group Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient background if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.className += ' bg-gradient-to-br from-blue-500 to-purple-600';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              {/* Group Info */}
              <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-lg text-white mb-3 truncate">
                  {group.name}
                </h3>

                <div className="space-y-2">
                  {/* Members */}
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {group.members} Member{group.members !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Amount or Status */}
                  <div className="flex items-center space-x-2">
                    {group.status === 'settled' ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400 font-medium">
                          Settled Up
                        </span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400 font-medium">
                          ${group.amount.toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {searchTerm ? 'No groups found' : 'No groups yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Create your first group to start splitting expenses with friends'
                }
              </p>
              {!searchTerm && (
                <button className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors font-medium">
                  <Plus className="h-5 w-5" />
                  <span>Create New Group</span>
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Groups;