import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { getDailyChallengeQuestion, getTodaysChallengeAttempt } from '../api/dailyChallenge'
import { savePracticeAttempt } from '../api/attempts'
import { todayDateString } from '../lib/dailyChallenge'

const ANON_KEY_PREFIX = 'cat-prep-daily-challenge-'

export function DailyChallengePage() {
  const { user } = useAuth()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [alreadyAnswered, setAlreadyAnswered] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getDailyChallengeQuestion()
      .then(async (q) => {
        if (cancelled) return
        if (!q) {
          setQuestion(null)
          setLoading(false)
          return
        }
        setQuestion(q)

        if (user) {
          const attempt = await getTodaysChallengeAttempt(user.id, q.id)
          if (cancelled) return
          if (attempt) {
            setSelected(attempt.selected_index)
            setAlreadyAnswered(true)
          }
        } else {
          const anonKey = ANON_KEY_PREFIX + todayDateString()
          const saved = localStorage.getItem(anonKey)
          if (saved !== null) {
            setSelected(Number(saved))
            setAlreadyAnswered(true)
          }
        }
        setLoading(false)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [user])

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading today's challenge...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load today's challenge. Please try again.</p>
  if (!question) return <p className="text-gray-500 dark:text-gray-400">No questions available yet - check back soon.</p>

  const isAnswered = selected !== null
  const isCorrect = selected === question.correct_index

  function handleSelect(optionIndex) {
    if (isAnswered) return
    setSelected(optionIndex)
    const correct = optionIndex === question.correct_index

    if (user) {
      savePracticeAttempt({ userId: user.id, questionId: question.id, selectedIndex: optionIndex, isCorrect: correct })
    } else {
      localStorage.setItem(ANON_KEY_PREFIX + todayDateString(), String(optionIndex))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Today's Challenge</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {question.subtopics?.name || 'Mixed topics'} · One shared question, every day, for everyone.
          </p>
        </div>
        <span className="text-3xl">🎯</span>
      </div>

      {alreadyAnswered && !user && (
        <p className="text-xs text-amber-600 dark:text-amber-400 mb-4">
          <Link to="/login" className="underline">Log in</Link> to have this count toward your streak and mistake notebook.
        </p>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <p className="text-gray-900 dark:text-gray-100 font-medium mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, i) => {
            const isRight = i === question.correct_index
            const isSelected = i === selected
            let style = 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
            if (isAnswered && isRight) style = 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-950'
            else if (isAnswered && isSelected && !isRight) style = 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950'

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
              {isCorrect ? 'Correct! Come back tomorrow for the next one.' : 'Not quite - come back tomorrow for the next one.'}
            </p>
            {question.explanation}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Want more like this?{' '}
        <Link to="/syllabus" className="text-indigo-600 dark:text-indigo-400 hover:underline">Browse the full syllabus</Link>
        {' '}or check your <Link to="/mistakes" className="text-indigo-600 dark:text-indigo-400 hover:underline">Mistake Notebook</Link>.
      </p>
    </div>
  )
}
