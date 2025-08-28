'use client'
import { getSupabase } from '@/lib/supabase'

export async function ensureUser(email: string) {
  const supabase = getSupabase()!
  const { data: existing } = await supabase.from('users').select('*').eq('email', email).maybeSingle()
  if (existing) return existing
  const { data, error } = await supabase.from('users').insert({ email }).select().single()
  if (error) throw error
  return data
}

export async function ensureDefaultChannel(userId: string) {
  const supabase = getSupabase()!
  const { data: chList } = await supabase.from('channels').select('*').eq('user_id', userId).limit(1)
  if (chList && chList.length > 0) return chList[0]
  const { data, error } = await supabase.from('channels').insert({ user_id: userId, name: 'Instagram (Mock)' }).select().single()
  if (error) throw error
  return data
}

export async function listContacts(channelId: string) {
  const supabase = getSupabase()!
  const { data: contacts, error } = await supabase.from('contacts').select('*').eq('channel_id', channelId).order('created_at', { ascending: true })
  if (error) throw error
  return contacts || []
}

export async function createContact(channelId: string, username: string) {
  const supabase = getSupabase()!
  const { data, error } = await supabase.from('contacts').insert({ channel_id: channelId, username }).select().single()
  if (error) throw error
  return data
}

export async function lastMessageFor(contactId: string) {
  const supabase = getSupabase()!
  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: false })
    .limit(1)
  return data?.[0] || null
}

export async function listMessages(contactId: string) {
  const supabase = getSupabase()!
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('contact_id', contactId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data || []
}

export async function sendMessage(contactId: string, sender: 'user' | 'contact', content: string) {
  const supabase = getSupabase()!
  const { error } = await supabase.from('messages').insert({ contact_id: contactId, sender, content })
  if (error) throw error
}
