import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

// Shape matches the old src/data/syllabus.js findSubtopic() + src/data/content.js
// getContent() combined, so SubtopicPage barely changes beyond the data source.
export function useSubtopicDetail(subtopicId) {
  const [match, setMatch] = useState(null)
  const [content, setContent] = useState(null)
  const [questionCount, setQuestionCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function load() {
      const [subtopicRes, notesRes, videosRes, resourcesRes, questionsRes] = await Promise.all([
        supabase.from('subtopics').select('*, topics(*, sections(*))').eq('id', subtopicId).maybeSingle(),
        supabase.from('notes').select('*').eq('subtopic_id', subtopicId).maybeSingle(),
        supabase.from('videos').select('*').eq('subtopic_id', subtopicId).limit(1).maybeSingle(),
        supabase.from('resources').select('*').eq('subtopic_id', subtopicId),
        supabase.from('questions').select('id', { count: 'exact', head: true }).eq('subtopic_id', subtopicId),
      ])
      if (cancelled) return

      const err = subtopicRes.error || notesRes.error || videosRes.error || resourcesRes.error || questionsRes.error
      if (err) {
        setError(err)
        setLoading(false)
        return
      }

      const st = subtopicRes.data
      if (!st) {
        setMatch(null)
        setContent(null)
        setLoading(false)
        return
      }

      setMatch({
        section: { id: st.topics.sections.id, name: st.topics.sections.name, fullName: st.topics.sections.full_name },
        topic: { id: st.topics.id, name: st.topics.name },
        subtopic: { id: st.id, name: st.name, difficulty: st.difficulty },
      })

      setContent(
        notesRes.data
          ? {
              notes: notesRes.data.body,
              video: videosRes.data ? { youtubeId: videosRes.data.youtube_id, title: videosRes.data.title } : null,
              resources: (resourcesRes.data || []).map((r) => ({ title: r.title, url: r.url })),
            }
          : null
      )
      setQuestionCount(questionsRes.count || 0)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [subtopicId])

  return { match, content, questionCount, loading, error }
}
