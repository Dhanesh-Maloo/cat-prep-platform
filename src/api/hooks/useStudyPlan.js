import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { generateStudyPlan } from '../../lib/studyPlanGenerator'

async function fetchAccuracyBySubtopic(userId) {
  const { data, error } = await supabase
    .from('question_attempts')
    .select('is_correct, questions(subtopic_id)')
    .eq('user_id', userId)

  if (error) throw error

  const bySubtopic = {}
  for (const row of data) {
    const subtopicId = row.questions?.subtopic_id
    if (!subtopicId) continue
    if (!bySubtopic[subtopicId]) bySubtopic[subtopicId] = { total: 0, correct: 0 }
    bySubtopic[subtopicId].total += 1
    if (row.is_correct) bySubtopic[subtopicId].correct += 1
  }
  return Object.fromEntries(
    Object.entries(bySubtopic).map(([id, s]) => [id, { total: s.total, accuracyPct: Math.round((s.correct / s.total) * 100) }])
  )
}

export function useStudyPlan(userId) {
  const [plan, setPlan] = useState(null)
  const [targetExamDate, setTargetExamDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const [planRes, userRes] = await Promise.all([
      supabase.from('study_plans').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('users').select('target_exam_date').eq('id', userId).single(),
    ])
    if (planRes.error || userRes.error) {
      setError(planRes.error || userRes.error)
      setLoading(false)
      return
    }
    setPlan(planRes.data)
    setTargetExamDate(userRes.data.target_exam_date)
    setLoading(false)
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  const regenerate = useCallback(
    async (subtopics, todayISO) => {
      if (!targetExamDate) throw new Error('Set a target exam date in Settings first.')
      const statsBySubtopic = await fetchAccuracyBySubtopic(userId)
      const weeks = generateStudyPlan({ subtopics, statsBySubtopic, targetExamDateISO: targetExamDate, todayISO })
      const { data, error: insertError } = await supabase
        .from('study_plans')
        .insert({ user_id: userId, target_exam_date: targetExamDate, plan: weeks })
        .select()
        .single()
      if (insertError) throw insertError
      setPlan(data)
      return data
    },
    [userId, targetExamDate]
  )

  return { plan, targetExamDate, loading, error, regenerate }
}
