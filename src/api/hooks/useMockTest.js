import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

// Shape matches the old src/data/mockTests.js getMockTest() output.
export function useMockTest(mockTestId) {
  const [mockTest, setMockTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function load() {
      const [testRes, junctionRes] = await Promise.all([
        supabase.from('mock_tests').select('*').eq('id', mockTestId).maybeSingle(),
        supabase
          .from('mock_test_questions')
          .select('order_index, section, questions(*)')
          .eq('mock_test_id', mockTestId)
          .order('order_index'),
      ])
      if (cancelled) return

      const err = testRes.error || junctionRes.error
      if (err) {
        setError(err)
        setLoading(false)
        return
      }
      if (!testRes.data) {
        setMockTest(null)
        setLoading(false)
        return
      }

      setMockTest({
        id: testRes.data.id,
        title: testRes.data.title,
        type: testRes.data.type,
        sections: (testRes.data.sections || []).map((s) => ({
          key: s.key,
          name: s.name,
          durationMinutes: s.duration_minutes,
        })),
        questions: junctionRes.data.map((row) => ({
          id: row.questions.id,
          section: row.section,
          type: row.questions.type,
          question: row.questions.question,
          options: row.questions.options,
          correctIndex: row.questions.correct_index,
          correctAnswer: row.questions.correct_answer,
          explanation: row.questions.explanation,
          recommendedTimeSeconds: row.questions.recommended_time_seconds,
        })),
      })
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [mockTestId])

  return { mockTest, loading, error }
}
