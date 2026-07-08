import { Link } from 'react-router-dom'
import { useAllResources } from '../api/hooks/useAllResources'
import { TiltCard } from '../components/TiltCard'

export function ResourcesPage() {
  const { groups, loading, error } = useAllResources()

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load resources. Please try again.</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Free Resource Hub</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
        Previous year papers, free video playlists, and formula sheets - aggregated from every sub-topic.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <TiltCard className="rounded-lg">
          <Link to="/playbook" className="block bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 h-full hover:border-indigo-300 dark:hover:border-indigo-600">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">99th Percentile Playbook</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sectional targets, DILR set-selection strategy, and time allocation used by top scorers.</p>
          </Link>
        </TiltCard>
        <TiltCard className="rounded-lg">
          <Link to="/formula-sheet" className="block bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 h-full hover:border-indigo-300 dark:hover:border-indigo-600">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Formula &amp; Shortcuts Cheat Sheet</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Every core formula across QA, DILR, and VARC on one page.</p>
          </Link>
        </TiltCard>
        <TiltCard className="rounded-lg">
          <Link to="/percentile-predictor" className="block bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 h-full hover:border-indigo-300 dark:hover:border-indigo-600">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Percentile Predictor</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Type in a raw score from a mock or the real exam to see an approximate percentile.</p>
          </Link>
        </TiltCard>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.subtopicId} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{group.subtopicName}</h2>
            <ul className="space-y-1">
              {group.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                  >
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
