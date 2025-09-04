import { supabase } from '../lib/supabase'

export async function listFriendSettlements(groupId, userId) {
  // 1. Fetch member ids
  const { data: gmRows, error: gmErr } = await supabase
    .from('group_members')
    .select('user_id')
    .eq('group_id', groupId)
  if (gmErr) throw gmErr
  const memberIds = (gmRows || []).map(r => r.user_id)
  if (!memberIds.includes(userId)) return [] // safety
  // Fetch profiles
  const { data: profs, error: profErr } = await supabase
    .from('profiles')
    .select('id, full_name, nickname, avatar')
    .in('id', memberIds)
  if (profErr) throw profErr
  const profMap = Object.fromEntries((profs || []).map(p => [p.id, p]))
  const memberList = memberIds.map(id => ({
    id,
    full_name: profMap[id]?.full_name,
    nickname: profMap[id]?.nickname,
    avatar: profMap[id]?.avatar
  }))

  // 2. Fetch expenses with shares
  const { data: expenses, error: expErr } = await supabase
    .from('expenses')
    .select('id, amount, paid_by, expense_shares(id, user_id, share_amount)')
    .eq('group_id', groupId)
  if (expErr) throw expErr

  // 3. Compute per-user totals paid and owed (each payer also owes their share already represented in shares)
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

  // Adjust nets by settlements: from pays to => from's net increases, to's net decreases
  // We'll apply after computing net

  // 5. Build net for each member relative to current user
  // netUser = paid[user] - owed[user]
  const net = {}
  memberList.forEach(m => {
    net[m.id] = (paid[m.id] || 0) - (owed[m.id] || 0)
  })
  settlementsRows.forEach(r => {
    const amt = parseFloat(r.amount)
    net[r.from_user_id] = (net[r.from_user_id] || 0) + amt
    net[r.to_user_id] = (net[r.to_user_id] || 0) - amt
  })

  const yourNet = net[userId] || 0
  const results = memberList.filter(m => m.id !== userId).map(m => {
    const otherNet = net[m.id] || 0
    let type = 'settled'
    let amount = 0
    if (yourNet > 0 && otherNet < 0) {
      amount = Math.min(yourNet, -otherNet)
      type = 'owes_you'
    } else if (yourNet < 0 && otherNet > 0) {
      amount = Math.min(-yourNet, otherNet)
      type = 'you_owe'
    }
    return {
      id: m.id,
      nickname: m.nickname || m.full_name || 'User',
      fullName: m.full_name || '',
      avatar: m.avatar ? `/assets/${m.avatar}` : null,
      amount: +amount.toFixed(2),
      type
    }
  })
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
