import { supabase } from '../lib/supabase'

const GROUP_IMAGE_COUNT = 30

function randomGroupImage() {
  const n = Math.floor(Math.random() * GROUP_IMAGE_COUNT) + 1
  return `g${n}.jpg`
}

function generateInviteCode(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < length; i++) code += chars[Math.floor(Math.random()*chars.length)]
  return code
}

export async function createGroup(name, userId) {
  const image = randomGroupImage()
  const invite_code = generateInviteCode()
  const invite_expires_at = new Date(Date.now() + 24*60*60*1000).toISOString()

  const { data: group, error } = await supabase
    .from('groups')
    .insert({ name, image, invite_code, invite_expires_at })
    .select()
    .single()
  if (error) throw error

  // Membership added by trigger
  return group
}

export async function listUserGroups(userId) {
  const { data, error } = await supabase
    .from('group_members')
    .select('group_id, groups(id, name, image, invite_code, invite_expires_at, created_at, created_by, group_members(count))')
    .eq('user_id', userId)
  if (error) throw error
  return (data || []).map(r => ({
    id: r.groups.id,
    name: r.groups.name,
    image: `/assets/${r.groups.image}`,
    members: r.groups.group_members[0]?.count || 0,
    invite_code: r.groups.invite_code,
    invite_expires_at: r.groups.invite_expires_at,
    created_by: r.groups.created_by
  }))
}

export async function getGroup(groupId) {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single()
  if (error) throw error
  return data
}

export async function getGroupMembers(groupId) {
  const { data, error } = await supabase
    .rpc('get_group_members', { gid: groupId })
  if (error) throw error
  return (data || []).map(m => ({
    id: m.user_id,
    role: m.role,
    full_name: m.full_name,
    nickname: m.nickname,
  avatar: m.avatar ? `/assets/${m.avatar}` : null
  }))
}

export async function joinGroupByCode(inviteCode, userId) {
  // Validate group & expiry
  const { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('invite_code', inviteCode)
    .single()
  if (error) throw error
  if (new Date(group.invite_expires_at) < new Date()) {
    throw new Error('Invite code expired')
  }
  // Insert membership (ignore duplicate)
  const { error: memberErr } = await supabase
    .from('group_members')
    .insert({ group_id: group.id, user_id: userId, role: 'member' })
  if (memberErr && !memberErr.message.includes('duplicate')) throw memberErr
  return group
}

export async function removeMember(groupId, targetUserId, actingUserId) {
  // Check acting admin
  const { data: acting, error: aErr } = await supabase
    .from('group_members')
    .select('role')
    .eq('group_id', groupId)
    .eq('user_id', actingUserId)
    .single()
  if (aErr) throw aErr
  if (acting.role !== 'admin') throw new Error('Only admin can remove')

  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', targetUserId)
  if (error) throw error
}

export async function regenerateInvite(groupId, userId) {
  // Rely on database function for security
  const { data, error } = await supabase
    .rpc('regenerate_group_invite', { gid: groupId })
  if (error) throw error
  return data && data[0]
}

export async function deleteGroup(groupId, userId) {
  // Attempt delete; RLS ensures only creator can delete
  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', groupId)
  if (error) throw error
}

export async function promoteMember(groupId, targetUserId, actingUserId) {
  // server-side RPC enforces admin check; actingUserId param kept for symmetry/in future auditing
  const { error } = await supabase
    .rpc('promote_group_member', { gid: groupId, target_uid: targetUserId })
  if (error) throw error
}
