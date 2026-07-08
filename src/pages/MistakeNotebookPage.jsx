import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useMistakes } from '../api/hooks/useMistakes'
import { updateMistakeNote } from '../api/mistakes'

const ERROR_LABELS = {
  silly_mistake: { label: 'Silly mistake', className: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
  conceptual_gap: { label: 'Conceptual gap', className: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400' },
  time_pressure: { label: 'Time pressure', className: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' },
}

function correctAnswerText(question) {
  if (question.type === 'tita') return question.correct_answer
  return question.options?.[question.correct_index]
}

function yourAnswerText(row) {
  if (row.questions.type === 'tita') return row.text_answer || 'Not attempted'
  return row.selected_index != null ? row.questions.options?.[row.selected_index] : 'Not attempted'
}

function MistakeCard({ row, onSaved }) {
  const [note, setNote] = useState(row.note || '')
  const [saving, setSaving] = useState(false)
  const q = row.questions
  const errorTag = ERROR_LABELS[row.error_type]

  async function handleBlur() {
    if (note === (row.note || '')) return
    setSaving(true)
    await updateMistakeNote(row.id, note)
    setSaving(false)
    onSaved(row.id, note)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {q.subtopics?.name || q.section} · {new Date(row.attempted_at).toLocaleDateString()}
        </span>
        {errorTag && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${errorTag.className}`}>{errorTag.label}</span>
        )}
      </div>
      <p className="text-gray-900 dark:text-gray-100 font-medium mb-2">{q.question}</p>
      <p className="text-sm text-red-600 dark:text-red-400 mb-1">Your answer: {yourAnswerText(row)}</p>
      <p className="text-sm text-green-700 dark:text-green-400 mb-2">Correct answer: {correctAnswerText(q)}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">{q.explanation}</p>
      <label className="block text-sm">
        <span className="block text-gray-600 dark:text-gray-400 mb-1">
          Your note - why did you miss this, what will you do differently next time?
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={handleBlur}
          rows={2}
          placeholder="e.g. Misread 'at least' as 'exactly' - re-read constraints twice before solving."
          className="input w-full"
        />
      </label>
      {saving && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Saving...</p>}
    </div>
  )
}

export function MistakeNotebookPage() {
  const { user } = useAuth()
  const { mistakes, loading, error, refresh } = useMistakes(user?.id)
  const [filter, setFilter] = useState('all')

  if (!user) return <p className="text-gray-500 dark:text-gray-400">Log in to see your mistake notebook.</p>
  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load your mistakes. Please try again.</p>

  const sections = ['all', ...new Set(mistakes.map((m) => m.questions.section).filter(Boolean))]
  const filtered = filter === 'all' ? mistakes : mistakes.filter((m) => m.questions.section === filter)
  const notedCount = mistakes.filter((m) => m.note).length

  function handleSaved(id, note) {
    const row = mistakes.find((m) => m.id === id)
    if (row) row.note = note
    refresh()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Mistake Notebook</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
        Every question you've gotten wrong, across mocks and practice, in one place. Toppers consistently cite
        reviewing an error log as the single highest-leverage habit in the last two months before CAT - see the{' '}
        <Link to="/playbook" className="text-indigo-600 dark:text-indigo-400 hover:underline">99th Percentile Playbook</Link>.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
        {mistakes.length} total mistakes logged · {notedCount} annotated with a note
      </p>

      {mistakes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">
          No mistakes logged yet - once you attempt practice questions or mock tests, anything you get wrong shows up
          here automatically.
        </div>
      ) : (
        <>
          <div className="flex gap-2 flex-wrap mb-4">
            {sections.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                  filter === s
                    ? 'bg-indigo-600 text-white border-indigo-600 dark:border-indigo-400'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((row) => (
              <MistakeCard key={row.id} row={row} onSaved={handleSaved} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
