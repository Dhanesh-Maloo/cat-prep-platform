import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setSubmitting(false)
    if (updateError) {
      setError(updateError.message)
      return
    }
    setDone(true)
    setTimeout(() => navigate('/'), 1500)
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Password updated</h1>
        <p className="text-gray-600 text-sm">Taking you back to the dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Choose a new password</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        This only works if you followed a password reset link from your email - otherwise there's no
        active reset session and saving will fail.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save new password'}
        </button>
      </form>
    </div>
  )
}
