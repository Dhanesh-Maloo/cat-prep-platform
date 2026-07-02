import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useAllResources() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [resourcesRes, subtopicsRes] = await Promise.all([
        supabase.from('resources').select('*'),
        supabase.from('subtopics').select('id, name'),
      ])
      if (cancelled) return

      const err = resourcesRes.error || subtopicsRes.error
      if (err) {
        setError(err)
        setLoading(false)
        return
      }

      const nameById = Object.fromEntries(subtopicsRes.data.map((s) => [s.id, s.name]))
      const bySubtopic = new Map()
      for (const r of resourcesRes.data) {
        if (!bySubtopic.has(r.subtopic_id)) bySubtopic.set(r.subtopic_id, [])
        bySubtopic.get(r.subtopic_id).push({ title: r.title, url: r.url })
      }

      setGroups(
        Array.from(bySubtopic.entries()).map(([subtopicId, resources]) => ({
          subtopicId,
          subtopicName: nameById[subtopicId] || subtopicId,
          resources,
        }))
      )
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { groups, loading, error }
}
