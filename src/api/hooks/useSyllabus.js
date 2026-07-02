import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

// Shape matches the old src/data/syllabus.js `sections` export so pages that
// consume it don't need to change beyond swapping the data source.
export function useSyllabus() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    const [sectionsRes, topicsRes, subtopicsRes, notesRes] = await Promise.all([
      supabase.from('sections').select('*').order('sort_order'),
      supabase.from('topics').select('*').order('sort_order'),
      supabase.from('subtopics').select('*').order('sort_order'),
      supabase.from('notes').select('subtopic_id'),
    ])

    const err = sectionsRes.error || topicsRes.error || subtopicsRes.error || notesRes.error
    if (err) {
      setError(err)
      setLoading(false)
      return
    }

    const subtopicsWithContent = new Set(notesRes.data.map((n) => n.subtopic_id))

    const nested = sectionsRes.data.map((s) => ({
      id: s.id,
      name: s.name,
      fullName: s.full_name,
      topics: topicsRes.data
        .filter((t) => t.section_id === s.id)
        .map((t) => ({
          id: t.id,
          name: t.name,
          subtopics: subtopicsRes.data
            .filter((st) => st.topic_id === t.id)
            .map((st) => ({
              id: st.id,
              name: st.name,
              difficulty: st.difficulty,
              hasContent: subtopicsWithContent.has(st.id),
            })),
        })),
    }))

    setSections(nested)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { sections, loading, error, refresh: load }
}
