import React, { useEffect, useState } from 'react';
import { Search, Users, Plus, CheckCircle, Share2, Clock, RefreshCw, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { useAuth } from '../contexts/AuthContext';
import { createGroup, listUserGroups, joinGroupByCode, regenerateInvite, deleteGroup } from '../services/groups';

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [error, setError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [createdGroup, setCreatedGroup] = useState(null); // holds last created group for success popup
  const [showCreatedPopup, setShowCreatedPopup] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // group object for deletion confirmation
  const navigate = useNavigate();

  const loadGroups = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await listUserGroups(user.id);
      setGroups(data);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadGroups(); }, [user]);


  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = async () => {
    if (!joinCode.trim()) {
      setJoinError('Please enter a group code.');
      return;
    }
    try {
      await joinGroupByCode(joinCode.trim().toUpperCase(), user.id);
      setShowJoinModal(false);
      setJoinCode('');
      setJoinError('');
      await loadGroups();
    } catch (e) {
      setJoinError(e.message);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      setError('Group name required');
      return;
    }
    setCreating(true);
    try {
      const g = await createGroup(newGroupName.trim(), user.id);
  setCreateModal(false);
  setNewGroupName('');
  await loadGroups();
  setCreatedGroup(g);
  setShowCreatedPopup(true); // show success popup
    } catch (e) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  // Update clock every 30s for countdown
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const formatRemaining = (expiry) => {
    const diffMs = new Date(expiry).getTime() - now;
    if (diffMs <= 0) return 'Expired';
    const hrs = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    return `${hrs}h ${mins}m left`;
  };

  const buildWhatsAppLink = (g) => {
    const text = encodeURIComponent(`Join my group "${g.name}" on Splitly. Code: ${g.invite_code} (valid for 24h).`);
    return `https://wa.me/?text=${text}`;
  };

  const [regeneratingId, setRegeneratingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleRegenerate = async (e, group) => {
    e.stopPropagation();
    setRegeneratingId(group.id);
    try {
      await regenerateInvite(group.id, user.id);
      await loadGroups();
    } catch (err) {
      console.error(err);
    } finally {
      setRegeneratingId(null);
    }
  };

  const handleDeleteGroup = async (e, group) => {
    e.stopPropagation();
    setDeleteTarget(group);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await deleteGroup(deleteTarget.id, user.id);
      await loadGroups();
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
            Your Groups
          </h1>
          <div className="flex flex-col space-y-3">
            <button onClick={() => setCreateModal(true)} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors font-medium">
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
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading groups...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:bg-gray-950 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl relative"
                onClick={() => navigate(`/group/${group.id}`)}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.className += ' bg-gradient-to-br from-blue-500 to-purple-600';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-lg text-white mb-3 truncate">
                    {group.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {group.members} Member{group.members !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium">Active</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <a
                          href={buildWhatsAppLink(group)}
                          onClick={(e) => e.stopPropagation()}
                          title="Share via WhatsApp"
                          className="p-1 text-gray-500 hover:text-green-400 hover:bg-gray-800 rounded"
                          target="_blank" rel="noopener noreferrer"
                        >
                          <Share2 className="h-4 w-4" />
                        </a>
                        {group.created_by === user.id && (
                          <button
                            onClick={(e) => handleRegenerate(e, group)}
                            title="Regenerate invite code"
                            className="p-1 text-gray-500 hover:text-white hover:bg-gray-800 rounded"
                            disabled={regeneratingId === group.id}
                          >
                            <RefreshCw className={`h-4 w-4 ${regeneratingId === group.id ? 'animate-spin' : ''}`} />
                          </button>
                        )}
                        {group.created_by === user.id && (
                          <button
                            onClick={(e) => handleDeleteGroup(e, group)}
                            title="Delete group"
                            className="p-1 text-red-500 hover:text-red-400 hover:bg-gray-800 rounded"
                            disabled={deletingId === group.id}
                          >
                            <Trash2 className={`h-4 w-4 ${deletingId === group.id ? 'animate-pulse' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 break-all flex items-center space-x-2">
                      <span className="font-mono bg-gray-900 px-2 py-0.5 rounded text-white border border-gray-800">{group.invite_code}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatRemaining(group.invite_expires_at)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredGroups.length === 0 && (
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
                <button onClick={() => setCreateModal(true)} className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors font-medium">
                  <Plus className="h-5 w-5" />
                  <span>Create New Group</span>
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Create Group Modal */}
      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Create Group</h2>
            <input
              type="text"
              value={newGroupName}
              onChange={e => { setNewGroupName(e.target.value); setError(''); }}
              className="w-full px-4 py-3 mb-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter group name"
            />
            {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:bg-gray-600"
                disabled={creating}
                onClick={handleCreateGroup}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => { setCreateModal(false); setNewGroupName(''); setError(''); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Created Success Popup */}
      {showCreatedPopup && createdGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-black border border-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
            <h3 className="text-xl font-bold text-white text-center">Group Created</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Group Name</p>
                <p className="text-white font-semibold">{createdGroup.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center space-x-2">
                  <span>Invite Code (24h)</span>
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-mono bg-gray-900 px-3 py-1 rounded border border-gray-800 text-white tracking-wider">{createdGroup.invite_code}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(createdGroup.invite_code)}
                    className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
                  >Copy</button>
                </div>
              </div>
              <div className="text-xs text-gray-500">Share this code with friends. It will expire in 24 hours. You can regenerate a new one later as admin.</div>
              <div className="flex items-center space-x-2">
                <a
                  href={buildWhatsAppLink(createdGroup)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium"
                >Share on WhatsApp</a>
                <button
                  onClick={() => { setShowCreatedPopup(false); navigate(`/group/${createdGroup.id}`, { state: { groupName: createdGroup.name } }); }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
                >Open Group</button>
              </div>
              <button
                onClick={() => { setShowCreatedPopup(false); setCreatedGroup(null); }}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm"
              >Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-black border border-red-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-5">
            <h3 className="text-xl font-bold text-red-400 text-center">Delete Group</h3>
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              Are you sure you want to permanently delete <span className="text-white font-semibold">{deleteTarget.name}</span>?<br />
              This will remove all its expenses, members, and settlements. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm"
              >Cancel</button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === deleteTarget.id}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-2 rounded-lg text-sm font-medium"
              >{deletingId === deleteTarget.id ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;