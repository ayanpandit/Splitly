import { supabase } from '../lib/supabase'

export async function listFriendSettlements(groupId, userId) {
  // 1. Fetch all group members
  const { data: members, error: memErr } = await supabase
    .from('group_members')
    .select('user_id, profiles:profiles(id, full_name, nickname, avatar)')
    .eq('group_id,', groupId)
  if (memErr) throw memErr

  // Fallback if above join style fails (RLS or join syntax), fetch members then profiles separately
  let memberList = []
  if (!members) {
    const { data: rawMembers, error: rawErr } = await supabase
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId)
    if (rawErr) throw rawErr
    const ids = rawMembers.map(r => r.user_id)
    const { data: profs, error: profErr } = await supabase
      .from('profiles')
      .select('id, full_name, nickname, avatar')
      .in('id', ids)
    if (profErr) throw profErr
    const profMap = Object.fromEntries(profs.map(p => [p.id, p]))
    memberList = ids.map(id => ({ id, ...profMap[id] }))
  } else {
    memberList = members.map(m => ({
      id: m.user_id,
      full_name: m.profiles?.full_name,
      nickname: m.profiles?.nickname,
      avatar: m.profiles?.avatar
    }))
  }

  // 2. Fetch expenses with shares
  const { data: expenses, error: expErr } = await supabase
    .from('expenses')
    .select('id, amount, paid_by, expense_shares(id, user_id, share_amount)')
    .eq('group_id', groupId)
  if (expErr) throw expErr

  // 3. Compute per-user totals paid and owed
  const paid = {}
  const owed = {}
  expenses.forEach(e => {
    paid[e.paid_by] = (paid[e.paid_by] || 0) + parseFloat(e.amount)
    e.expense_shares.forEach(s => {
      owed[s.user_id] = (owed[s.user_id] || 0) + parseFloat(s.share_amount)
    })
  })

  // 4. Apply recorded settlements (reduce net owed between two users)
  const { data: settlementsRows, error: setErr } = await supabase
    .from('settlements')
    .select('from_user_id, to_user_id, amount')
    .eq('group_id', groupId)
  if (setErr) throw setErr

  // We'll adjust paid & owed using settlements: when from pays to, treat it as from paid extra and to owed extra (net reducing from's debt or increasing credit)
  settlementsRows.forEach(r => {
    paid[r.from_user_id] = (paid[r.from_user_id] || 0) + parseFloat(r.amount)
    owed[r.to_user_id] = (owed[r.to_user_id] || 0) + parseFloat(r.amount)
  })

  // 5. Build net for each member relative to current user
  // netUser = paid[user] - owed[user]
  const net = {}
  memberList.forEach(m => {
    net[m.id] = (paid[m.id] || 0) - (owed[m.id] || 0)
  })

  // Current user's net used as baseline; we want pairwise obligations: if net[other] > net[current] they have fronted more -> you owe them share difference proportionally.
  // Simpler approach for UI: show amount other owes you if their net < 0 and yours > 0 proportionally isn't trivial; Instead compute direct diff: diff = net[other] - net[userId].
  // If diff > 0 => other is more positive (you owe them) ; diff < 0 => they owe you.
  const yourNet = net[userId] || 0
  const results = memberList.filter(m => m.id !== userId).map(m => {
    const diff = net[m.id] - yourNet
    const type = diff > 0 ? 'you_owe' : (diff < 0 ? 'owes_you' : 'settled')
    const amount = Math.abs(diff)
    return {
      id: m.id,
      nickname: m.nickname || m.full_name || 'User',
      fullName: m.full_name || '',
      avatar: m.avatar ? `/assets/${m.avatar}` : null,
      amount: +amount.toFixed(2),
      type
    }
  }).filter(r => r.amount > 0.01) // remove near-zero noise

  return results
}

export async function recordSettlement({ groupId, fromUserId, toUserId, amount }) {
  const { data, error } = await supabase
    .from('settlements')
    .insert({ group_id: groupId, from_user_id: fromUserId, to_user_id: toUserId, amount })
    .select()
    .single()
  if (error) throw error
  return data
}
