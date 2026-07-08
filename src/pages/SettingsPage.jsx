import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabaseClient'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export function SettingsPage() {
  const { user } = useAuth()
  const [targetExamDate, setTargetExamDate] = useState('')
  const [currentLevel, setCurrentLevel] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    supabase
      .from('users')
      .select('target_exam_date, current_level')
      .eq('id', user.id)
      .single()
      .then(({ data, error: fetchError }) => {
        if (cancelled) return
        if (fetchError) {
          setError(fetchError.message)
        } else {
          setTargetExamDate(data.target_exam_date || '')
          setCurrentLevel(data.current_level || '')
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)
    const { error: updateError } = await supabase
      .from('users')
      .update({ target_exam_date: targetExamDate || null, current_level: currentLevel || null })
      .eq('id', user.id)
    setSaving(false)
    if (updateError) {
      setError(updateError.message)
      return
    }
    setSaved(true)
  }

  if (!user) {
    return <p className="text-gray-500 dark:text-gray-400">You need to be logged in to view settings.</p>
  }
  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target CAT exam date</label>
          <input
            type="date"
            value={targetExamDate}
            onChange={(e) => setTargetExamDate(e.target.value)}
            className="input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current level</label>
          <select
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            className="input w-full"
          >
            <option value="">Not set</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {saved && <p className="text-sm text-green-600 dark:text-green-400">Saved.</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
