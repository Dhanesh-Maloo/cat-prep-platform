import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { data, error: signUpError } = await signUp(email, password)
    setSubmitting(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }
    if (data.session) {
      navigate('/')
    } else {
      setConfirmationSent(true)
    }
  }

  if (confirmationSent) {
    return (
      <div className="max-w-sm mx-auto py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Check your email</h1>
        <p className="text-gray-600 text-sm mb-6">
          We sent a confirmation link to {email}. Click it to activate your account, then log in.
        </p>
        <Link to="/login" className="text-indigo-600 hover:underline">Go to login</Link>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <p className="text-sm text-gray-500 text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
      </p>
    </div>
  )
}
