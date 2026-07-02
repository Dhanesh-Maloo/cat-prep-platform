import { supabase } from '../lib/supabaseClient'

function isCorrect(question, answer) {
  if (!answer) return false
  if (question.type === 'tita') {
    if (!answer.textAnswer) return false
    return String(answer.textAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()
  }
  return answer.selectedIndex === question.correctIndex
}

function isAttempted(question, answer) {
  if (!answer) return false
  if (question.type === 'tita') return Boolean(answer.textAnswer)
  return answer.selectedIndex !== undefined && answer.selectedIndex !== null
}

/**
 * Persists a completed mock test attempt for a logged-in user: one
 * mock_test_attempts row plus one question_attempts row per attempted question.
 * Returns null (and logs) on failure rather than throwing — a failed save
 * shouldn't block the user from seeing their results.
 */
export async function saveMockTestAttempt({ userId, mockTestId, questions, answers, result }) {
  const { data: attempt, error: attemptError } = await supabase
    .from('mock_test_attempts')
    .insert({
      user_id: userId,
      mock_test_id: mockTestId,
      raw_score: result.rawScore,
      percentile: result.percentile,
      section_scores: result.sectionScores,
      end_time: new Date().toISOString(),
    })
    .select()
    .single()

  if (attemptError) {
    console.error('Failed to save mock test attempt:', attemptError.message)
    return null
  }

  const attemptedQuestions = questions.filter((q) => isAttempted(q, answers[q.id]))
  const rows = attemptedQuestions.map((q) => {
    const answer = answers[q.id]
    return {
      user_id: userId,
      question_id: q.id,
      selected_index: q.type === 'mcq' ? answer.selectedIndex : null,
      text_answer: q.type === 'tita' ? answer.textAnswer : null,
      is_correct: isCorrect(q, answer),
      time_taken_seconds: answer.timeTakenSeconds || null,
      marked_for_review: Boolean(answer.markedForReview),
    }
  })

  let questionAttemptIdByQuestionId = {}
  if (rows.length > 0) {
    const { data: inserted, error: questionsError } = await supabase.from('question_attempts').insert(rows).select()
    if (questionsError) {
      console.error('Failed to save question attempts:', questionsError.message)
    } else {
      questionAttemptIdByQuestionId = Object.fromEntries(
        inserted.map((row, i) => [attemptedQuestions[i].id, row.id])
      )
    }
  }

  return { attemptId: attempt.id, questionAttemptIdByQuestionId }
}

/**
 * Persists a single topic-practice question attempt. Fire-and-forget from the
 * caller's perspective — failures are logged, not surfaced, since practice
 * feedback shouldn't be blocked by a failed save.
 */
export async function savePracticeAttempt({ userId, questionId, selectedIndex, isCorrect: correct, timeTakenSeconds }) {
  const { error } = await supabase.from('question_attempts').insert({
    user_id: userId,
    question_id: questionId,
    selected_index: selectedIndex,
    is_correct: correct,
    time_taken_seconds: timeTakenSeconds,
  })
  if (error) console.error('Failed to save practice attempt:', error.message)
}

export async function updateQuestionErrorTag(questionAttemptId, errorTag) {
  const { error } = await supabase
    .from('question_attempts')
    .update({ error_type: errorTag })
    .eq('id', questionAttemptId)
  if (error) console.error('Failed to update error tag:', error.message)
}
