import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabaseClient'
import { listThreads, createThread } from '../api/forum'

export function ForumThreadListPage() {
  const { subtopicId } = useParams()
  const { user } = useAuth()
  const [subtopicName, setSubtopicName] = useState(subtopicId)
  const [threads, setThreads] = useState(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase.from('subtopics').select('name').eq('id', subtopicId).single().then(({ data }) => {
      if (data) setSubtopicName(data.name)
    })
    listThreads(subtopicId).then(setThreads).catch((e) => setError(e.message))
  }, [subtopicId])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const thread = await createThread({ subtopicId, user, title, body })
      setThreads((prev) => [thread, ...prev])
      setTitle('')
      setBody('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (threads === null) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">
        <Link to={`/subtopic/${subtopicId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">← {subtopicName}</Link>
      </p>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Doubt Forum - {subtopicName}</h1>

      {user ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
            required
            className="input w-full"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe your doubt..."
            rows={3}
            required
            className="input w-full"
          />
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
            Post Question
          </button>
        </form>
      ) : (
        <p className="text-sm text-amber-600 dark:text-amber-400 mb-6">
          <Link to="/login" className="underline">Log in</Link> to post a question.
        </p>
      )}

      {threads.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-sm">No questions yet - be the first to ask.</p>
      ) : (
        <ul className="space-y-2">
          {threads.map((t) => (
            <li key={t.id}>
              <Link
                to={`/forum/thread/${t.id}`}
                className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                <p className="font-medium text-gray-800 dark:text-gray-200">{t.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t.author_name} · {new Date(t.created_at).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
