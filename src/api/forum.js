import { supabase } from '../lib/supabaseClient'

// author_name is stored directly on each row at post time - the `users`
// table's RLS only allows reading your own row, so a join would return null
// for every author except yourself.
function authorNameFor(user) {
  return user.email.split('@')[0]
}

export async function listThreads(subtopicId) {
  const { data, error } = await supabase
    .from('forum_threads')
    .select('*')
    .eq('subtopic_id', subtopicId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createThread({ subtopicId, user, title, body }) {
  const { data, error } = await supabase
    .from('forum_threads')
    .insert({ subtopic_id: subtopicId, user_id: user.id, author_name: authorNameFor(user), title, body })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getThread(threadId) {
  const { data, error } = await supabase
    .from('forum_threads')
    .select('*, subtopics(name)')
    .eq('id', threadId)
    .single()
  if (error) throw error
  return data
}

export async function listReplies(threadId) {
  const { data, error } = await supabase
    .from('forum_replies')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function createReply({ threadId, user, body }) {
  const { data, error } = await supabase
    .from('forum_replies')
    .insert({ thread_id: threadId, user_id: user.id, author_name: authorNameFor(user), body })
    .select()
    .single()
  if (error) throw error
  return data
}
