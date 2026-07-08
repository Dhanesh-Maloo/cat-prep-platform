import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePracticeQuestions } from '../api/hooks/usePracticeQuestions'
import { useAuth } from '../lib/auth'
import { savePracticeAttempt } from '../api/attempts'
import { supabase } from '../lib/supabaseClient'
import { toggleQuestionBookmark } from '../api/bookmarks'

export function PracticePage() {
  const { subtopicId } = useParams()
  const { questions, subtopicName, loading, error } = usePracticeQuestions(subtopicId)
  const { user } = useAuth()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set())
  const questionStartedAt = useRef(Date.now())

  useEffect(() => {
    questionStartedAt.current = Date.now()
  }, [index])

  useEffect(() => {
    if (!user || questions.length === 0) return
    supabase
      .from('bookmarks')
      .select('question_id')
      .eq('user_id', user.id)
      .in('question_id', questions.map((q) => q.id))
      .then(({ data }) => setBookmarkedIds(new Set((data || []).map((b) => b.question_id))))
  }, [user, questions])

  async function handleBookmarkToggle(questionId) {
    const isBookmarked = bookmarkedIds.has(questionId)
    await toggleQuestionBookmark(user.id, questionId, isBookmarked)
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (isBookmarked) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load practice questions. Please try again.</p>
  if (questions.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No practice questions available for this sub-topic yet.</p>
  }

  const question = questions[index]
  const isLast = index === questions.length - 1
  const isAnswered = selected !== null

  function handleSelect(optionIndex) {
    if (isAnswered) return
    setSelected(optionIndex)
    const correct = optionIndex === question.correctIndex
    if (correct) setScore((s) => s + 1)

    if (user) {
      savePracticeAttempt({
        userId: user.id,
        questionId: question.id,
        selectedIndex: optionIndex,
        isCorrect: correct,
        timeTakenSeconds: Math.round((Date.now() - questionStartedAt.current) / 1000),
      })
    }
  }

  function handleNext() {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  if (index >= questions.length) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Practice complete</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You scored {score} / {questions.length} on {subtopicName}.
        </p>
        {!user && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mb-4">
            <Link to="/login" className="underline">Log in</Link> to save your practice history and see it in Analytics.
          </p>
        )}
        <Link to={`/subtopic/${subtopicId}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
          ← Back to notes
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
        <Link to={`/subtopic/${subtopicId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">← {subtopicName}</Link>
        <span>Question {index + 1} of {questions.length}</span>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <p className="text-gray-900 dark:text-gray-100 font-medium mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, i) => {
            const isCorrect = i === question.correctIndex
            const isSelected = i === selected
            let style = 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
            if (isAnswered && isCorrect) style = 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-950'
            else if (isAnswered && isSelected && !isCorrect) style = 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950'

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                disabled={isAnswered}
                className={`w-full text-left border rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 transition-colors ${style}`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className="mt-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">
              {selected === question.correctIndex ? 'Correct!' : 'Not quite.'}
            </p>
            {question.explanation}
          </div>
        )}

        {isAnswered && (
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleNext}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700"
            >
              {isLast ? 'Finish' : 'Next question →'}
            </button>
            {user && (
              <button
                type="button"
                onClick={() => handleBookmarkToggle(question.id)}
                className={`text-sm px-3 py-2 rounded-lg border ${
                  bookmarkedIds.has(question.id)
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-600'
                }`}
              >
                {bookmarkedIds.has(question.id) ? '★ Bookmarked' : '☆ Bookmark for review'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
