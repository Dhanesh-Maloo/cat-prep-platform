import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useMockTests() {
  const [mockTests, setMockTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [testsRes, junctionRes] = await Promise.all([
        supabase.from('mock_tests').select('*'),
        supabase.from('mock_test_questions').select('mock_test_id'),
      ])
      if (cancelled) return

      const err = testsRes.error || junctionRes.error
      if (err) {
        setError(err)
        setLoading(false)
        return
      }

      const countByTest = {}
      for (const row of junctionRes.data) {
        countByTest[row.mock_test_id] = (countByTest[row.mock_test_id] || 0) + 1
      }

      setMockTests(
        testsRes.data.map((t) => ({
          id: t.id,
          title: t.title,
          type: t.type,
          sections: (t.sections || []).map((s) => ({
            key: s.key,
            name: s.name,
            durationMinutes: s.duration_minutes,
          })),
          questionCount: countByTest[t.id] || 0,
        }))
      )
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { mockTests, loading, error }
}
