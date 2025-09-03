import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, IndianRupee, HandCoins } from 'lucide-react';
import Navigation from './Navigation';
import { getGroup, getGroupMembers } from '../services/groups';
import { useAuth } from '../contexts/AuthContext';

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [showMembers, setShowMembers] = useState(false);
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (!groupId || !user) return;
      setLoading(true);
      try {
        const g = await getGroup(groupId);
        setGroup(g); // show header even if members fetch fails
        try {
          const mem = await getGroupMembers(groupId);
          setMembers(mem);
        } catch (memberErr) {
          console.error('Failed to load members', memberErr);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [groupId, user]);

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
            {group ? (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{group.name}</h1>
                <p className="text-gray-400 text-sm sm:text-base mt-1">{members.length} Member{members.length !== 1 ? 's' : ''}</p>
              </>
            ) : (
              <div className="animate-pulse">
                <div className="h-7 w-40 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-800 rounded"></div>
              </div>
            )}
          </div>
        </div>

        {/* Group Image */}
        <div className="mb-8">
          {group && (
            <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <img
                src={`/src/assets/${group.image}`}
                alt={group.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
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
                {loading && <div className="text-gray-500 text-center py-8">Loading...</div>}
                {error && <div className="text-red-400 text-center py-4">{error}</div>}
                {!loading && members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg">
                    {member.avatar && (
                      <img
                        src={member.avatar}
                        alt={member.nickname}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                    )}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm" style={{display: member.avatar ? 'none':'flex'}}>
                      {(member.nickname || member.full_name || 'U').charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{member.nickname || member.full_name}</h4>
                      <p className="text-gray-400 text-sm">{member.full_name}</p>
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
