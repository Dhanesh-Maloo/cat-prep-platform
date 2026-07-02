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
    return <p className="text-gray-500">You need to be logged in to view settings.</p>
  }
  if (loading) return <p className="text-gray-500">Loading...</p>

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">{user.email}</p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-lg p-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target CAT exam date</label>
          <input
            type="date"
            value={targetExamDate}
            onChange={(e) => setTargetExamDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current level</label>
          <select
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Not set</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-green-600">Saved.</p>}
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
