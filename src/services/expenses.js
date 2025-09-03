import { supabase } from '../lib/supabase'

export async function listExpenses(groupId) {
  const { data, error } = await supabase
    .from('expenses')
    .select('id, description, amount, paid_by, created_at, profiles:profiles!expenses_paid_by_fkey(id, full_name, nickname, avatar)')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(e => ({
    id: e.id,
    description: e.description,
    amount: parseFloat(e.amount),
    paid_by: e.paid_by,
    payer_name: e.profiles?.nickname || e.profiles?.full_name || 'User',
    avatar: e.profiles?.avatar ? `/src/assets/${e.profiles.avatar}` : null,
    created_at: e.created_at
  }))
}

export async function addExpense({ groupId, description, amount, payerId, participantIds }) {
  // Insert expense
  const { data: expense, error } = await supabase
    .from('expenses')
    .insert({ group_id: groupId, description, amount, paid_by: payerId })
    .select()
    .single()
  if (error) throw error

  // Calculate split (equal for now)
  const perShare = +(amount / participantIds.length).toFixed(2)
  // Adjust last share to fix rounding
  let totalAssigned = perShare * participantIds.length
  let diff = +(amount - totalAssigned).toFixed(2)

  const shares = participantIds.map((uid, idx) => ({
    expense_id: expense.id,
    user_id: uid,
    share_amount: idx === participantIds.length - 1 ? +(perShare + diff).toFixed(2) : perShare
  }))

  const { error: shareErr } = await supabase
    .from('expense_shares')
    .insert(shares)
  if (shareErr) throw shareErr

  return expense
}
