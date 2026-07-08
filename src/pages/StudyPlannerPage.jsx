import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useSyllabus } from '../api/hooks/useSyllabus'
import { useStudyPlan } from '../api/hooks/useStudyPlan'

function flattenSubtopics(sections) {
  const bySection = {}
  const list = []
  for (const section of sections) {
    for (const topic of section.topics) {
      for (const subtopic of topic.subtopics) {
        list.push({ id: subtopic.id, name: subtopic.name })
        bySection[subtopic.id] = { section: section.name, topic: topic.name }
      }
    }
  }
  return { list, bySection }
}

export function StudyPlannerPage() {
  const { user } = useAuth()
  const { sections, loading: syllabusLoading } = useSyllabus()
  const { plan, targetExamDate, loading, error, regenerate } = useStudyPlan(user?.id)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState(null)

  if (!user) return <p className="text-gray-500 dark:text-gray-400">Log in to build a study plan.</p>
  if (loading || syllabusLoading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load your study plan. Please try again.</p>

  if (!targetExamDate) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Study Planner</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Set your target CAT exam date in Settings first, and we'll build a week-by-week plan around it.
        </p>
        <Link to="/settings" className="text-indigo-600 dark:text-indigo-400 hover:underline">Go to Settings →</Link>
      </div>
    )
  }

  const { list: subtopics, bySection } = flattenSubtopics(sections)

  async function handleGenerate() {
    setGenerating(true)
    setGenError(null)
    try {
      const todayISO = new Date().toISOString().slice(0, 10)
      await regenerate(subtopics, todayISO)
    } catch (e) {
      setGenError(e.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Study Planner</h1>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {generating ? 'Generating...' : plan ? 'Regenerate Plan' : 'Generate Plan'}
        </button>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Target exam date: {targetExamDate}</p>
      {genError && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{genError}</p>}

      {!plan ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">
          No plan yet - click "Generate Plan" to build one from your exam date and current progress.
        </div>
      ) : (
        <div className="space-y-4">
          {plan.plan.map((week) => (
            <div key={week.week} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Week {week.week}</h2>
                <span className="text-xs text-gray-400 dark:text-gray-500">{week.startDate} → {week.endDate}</span>
              </div>
              {week.focus === 'revision' ? (
                <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 rounded-lg px-3 py-2">
                  Final stretch - take full mock tests and revise everything above rather than starting new topics.
                </p>
              ) : week.subtopicIds.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500">Nothing scheduled.</p>
              ) : (
                <ul className="space-y-1">
                  {week.subtopicIds.map((id) => (
                    <li key={id} className="text-sm">
                      <Link to={`/subtopic/${id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        {bySection[id]?.section} / {subtopics.find((s) => s.id === id)?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
