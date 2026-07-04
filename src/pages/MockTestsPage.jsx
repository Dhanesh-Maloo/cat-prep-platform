import { Link } from 'react-router-dom'
import { useMockTests } from '../api/hooks/useMockTests'

export function MockTestsPage() {
  const { mockTests, loading, error } = useMockTests()

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (error) return <p className="text-red-500">Couldn't load mock tests. Please try again.</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Mock Tests</h1>
      <p className="text-gray-500 text-sm mb-6">
        Full-length and sectional tests that replicate the real CAT interface - timer, section lock,
        question navigation, and an on-screen calculator during QA.
      </p>
      <div className="space-y-3">
        {mockTests.map((test) => (
          <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between">
            <div>
              <h2 className="font-medium text-gray-900">{test.title}</h2>
              <p className="text-sm text-gray-500">
                {test.sections.map((s) => s.name).join(' · ')} - {test.questionCount} questions
              </p>
            </div>
            <Link
              to={`/mock-test/${test.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              Start Test
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
