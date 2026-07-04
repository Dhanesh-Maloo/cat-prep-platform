import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { mockTestAttempts as dummyMockTestAttempts, questionAttempts as dummyQuestionAttempts } from '../../data/attemptHistory'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

const ERROR_TAG_LABELS = {
  silly_mistake: 'Silly mistake',
  conceptual_gap: 'Conceptual gap',
  time_pressure: 'Time pressure',
}

// Shared by both the dummy sample data and real Supabase data - both are
// normalized to the same { topic, section, isCorrect, timeTakenSeconds,
// recommendedTimeSeconds, errorTag } / { date, rawScore, percentile, sectionScores }
// shapes before reaching here.
function computeAnalytics(mockTestAttempts, questionAttempts) {
  const topicMap = new Map()
  for (const qa of questionAttempts) {
    if (!topicMap.has(qa.topic)) {
      topicMap.set(qa.topic, {
        topic: qa.topic,
        section: qa.section,
        total: 0,
        correct: 0,
        totalTime: 0,
        recommendedTime: qa.recommendedTimeSeconds,
        overTimeCount: 0,
      })
    }
    const entry = topicMap.get(qa.topic)
    entry.total += 1
    if (qa.isCorrect) entry.correct += 1
    entry.totalTime += qa.timeTakenSeconds || 0
    if (qa.recommendedTimeSeconds && qa.timeTakenSeconds >= qa.recommendedTimeSeconds * 2) entry.overTimeCount += 1
  }

  const topicStats = Array.from(topicMap.values()).map((t) => ({
    ...t,
    accuracyPct: Math.round((t.correct / t.total) * 100),
    avgTimeSeconds: Math.round(t.totalTime / t.total),
  }))

  const errorCounts = { silly_mistake: 0, conceptual_gap: 0, time_pressure: 0 }
  for (const qa of questionAttempts) {
    if (!qa.isCorrect && qa.errorTag) errorCounts[qa.errorTag] += 1
  }
  const errorBreakdown = Object.entries(errorCounts).map(([key, count]) => ({
    key,
    label: ERROR_TAG_LABELS[key],
    count,
  }))

  const progressTrend = [...mockTestAttempts]
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((a) => ({ date: a.date, rawScore: a.rawScore, percentile: a.percentile }))

  const sectionKeys = ['VARC', 'DILR', 'QA']
  const sectionComparison = sectionKeys.map((key) => ({
    section: key,
    avgScore: mockTestAttempts.length
      ? Math.round((mockTestAttempts.reduce((sum, a) => sum + (a.sectionScores[key] || 0), 0) / mockTestAttempts.length) * 10) / 10
      : 0,
  }))

  return { topicStats, errorBreakdown, progressTrend, sectionComparison, mockTestAttempts, questionAttempts }
}

async function fetchRealData(userId) {
  const [attemptsRes, questionAttemptsRes] = await Promise.all([
    supabase.from('mock_test_attempts').select('*').eq('user_id', userId).order('start_time'),
    supabase
      .from('question_attempts')
      .select('*, questions(section, recommended_time_seconds, subtopics(name))')
      .eq('user_id', userId),
  ])
  if (attemptsRes.error || questionAttemptsRes.error) {
    throw attemptsRes.error || questionAttemptsRes.error
  }

  const mockTestAttempts = attemptsRes.data.map((a) => ({
    date: (a.start_time || a.end_time || '').slice(0, 10),
    rawScore: a.raw_score ?? 0,
    percentile: a.percentile ?? 0,
    sectionScores: Object.fromEntries(
      Object.entries(a.section_scores || {}).map(([key, v]) => [key, typeof v === 'object' ? v.raw : v])
    ),
  }))

  const questionAttempts = questionAttemptsRes.data.map((qa) => ({
    topic: qa.questions?.subtopics?.name || qa.questions?.section || 'Unknown',
    section: qa.questions?.section || 'Unknown',
    isCorrect: qa.is_correct,
    timeTakenSeconds: qa.time_taken_seconds,
    recommendedTimeSeconds: qa.questions?.recommended_time_seconds,
    errorTag: qa.error_type,
  }))

  return { mockTestAttempts, questionAttempts }
}

const AnalyticsDataContext = createContext(null)

/**
 * Fetches analytics data exactly once per mount (regardless of how many chart
 * components read it) and shares the result via context. Wrap AnalyticsPage's
 * content in this so ProgressTrendChart/SectionComparisonChart/etc. don't each
 * fire their own duplicate Supabase queries.
 */
export function AnalyticsDataProvider({ children }) {
  const { user } = useAuth()
  const [real, setReal] = useState(null)
  const [loading, setLoading] = useState(Boolean(user))

  useEffect(() => {
    if (!user) {
      setReal(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    fetchRealData(user.id)
      .then((data) => {
        if (!cancelled) setReal(data)
      })
      .catch(() => {
        if (!cancelled) setReal(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  const usingRealData = Boolean(real && real.mockTestAttempts.length > 0)

  const analytics = useMemo(() => {
    if (usingRealData) return computeAnalytics(real.mockTestAttempts, real.questionAttempts)
    return computeAnalytics(dummyMockTestAttempts, dummyQuestionAttempts)
  }, [usingRealData, real])

  const value = useMemo(() => ({ ...analytics, loading, usingRealData }), [analytics, loading, usingRealData])

  return <AnalyticsDataContext.Provider value={value}>{children}</AnalyticsDataContext.Provider>
}

export function useAnalyticsData() {
  const ctx = useContext(AnalyticsDataContext)
  if (!ctx) throw new Error('useAnalyticsData must be used within AnalyticsDataProvider')
  return ctx
}
