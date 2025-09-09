import React, { useEffect, useState, useCallback } from 'react';
import Navigation from './Navigation';
import { ArrowLeft, Users, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { listFriendSettlements, recordSettlement } from '../services/settlements';
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

  const refreshData = useCallback(async () => {
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
  }, [groupId, user]);

  useEffect(() => { refreshData(); }, [refreshData]);

  const [settleTarget, setSettleTarget] = useState(null); // object {id, max, type}
  const [settleAmount, setSettleAmount] = useState('');
  const [settling, setSettling] = useState(false);

  const openSettle = (s) => {
    setSettleTarget(s);
    setSettleAmount(s.amount.toFixed(2));
  };

  const submitSettlement = async () => {
    if (!settleTarget) return;
    const amt = parseFloat(settleAmount);
    if (!amt || amt <= 0) return;
    if (amt > settleTarget.amount + 0.001) return; // guard
    setSettling(true);
    try {
      // Determine direction: if you owe them, you pay them; else they owe you -> you record inbound payment
      if (settleTarget.type === 'you_owe') {
        await recordSettlement({ groupId, fromUserId: user.id, toUserId: settleTarget.id, amount: amt });
      } else {
        await recordSettlement({ groupId, fromUserId: settleTarget.id, toUserId: user.id, amount: amt });
      }
  await refreshData();
      setSettleTarget(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setSettling(false);
    }
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
          <button
            onClick={refreshData}
            className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm"
            title="Refresh"
          >Refresh</button>
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
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Top section: Avatar + Friend Info */}
                <div className="flex items-center space-x-3 flex-1">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {settlement.avatar && (
                      <img
                        src={settlement.avatar}
                        alt={settlement.nickname}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display='flex'; }}
                      />
                    )}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base" style={{display: settlement.avatar ? 'none':'flex'}}>
                      {settlement.nickname.charAt(0)}
                    </div>
                  </div>

                  {/* Friend Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg truncate">
                      {settlement.nickname}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm truncate">
                      {settlement.fullName}
                    </p>
                  </div>
                </div>

                {/* Bottom section: Amount + Button */}
                <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                  {/* Amount */}
                  <div className="text-left sm:text-right">
                    <div className={`text-base sm:text-lg md:text-xl font-bold ${
                        settlement.amount === 0
                          ? 'text-green-400'
                          : (settlement.type === 'owes_you' ? 'text-green-400' : 'text-red-400')
                      }`}>
                      {settlement.type === 'owes_you' ? '+' : '-'}₹{settlement.amount.toFixed(2)}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {settlement.type === 'owes_you' ? 'owes you' : 'you owe'}
                    </p>
                  </div>

                  {/* Settle Up Button */}
                  <button
                    onClick={() => openSettle(settlement)}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 sm:px-4 rounded-lg transition-colors font-medium text-xs sm:text-sm flex items-center space-x-1 flex-shrink-0"
                  >
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline sm:inline">Settle Up</span>
                    <span className="xs:hidden sm:hidden">Pay</span>
                  </button>
                </div>
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
      {settleTarget && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-sm space-y-5">
            <h4 className="text-lg font-semibold text-white text-center">Settle Up</h4>
            <p className="text-gray-400 text-sm text-center">
              {settleTarget.type === 'you_owe' ? 'Pay to' : 'Receive from'} <span className="text-white font-medium">{settleTarget.nickname}</span>
            </p>
            <div>
              <label className="block text-gray-500 text-xs mb-1">Amount (max ₹{settleTarget.amount.toFixed(2)})</label>
              <input
                type="number"
                value={settleAmount}
                onChange={e => setSettleAmount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white"
                min="0"
                step="0.01"
                max={settleTarget.amount.toFixed(2)}
              />
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setSettleTarget(null)} className="flex-1 bg-gray-800 hover:bg-gray-700 rounded py-2 text-sm">Cancel</button>
              <button
                disabled={settling || !settleAmount || parseFloat(settleAmount) <= 0 || parseFloat(settleAmount) > settleTarget.amount + 0.001}
                onClick={submitSettlement}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700 rounded py-2 text-sm"
              >{settling ? 'Processing...' : 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settlements;