import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

// Shape matches the old src/data/questions.js getQuestions() output.
export function usePracticeQuestions(subtopicId) {
  const [questions, setQuestions] = useState([])
  const [subtopicName, setSubtopicName] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    supabase
      .from('questions')
      .select('*, subtopics(name)')
      .eq('subtopic_id', subtopicId)
      .eq('type', 'mcq')
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err)
          setLoading(false)
          return
        }
        setSubtopicName(data[0]?.subtopics?.name ?? null)
        setQuestions(
          (data || []).map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctIndex: q.correct_index,
            explanation: q.explanation,
          }))
        )
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [subtopicId])

  return { questions, subtopicName, loading, error }
}
