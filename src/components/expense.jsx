import React, { useState } from 'react';
import { ArrowLeft, Plus, Bell, Users, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

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

  // Sample group data - in real app, you'd fetch this by groupId
  const groupData = {
    1: { name: 'Weekend Trip', members: 4 },
    2: { name: 'Apartment Expenses', members: 2 },
    3: { name: 'Project Team Lunch', members: 8 },
    4: { name: 'Game Night', members: 6 }
  };

  const group = groupData[groupId] || { name: 'Unknown Group', members: 0 };

  // Sample members data for each group
  const membersData = {
    1: [
      { id: 1, name: 'Ayan', avatar: '/src/assets/5.jpg' },
      { id: 2, name: 'Priya', avatar: '/src/assets/6.jpg' },
      { id: 3, name: 'Vikram', avatar: '/src/assets/7.jpg' },
      { id: 4, name: 'Anika', avatar: '/src/assets/1.jpg' }
    ],
    2: [
      { id: 1, name: 'Rohit', avatar: '/src/assets/2.jpg' },
      { id: 2, name: 'Sneha', avatar: '/src/assets/3.jpg' }
    ],
    3: [
      { id: 1, name: 'Arjun', avatar: '/src/assets/4.jpg' },
      { id: 2, name: 'Kavya', avatar: '/src/assets/5.jpg' },
      { id: 3, name: 'Rahul', avatar: '/src/assets/6.jpg' },
      { id: 4, name: 'Pooja', avatar: '/src/assets/7.jpg' },
      { id: 5, name: 'Amit', avatar: '/src/assets/1.jpg' },
      { id: 6, name: 'Neha', avatar: '/src/assets/2.jpg' },
      { id: 7, name: 'Karan', avatar: '/src/assets/3.jpg' },
      { id: 8, name: 'Divya', avatar: '/src/assets/4.jpg' }
    ],
    4: [
      { id: 1, name: 'Sachin', avatar: '/src/assets/5.jpg' },
      { id: 2, name: 'Virat', avatar: '/src/assets/6.jpg' },
      { id: 3, name: 'MSD', avatar: '/src/assets/7.jpg' },
      { id: 4, name: 'Hitman', avatar: '/src/assets/1.jpg' },
      { id: 5, name: 'KL', avatar: '/src/assets/2.jpg' },
      { id: 6, name: 'Hardik', avatar: '/src/assets/3.jpg' }
    ]
  };

  const members = membersData[groupId] || [];

  // Sample expenses data specific to each group
  const expensesData = {
    1: [
      {
        id: 1,
        description: 'Beach resort accommodation',
        amount: 2000,
        paidBy: 'Ayan',
        splitAcross: 4,
        avatar: '/src/assets/5.jpg',
        dateTime: '2024-12-15T14:30:00'
      },
      {
        id: 2,
        description: 'Seafood dinner',
        amount: 1200,
        paidBy: 'Priya',
        splitAcross: 4,
        avatar: '/src/assets/6.jpg',
        dateTime: '2024-12-15T20:45:00'
      }
    ],
    2: [
      {
        id: 1,
        description: 'Monthly rent',
        amount: 15000,
        paidBy: 'Rohit',
        splitAcross: 2,
        avatar: '/src/assets/2.jpg',
        dateTime: '2024-12-01T10:00:00'
      }
    ],
    3: [
      {
        id: 1,
        description: 'Team lunch buffet',
        amount: 2400,
        paidBy: 'Arjun',
        splitAcross: 8,
        avatar: '/src/assets/4.jpg',
        dateTime: '2024-12-16T13:00:00'
      }
    ],
    4: [
      {
        id: 1,
        description: 'Board games purchase',
        amount: 800,
        paidBy: 'Sachin',
        splitAcross: 6,
        avatar: '/src/assets/5.jpg',
        dateTime: '2024-12-14T18:00:00'
      }
    ]
  };

  const expenses = expensesData[groupId] || [];

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const memberCount = group.members;

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
    setSelectedMembers(members.map(m => m.id)); // Default: all members selected
  };

  const toggleMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmitExpense = () => {
    // Here you would handle the expense submission
    console.log('New expense:', newExpense, 'Selected members:', selectedMembers);
    setShowAddExpense(false);
    setNewExpense({ description: '', amount: '', splitAcross: 'all' });
    setSelectedMembers(members.map(m => m.id));
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {group.name}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Total Spent: ₹{totalSpent.toLocaleString()} • {memberCount} Members
            </p>
          </div>
          <button 
            onClick={handleAddExpense}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Add Expense</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Expenses Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Expenses
          </h2>

          {/* Expenses List */}
          <div className="space-y-3 sm:space-y-4">
            {expenses.map((expense) => {
              const { dateStr, timeStr } = formatDateTime(expense.dateTime);
              return (
                <div
                  key={expense.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-5 hover:bg-gray-950 transition-all duration-300 cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Description */}
                    <p className="text-white text-base sm:text-lg font-medium">
                      {expense.description}
                    </p>
                    
                    {/* Amount */}
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">
                      ₹{expense.amount.toLocaleString()}
                    </div>
                    
                    {/* Split Info */}
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Users className="h-4 w-4" />
                      <span>Split across {expense.splitAcross} members</span>
                    </div>
                    
                    {/* Paid By and Date/Time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={expense.avatar} 
                          alt={expense.paidBy}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                          <span className="text-sm font-medium text-white">
                            {expense.paidBy.charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          Paid by <span className="text-white font-medium">{expense.paidBy}</span>
                        </span>
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
                    {members.map((member) => (
                      <label key={member.id} className="flex items-center p-2 hover:bg-gray-900 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMember(member.id)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex items-center space-x-2">
                          <img 
                            src={members.find(m => m.id === member.id)?.avatar} 
                            alt={member.name}
                            className="w-6 h-6 rounded-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                            <span className="text-xs font-medium text-white">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-white">{member.name}</span>
                        </div>
                      </label>
                    ))}
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
                  Add Expense
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