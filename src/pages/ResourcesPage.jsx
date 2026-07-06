import { Link } from 'react-router-dom'
import { useAllResources } from '../api/hooks/useAllResources'

export function ResourcesPage() {
  const { groups, loading, error } = useAllResources()

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (error) return <p className="text-red-500">Couldn't load resources. Please try again.</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Free Resource Hub</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Previous year papers, free video playlists, and formula sheets - aggregated from every sub-topic.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link to="/playbook" className="block bg-indigo-50 border border-indigo-100 rounded-lg p-4 hover:border-indigo-300">
          <h2 className="font-semibold text-gray-900 mb-1">99th Percentile Playbook</h2>
          <p className="text-sm text-gray-600">Sectional targets, DILR set-selection strategy, and time allocation used by top scorers.</p>
        </Link>
        <Link to="/formula-sheet" className="block bg-indigo-50 border border-indigo-100 rounded-lg p-4 hover:border-indigo-300">
          <h2 className="font-semibold text-gray-900 mb-1">Formula &amp; Shortcuts Cheat Sheet</h2>
          <p className="text-sm text-gray-600">Every core formula across QA, DILR, and VARC on one page.</p>
        </Link>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.subtopicId} className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-medium text-gray-800 mb-2">{group.subtopicName}</h2>
            <ul className="space-y-1">
              {group.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline text-sm"
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
