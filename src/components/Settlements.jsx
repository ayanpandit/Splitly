import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { ArrowLeft, Users, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { listFriendSettlements } from '../services/settlements';
import { getGroup } from '../services/groups';
import { useAuth } from '../contexts/AuthContext';

const Settlements = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!groupId || !user) return;
      setLoading(true);
      try {
        const [g, s] = await Promise.all([
          getGroup(groupId),
          listFriendSettlements(groupId, user.id)
        ]);
        setGroup(g);
        setSettlements(s);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [groupId, user]);

  const handleSettleUp = (friendId) => {
    // For now just remove locally; future: record settlement
    setSettlements(prev => prev.filter(s => s.id !== friendId));
  };

  const totalYouOwe = settlements
    .filter(s => s.type === 'you_owe')
    .reduce((sum, s) => sum + s.amount, 0);

  const totalOwedToYou = settlements
    .filter(s => s.type === 'owes_you')
    .reduce((sum, s) => sum + s.amount, 0);

  // Calculate net amount (positive = you get money, negative = you owe money)
  const netAmount = totalOwedToYou - totalYouOwe;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8">
        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-6 sm:mb-8">
          <button 
            onClick={() => navigate(`/group/${groupId}`)}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Settlements
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              {group ? group.name : 'Loading...'} • {settlements.length} People
            </p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 text-center">
            <h3 className="text-sm text-gray-500 mb-2">Net Settlement</h3>
            <div className="space-y-1">
              <p className={`text-3xl sm:text-4xl font-bold ${
                netAmount >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {netAmount >= 0 ? '+' : ''}₹{Math.abs(netAmount).toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">
                {netAmount >= 0 
                  ? 'You will receive' 
                  : 'You need to pay'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Settlements List */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Friend Settlements
          </h2>

          {loading && <div className="text-center text-gray-500 py-8">Loading...</div>}
          {error && <div className="text-center text-red-400 py-4">{error}</div>}
          {!loading && settlements.map((settlement) => (
            <div
              key={settlement.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {settlement.avatar && (
                    <img
                      src={settlement.avatar}
                      alt={settlement.nickname}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display='flex'; }}
                    />
                  )}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold" style={{display: settlement.avatar ? 'none':'flex'}}>
                    {settlement.nickname.charAt(0)}
                  </div>
                </div>

                {/* Friend Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-base sm:text-lg">
                    {settlement.nickname}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {settlement.fullName}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg sm:text-xl font-bold ${
                    settlement.type === 'owes_you' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {settlement.type === 'owes_you' ? '+' : '-'}₹{settlement.amount.toFixed(2)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {settlement.type === 'owes_you' ? 'owes you' : 'you owe'}
                  </p>
                </div>

                {/* Settle Up Button */}
                <button
                  onClick={() => handleSettleUp(settlement.id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base flex items-center space-x-1 sm:space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Settle Up</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
          {!loading && settlements.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 mx-auto mb-4 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                All Settled Up!
              </h3>
              <p className="text-gray-500 mb-6">
                Great! You're all caught up with your group expenses.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settlements;