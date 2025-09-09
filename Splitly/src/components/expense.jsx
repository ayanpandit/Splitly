import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Plus, Users, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { useAuth } from '../contexts/AuthContext';
import { getGroupMembers, getGroup } from '../services/groups';
import { listExpenses, addExpense, deleteExpense } from '../services/expenses';

const Expenses = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    splitAcross: 'all'
  });
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const refreshData = useCallback(async () => {
    if (!groupId || !user) return;
    setLoading(true);
    try {
      const [g, mem, exp] = await Promise.all([
        getGroup(groupId),
        getGroupMembers(groupId),
        listExpenses(groupId)
      ]);
      setGroup(g);
      setMembers(mem);
      setExpenses(exp);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [groupId, user]);

  useEffect(() => { refreshData(); }, [refreshData]);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const memberCount = members.length;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const dateStr = date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    return { dateStr, timeStr };
  };

  const handleAddExpense = () => {
    setShowAddExpense(true);
    setSelectedMembers(members.map(m => m.id)); // default all
  };

  const toggleMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmitExpense = async () => {
    if (!newExpense.description || !newExpense.amount || selectedMembers.length === 0) return;
    setSaving(true);
    try {
      await addExpense({
        groupId,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        payerId: user.id,
        participantIds: selectedMembers
      });
      const exp = await listExpenses(groupId);
      setExpenses(exp);
      setShowAddExpense(false);
      setNewExpense({ description: '', amount: '', splitAcross: 'all' });
      setSelectedMembers(members.map(m => m.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => {
    setShowAddExpense(false);
    setNewExpense({ description: '', amount: '', splitAcross: 'all' });
    setSelectedMembers(members.map(m => m.id));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8">
        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-6 sm:mb-8">
          <button 
            onClick={() => groupId ? navigate(`/group/${groupId}`) : navigate('/groups')}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{group ? group.name : 'Loading...'}</h1>
            {group && (
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Total Spent: ₹{totalSpent.toLocaleString()} • {memberCount} Member{memberCount!==1?'s':''}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshData}
              className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm"
              title="Refresh"
            >Refresh</button>
            <button 
              onClick={handleAddExpense}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Add Expense</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Expenses Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Expenses
          </h2>

          {/* Expenses List */}
          <div className="space-y-3 sm:space-y-4">
            {loading && <div className="text-center text-gray-500 py-8">Loading...</div>}
            {error && <div className="text-center text-red-400 py-4">{error}</div>}
            {!loading && expenses.map((expense) => {
              const { dateStr, timeStr } = formatDateTime(expense.created_at);
              const currentUserIsAdmin = members.some(m => m.id === user?.id && m.role === 'admin');
              const canDelete = currentUserIsAdmin || expense.paid_by === user?.id;
              return (
                <div key={expense.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 hover:bg-gray-950 transition-all duration-300 relative">
                  {canDelete && (
                    <button
                      onClick={async () => {
                        try { await deleteExpense(expense.id); await refreshData(); } catch(e) { setError(e.message); }
                      }}
                      className="absolute top-2 right-2 text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                    >Del</button>
                  )}
                  <div className="space-y-3">
                    <p className="text-white text-base sm:text-lg font-medium">{expense.description}</p>
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">₹{expense.amount.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Users className="h-4 w-4" />
                      <span>Split equally</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {expense.avatar && (
                          <img
                            src={expense.avatar}
                            alt={expense.payer_name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                          />
                        )}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center" style={{display: expense.avatar ? 'none':'flex'}}>
                          <span className="text-sm font-medium text-white">{expense.payer_name.charAt(0)}</span>
                        </div>
                        <span className="text-gray-400 text-sm">Paid by <span className="text-white font-medium">{expense.payer_name}</span></span>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        <div>{dateStr}</div>
                        <div>{timeStr}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {expenses.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="h-16 w-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No expenses yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start tracking your group expenses by adding your first expense
                </p>
                <button 
                  onClick={handleAddExpense}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add First Expense</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Add New Expense</h3>
                <button 
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-900 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Description Input */}
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter expense description..."
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Split Options */}
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Split Across
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="splitOption"
                      value="all"
                      checked={newExpense.splitAcross === 'all'}
                      onChange={(e) => {
                        setNewExpense(prev => ({ ...prev, splitAcross: e.target.value }));
                        setSelectedMembers(members.map(m => m.id));
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-white">All members ({memberCount})</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="splitOption"
                      value="custom"
                      checked={newExpense.splitAcross === 'custom'}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, splitAcross: e.target.value }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-white">Select members</span>
                  </label>
                </div>
              </div>

              {/* Member Selection (when custom is selected) */}
              {newExpense.splitAcross === 'custom' && (
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm font-medium mb-3">
                    Select Members
                  </label>
                  <div className="space-y-2">
                    {members.map((member) => {
                      const displayName = member.nickname || member.full_name || 'User';
                      return (
                        <label key={member.id} className="flex items-center p-2 hover:bg-gray-900 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => toggleMember(member.id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3 flex items-center space-x-2">
                            {member.avatar && (
                              <img
                                src={member.avatar}
                                alt={displayName}
                                className="w-6 h-6 rounded-full object-cover"
                                onError={(e) => { e.target.style.display='none'; e.target.nextElementSibling.style.display='flex'; }}
                              />
                            )}
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center" style={{display: member.avatar ? 'none':'flex'}}>
                              <span className="text-xs font-medium text-white">
                                {displayName.charAt(0)}
                              </span>
                            </div>
                            <span className="text-white">{displayName}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {selectedMembers.length > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      Selected: {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-400 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitExpense}
                  disabled={!newExpense.description || !newExpense.amount || selectedMembers.length === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {saving ? 'Saving...' : 'Add Expense'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Expenses; 