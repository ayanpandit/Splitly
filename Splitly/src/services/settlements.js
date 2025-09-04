import { supabase } from '../lib/supabase'

export async function listFriendSettlements(groupId, userId) {
  // Compute pair-wise net using balances
  // Fetch expenses & shares to compute owed graph (simplified client-side approach)
  const { data: expenses, error: expErr } = await supabase
    .from('expenses')
    .select('id, amount, paid_by, group_id, expense_shares(id, user_id, share_amount)')
    .eq('group_id', groupId)
  if (expErr) throw expErr

  const map = {} // key payer->user
  expenses.forEach(e => {
    e.expense_shares.forEach(s => {
      const share = parseFloat(s.share_amount)
      if (s.user_id === e.paid_by) return // they paid own share implicitly
      const key = `${e.paid_by}|${s.user_id}`
      map[key] = (map[key] || 0) + share
    })
  })

  // Collapse inverse pairs to net direction
  const net = {}
  Object.entries(map).forEach(([key, amt]) => {
    const [payer, borrower] = key.split('|')
    const inverseKey = `${borrower}|${payer}`
    if (map[inverseKey]) {
      if (amt > map[inverseKey]) {
        net[`${payer}|${borrower}`] = amt - map[inverseKey]
      } else if (map[inverseKey] > amt) {
        net[`${borrower}|${payer}`] = map[inverseKey] - amt
      }
      delete map[inverseKey]
    } else {
      net[key] = amt
    }
  })

  // Retrieve profiles for related users
  const userIds = Array.from(new Set(Object.keys(net).flatMap(k => k.split('|'))))
  if (userIds.length === 0) return []
  const { data: profiles, error: profErr } = await supabase
    .from('profiles')
    .select('id, full_name, nickname, avatar')
    .in('id', userIds)
  if (profErr) throw profErr
  const profMap = Object.fromEntries(profiles.map(p => [p.id, p]))

  // Build settlement-like summary relative to current user
  const settlements = []
  Object.entries(net).forEach(([key, amt]) => {
    const [from, to] = key.split('|')
    // from owes to
    if (from === userId || to === userId) {
      const otherId = from === userId ? to : from
      const type = from === userId ? 'you_owe' : 'owes_you'
      const p = profMap[otherId]
      settlements.push({
        id: otherId,
        nickname: p.nickname || p.full_name,
        fullName: p.full_name,
        avatar: p.avatar ? `/src/assets/${p.avatar}` : null,
        amount: amt,
        type
      })
    }
  })
  return settlements
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
