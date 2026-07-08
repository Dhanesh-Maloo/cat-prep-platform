import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useExamSession } from '../store/examSession'
import { useAuth } from '../lib/auth'
import { saveMockTestAttempt, updateQuestionErrorTag } from '../api/attempts'
import { getMockTestCohortStats } from '../api/cohortStats'

const ERROR_TAGS = [
  { key: 'silly_mistake', label: 'Silly mistake' },
  { key: 'conceptual_gap', label: 'Conceptual gap' },
  { key: 'time_pressure', label: 'Time pressure' },
]

export function ResultsPage() {
  const { mockTestId } = useParams()
  const { test, questions, answers, result, setErrorTag } = useExamSession()
  const { user, loading: authLoading } = useAuth()
  const savedRef = useRef(false)
  const [questionAttemptIds, setQuestionAttemptIds] = useState({})
  const [saveState, setSaveState] = useState('idle')
  const [cohort, setCohort] = useState(null)

  useEffect(() => {
    if (authLoading || !test || !result || savedRef.current) return
    if (!user) {
      setSaveState('anonymous')
      return
    }
    savedRef.current = true
    setSaveState('saving')
    saveMockTestAttempt({ userId: user.id, mockTestId: test.id, questions, answers, result }).then((saved) => {
      if (saved) {
        setQuestionAttemptIds(saved.questionAttemptIdByQuestionId)
        setSaveState('saved')
      } else {
        setSaveState('error')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, test, result])

  useEffect(() => {
    if (!test || !result) return
    getMockTestCohortStats(test.id, result.rawScore, result.sectionScores).then(setCohort)
  }, [test, result])

  if (!test || test.id !== mockTestId || !result) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 mb-4">No completed attempt found for this test.</p>
        <Link to="/mock-tests" className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Mock Tests</Link>
      </div>
    )
  }

  function isCorrect(question) {
    const answer = answers[question.id]
    if (!answer) return false
    if (question.type === 'tita') {
      return (
        answer.textAnswer !== undefined &&
        String(answer.textAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()
      )
    }
    return answer.selectedIndex === question.correctIndex
  }

  function isAttempted(question) {
    const answer = answers[question.id]
    if (!answer) return false
    if (question.type === 'tita') return Boolean(answer.textAnswer)
    return answer.selectedIndex !== undefined
  }

  function handleTag(questionId, tag) {
    setErrorTag(questionId, tag)
    const attemptId = questionAttemptIds[questionId]
    if (attemptId) updateQuestionErrorTag(attemptId, tag)
  }

  const wrongQuestions = questions.filter((q) => isAttempted(q) && !isCorrect(q))

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{test.title} - Results</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Scoring: +3 correct MCQ, -1 incorrect MCQ, +3/0 TITA (no negative).</p>
      {saveState === 'anonymous' && (
        <p className="text-xs text-amber-600 dark:text-amber-400 mb-6">
          <Link to="/login" className="underline">Log in</Link> to save this attempt and see it in Analytics.
        </p>
      )}
      {saveState === 'saving' && <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Saving attempt...</p>}
      {saveState === 'saved' && <p className="text-xs text-green-600 dark:text-green-400 mb-6">Attempt saved to your account.</p>}
      {saveState === 'error' && <p className="text-xs text-red-500 dark:text-red-400 mb-6">Couldn't save this attempt - it's still shown below.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Raw Score" value={`${result.rawScore} / ${result.maxScore}`} />
        <StatCard label="Percentile (approx.)" value={`${result.percentile}`} />
        <StatCard label="Correct" value={result.correct} accent="text-green-600 dark:text-green-400" />
        <StatCard label="Incorrect" value={result.incorrect} accent="text-red-600 dark:text-red-400" />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 -mt-6 mb-8">
        Percentile is an approximation from a static lookup table, not an official CAT percentile.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Section-wise Breakdown</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {Object.entries(result.sectionScores).map(([key, s]) => (
          <div key={key} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{key}</h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{s.raw}<span className="text-sm text-gray-400 dark:text-gray-500"> / {s.maxScore}</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {s.correct} correct · {s.incorrect} incorrect · {s.unattempted} unattempted
            </p>
          </div>
        ))}
      </div>

      {cohort && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Where you stand</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Computed from everyone who's actually taken this mock - not a generic table.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard label="Rank" value={`#${cohort.rank} of ${cohort.totalAttempts}`} />
            <StatCard
              label="Percentile (this cohort)"
              value={cohort.percentile !== null ? `${cohort.percentile}` : 'Need more attempts'}
            />
            <StatCard
              label="vs. cohort average"
              value={`${result.rawScore > cohort.cohortAvg ? '+' : ''}${Math.round(result.rawScore - cohort.cohortAvg)}`}
              accent={result.rawScore >= cohort.cohortAvg ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
            />
          </div>
          {cohort.totalAttempts < 5 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 -mt-4 mb-8">
              Only {cohort.totalAttempts} {cohort.totalAttempts === 1 ? 'person has' : 'people have'} taken this mock so far - rank and percentile will get more meaningful as more people take it.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {Object.entries(result.sectionScores).map(([key, s]) => {
              const avg = cohort.sectionCohortAvg[key]
              if (avg === null || avg === undefined) return null
              const diff = Math.round(s.raw - avg)
              return (
                <div key={key} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{key}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    You: {s.raw} · Cohort avg: {avg.toFixed(1)}
                  </p>
                  <p className={`text-xs font-medium mt-1 ${diff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {diff >= 0 ? `+${diff} above average` : `${diff} below average`}
                  </p>
                </div>
              )
            })}
          </div>
        </>
      )}

      {wrongQuestions.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">What went wrong?</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Tag each miss - this feeds your error-classification breakdown in Analytics.
          </p>
          <div className="space-y-3 mb-10">
            {wrongQuestions.map((q) => {
              const answer = answers[q.id] || {}
              return (
                <div key={q.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{q.section}</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">{q.question}</p>
                  <div className="flex gap-2 flex-wrap">
                    {ERROR_TAGS.map((tag) => (
                      <button
                        key={tag.key}
                        type="button"
                        onClick={() => handleTag(q.id, tag.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          answer.errorTag === tag.key
                            ? 'bg-indigo-600 text-white border-indigo-600 dark:border-indigo-400'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-4">
        <Link to="/analytics" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700">
          View Analytics →
        </Link>
        <Link to="/mock-tests" className="text-gray-600 dark:text-gray-400 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
          Back to Mock Tests
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${accent || 'text-gray-900 dark:text-gray-100'}`}>{value}</p>
    </div>
  )
}
