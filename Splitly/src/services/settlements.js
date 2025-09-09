import { supabase } from '../lib/supabase'

export async function listFriendSettlements(groupId, userId) {
  const { data: gmRows, error: gmErr } = await supabase
    .from('group_members')
    .select('user_id')
    .eq('group_id', groupId)
  if (gmErr) throw gmErr
  const memberIds = (gmRows || []).map(r => r.user_id)
  if (!memberIds.includes(userId)) return []
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

  const { data: expenses, error: expErr } = await supabase
    .from('expenses')
    .select('id, amount, paid_by, created_at, expense_shares(id, user_id, share_amount)')
    .eq('group_id', groupId)
    .order('created_at', { ascending: true })
  if (expErr) throw expErr

  const debtMap = {}
  function addDebt(from, to, amount) {
    if (from === to) return
    if (!debtMap[from]) debtMap[from] = {}
    debtMap[from][to] = +((debtMap[from][to] || 0) + amount)
  }
  function reduceDebt(from, to, amount) {
    // Only reduce existing debt; never create reverse debt from a settlement overpayment.
    if (!debtMap[from] || !debtMap[from][to]) return
    debtMap[from][to] -= amount
    if (debtMap[from][to] <= 0) {
      delete debtMap[from][to]
    }
  }

  expenses.forEach(e => {
    if (e.expense_shares.length === 1 && e.expense_shares[0].user_id !== e.paid_by) {
      const s = e.expense_shares[0]
      reduceDebt(e.paid_by, s.user_id, parseFloat(s.share_amount))
      return
    }
    e.expense_shares.forEach(s => {
      if (s.user_id === e.paid_by) return
      addDebt(s.user_id, e.paid_by, parseFloat(s.share_amount))
    })
  })

  const { data: settledRows, error: setErr } = await supabase
    .from('settlements')
    .select('from_user_id, to_user_id, amount')
    .eq('group_id', groupId)
  if (setErr) throw setErr
  settledRows.forEach(r => reduceDebt(r.from_user_id, r.to_user_id, parseFloat(r.amount)))

  Object.keys(debtMap).forEach(a => {
    Object.keys(debtMap[a]).forEach(b => {
      if (debtMap[b] && debtMap[b][a]) {
        if (debtMap[a][b] > debtMap[b][a]) {
          debtMap[a][b] = +(debtMap[a][b] - debtMap[b][a]).toFixed(2)
          delete debtMap[b][a]
        } else if (debtMap[b][a] > debtMap[a][b]) {
          debtMap[b][a] = +(debtMap[b][a] - debtMap[a][b]).toFixed(2)
          delete debtMap[a][b]
        } else { delete debtMap[a][b]; delete debtMap[b][a] }
      }
    })
  })

  const results = memberList.filter(m => m.id !== userId).map(m => {
    const youOwe = (debtMap[userId] && debtMap[userId][m.id]) || 0
    const theyOwe = (debtMap[m.id] && debtMap[m.id][userId]) || 0
    let type = 'settled'; let amount = 0
    if (youOwe > theyOwe) { type = 'you_owe'; amount = youOwe - theyOwe }
    else if (theyOwe > youOwe) { type = 'owes_you'; amount = theyOwe - youOwe }
    return {
      id: m.id,
      nickname: m.nickname || m.full_name || 'User',
      fullName: m.full_name || '',
      avatar: m.avatar ? `/assets/${m.avatar}` : null,
      amount: +amount.toFixed(2),
      type
    }
  }).filter(r => r.amount > 0.004 || r.type === 'settled')

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
