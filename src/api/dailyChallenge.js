import { supabase } from '../lib/supabaseClient'
import { pickDailyIndex, todayDateString } from '../lib/dailyChallenge'

/**
 * Today's shared question: every user gets the same one, computed client-side
 * from a stable (UUID-sorted) list of ids and today's date - no schema change,
 * no cron job, no server needed to "roll over" the challenge at midnight UTC.
 */
export async function getDailyChallengeQuestion() {
  const { data: idRows, error: idsError } = await supabase.from('questions').select('id').eq('type', 'mcq').order('id')
  if (idsError) throw idsError
  if (!idRows.length) return null

  const index = pickDailyIndex(idRows.length, todayDateString())
  const questionId = idRows[index].id

  const { data: question, error } = await supabase
    .from('questions')
    .select('id, question, options, correct_index, explanation, difficulty, subtopic_id, subtopics(name)')
    .eq('id', questionId)
    .single()
  if (error) throw error
  return question
}

/** Has this user already answered today's (UTC) challenge? Returns the attempt row, or null. */
export async function getTodaysChallengeAttempt(userId, questionId) {
  const startOfDayUtc = new Date(`${todayDateString()}T00:00:00.000Z`).toISOString()
  const { data, error } = await supabase
    .from('question_attempts')
    .select('id, selected_index, is_correct')
    .eq('user_id', userId)
    .eq('question_id', questionId)
    .gte('attempted_at', startOfDayUtc)
    .order('attempted_at', { ascending: false })
    .limit(1)
  if (error) {
    console.error('Failed to check today\'s challenge attempt:', error.message)
    return null
  }
  return data?.[0] || null
}
