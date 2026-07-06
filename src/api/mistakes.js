import { supabase } from '../lib/supabaseClient'

/**
 * The "error log" every CAT topper is told to keep: every question a user
 * got wrong, across both timed mocks and untimed practice, with the
 * question/options/explanation attached so it's reviewable without
 * re-finding the original subtopic.
 */
export async function getMistakes(userId) {
  const { data, error } = await supabase
    .from('question_attempts')
    .select(
      'id, selected_index, text_answer, error_type, note, attempted_at, questions(id, question, options, correct_index, correct_answer, explanation, type, section, subtopic_id, subtopics(name))'
    )
    .eq('user_id', userId)
    .eq('is_correct', false)
    .order('attempted_at', { ascending: false })

  if (error) {
    console.error('Failed to load mistakes:', error.message)
    return []
  }
  return data.filter((row) => row.questions)
}

export async function updateMistakeNote(attemptId, note) {
  const { error } = await supabase.from('question_attempts').update({ note }).eq('id', attemptId)
  if (error) console.error('Failed to save mistake note:', error.message)
}
