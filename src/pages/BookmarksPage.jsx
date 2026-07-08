import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { useBookmarks } from '../api/hooks/useBookmarks'

export function BookmarksPage() {
  const { user } = useAuth()
  const { subtopicBookmarks, questionBookmarks, loading, error } = useBookmarks(user?.id)

  if (!user) return <p className="text-gray-500 dark:text-gray-400">Log in to see your bookmarks.</p>
  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load bookmarks. Please try again.</p>

  const dueCount = questionBookmarks.filter((b) => new Date(b.next_review_at) <= new Date()).length

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Bookmarks</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Sub-topics and questions you've saved for later, plus spaced-repetition flashcards.</p>

      <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-gray-200">Flashcards</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{questionBookmarks.length} bookmarked · {dueCount} due for review</p>
        </div>
        <Link
          to="/flashcards"
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            dueCount > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 pointer-events-none'
          }`}
        >
          Review {dueCount > 0 ? `(${dueCount})` : ''}
        </Link>
      </div>

      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Bookmarked Sub-topics</h2>
      {subtopicBookmarks.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">None yet - bookmark a sub-topic from its notes page.</p>
      ) : (
        <ul className="space-y-1 mb-6">
          {subtopicBookmarks.map((b) => (
            <li key={b.id}>
              <Link to={`/subtopic/${b.subtopic_id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
                {b.subtopics?.name || b.subtopic_id}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Bookmarked Questions</h2>
      {questionBookmarks.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">None yet - bookmark a question during practice.</p>
      ) : (
        <ul className="space-y-2">
          {questionBookmarks.map((b) => (
            <li key={b.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300">
              {b.questions?.question}
              <span className="block text-xs text-gray-400 dark:text-gray-500 mt-1">
                Next review: {new Date(b.next_review_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
