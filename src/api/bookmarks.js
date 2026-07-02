import { supabase } from '../lib/supabaseClient'
import { computeNextReview } from '../lib/spacedRepetition'

export async function toggleSubtopicBookmark(userId, subtopicId, isBookmarked) {
  if (isBookmarked) {
    const { error } = await supabase.from('bookmarks').delete().eq('user_id', userId).eq('subtopic_id', subtopicId)
    if (error) throw error
    return false
  }
  const { error } = await supabase.from('bookmarks').insert({ user_id: userId, subtopic_id: subtopicId })
  if (error) throw error
  return true
}

export async function toggleQuestionBookmark(userId, questionId, isBookmarked) {
  if (isBookmarked) {
    const { error } = await supabase.from('bookmarks').delete().eq('user_id', userId).eq('question_id', questionId)
    if (error) throw error
    return false
  }
  const { error } = await supabase.from('bookmarks').insert({ user_id: userId, question_id: questionId })
  if (error) throw error
  return true
}

export async function reviewFlashcard(bookmark, remembered) {
  const { intervalDays, ease, nextReviewAt } = computeNextReview({
    intervalDays: bookmark.interval_days,
    ease: bookmark.ease,
    remembered,
    nowISO: new Date().toISOString(),
  })
  const { error } = await supabase
    .from('bookmarks')
    .update({ interval_days: intervalDays, ease, next_review_at: nextReviewAt })
    .eq('id', bookmark.id)
  if (error) throw error
}
