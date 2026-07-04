import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSubtopicDetail } from '../api/hooks/useSubtopicDetail'
import { DifficultyBadge } from '../components/DifficultyBadge'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabaseClient'
import { toggleSubtopicBookmark } from '../api/bookmarks'

export function SubtopicPage() {
  const { subtopicId } = useParams()
  const { match, content, questionCount, loading, error } = useSubtopicDetail(subtopicId)
  const { user } = useAuth()
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', user.id)
      .eq('subtopic_id', subtopicId)
      .maybeSingle()
      .then(({ data }) => setBookmarked(Boolean(data)))
  }, [user, subtopicId])

  async function handleBookmarkToggle() {
    const next = await toggleSubtopicBookmark(user.id, subtopicId, bookmarked)
    setBookmarked(next)
  }

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (error) return <p className="text-red-500">Couldn't load this sub-topic. Please try again.</p>
  if (!match) return <p className="text-gray-500">Sub-topic not found.</p>

  const { section, topic, subtopic } = match
  const isVideoLink = (url) => url.includes('youtube.com') || url.includes('youtu.be')
  const videoLinks = content ? content.resources.filter((r) => isVideoLink(r.url)) : []
  const otherResources = content ? content.resources.filter((r) => !isVideoLink(r.url)) : []

  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">
        <Link to="/syllabus" className="hover:text-indigo-600">{section.name}</Link>
        {' / '}
        {topic.name}
      </p>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{subtopic.name}</h1>
        <DifficultyBadge level={subtopic.difficulty} />
        {user && (
          <button
            type="button"
            onClick={handleBookmarkToggle}
            className={`text-sm px-2.5 py-1 rounded-full border ${
              bookmarked
                ? 'bg-amber-100 text-amber-700 border-amber-300'
                : 'bg-white text-gray-500 border-gray-300 hover:border-amber-400'
            }`}
          >
            {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        )}
      </div>

      {!content ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          Notes for this sub-topic are coming soon.
        </div>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Concept Notes</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-5 text-gray-700 leading-relaxed whitespace-pre-line">
              {content.notes}
            </div>
          </section>

          {content.video && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Video Explainer</h2>
              <div className="aspect-video max-w-2xl rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${content.video.youtubeId}`}
                  title={content.video.title}
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">{content.video.title}</p>
            </section>
          )}

          {videoLinks.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">More Video Explainers</h2>
              <ul className="space-y-1">
                {videoLinks.map((r) => (
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
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Free Resources</h2>
            <ul className="space-y-1">
              {otherResources.map((r) => (
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
          </section>

          {questionCount > 0 && (
            <Link
              to={`/practice/${subtopicId}`}
              className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
            >
              Practice {questionCount} questions →
            </Link>
          )}

          <div className="text-sm">
            <Link to={`/forum/${subtopicId}`} className="text-indigo-600 hover:underline">
              Discuss this topic in the forum →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
