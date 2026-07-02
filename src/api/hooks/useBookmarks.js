import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useBookmarks(userId) {
  const [subtopicBookmarks, setSubtopicBookmarks] = useState([])
  const [questionBookmarks, setQuestionBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('bookmarks')
      .select('*, subtopics(name), questions(question, section)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError)
      setLoading(false)
      return
    }

    setSubtopicBookmarks(data.filter((b) => b.subtopic_id))
    setQuestionBookmarks(data.filter((b) => b.question_id))
    setLoading(false)
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  return { subtopicBookmarks, questionBookmarks, loading, error, refresh: load }
}
