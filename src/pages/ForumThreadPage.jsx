import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { getThread, listReplies, createReply } from '../api/forum'

export function ForumThreadPage() {
  const { threadId } = useParams()
  const { user } = useAuth()
  const [thread, setThread] = useState(null)
  const [replies, setReplies] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    getThread(threadId).then(setThread).catch((e) => setError(e.message))
    listReplies(threadId).then(setReplies).catch((e) => setError(e.message))
  }, [threadId])

  async function handleReply(e) {
    e.preventDefault()
    setError(null)
    try {
      const reply = await createReply({ threadId, user, body })
      setReplies((prev) => [...prev, reply])
      setBody('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (error && !thread) return <p className="text-red-500">Couldn't load this thread.</p>
  if (!thread) return <p className="text-gray-500">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-sm text-gray-400 mb-4">
        <Link to={`/forum/${thread.subtopic_id}`} className="hover:text-indigo-600">← {thread.subtopics?.name}</Link>
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{thread.title}</h1>
        <p className="text-gray-700 whitespace-pre-line">{thread.body}</p>
        <p className="text-xs text-gray-400 mt-3">{thread.author_name} · {new Date(thread.created_at).toLocaleDateString()}</p>
      </div>

      <h2 className="font-semibold text-gray-800 mb-3">{replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}</h2>
      <div className="space-y-3 mb-6">
        {replies.map((r) => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-line">{r.body}</p>
            <p className="text-xs text-gray-400 mt-2">{r.author_name} · {new Date(r.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={handleReply} className="space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a reply..."
            rows={3}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
            Post Reply
          </button>
        </form>
      ) : (
        <p className="text-sm text-amber-600">
          <Link to="/login" className="underline">Log in</Link> to reply.
        </p>
      )}
    </div>
  )
}
