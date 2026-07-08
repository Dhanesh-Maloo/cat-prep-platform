import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setSubmitting(false)
    if (resetError) {
      setError(resetError.message)
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="max-w-sm mx-auto py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Check your email</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          If an account exists for {email}, we sent a link to reset your password.
        </p>
        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">Back to login</Link>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center">Reset your password</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
        Enter your email and we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">Back to login</Link>
      </p>
    </div>
  )
}
