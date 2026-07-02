import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { computeStreak, computeBadges } from '../../lib/streaks'

export function useStreakAndBadges(userId) {
  const [stats, setStats] = useState(null)
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(Boolean(userId))

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    setLoading(true)

    Promise.all([
      supabase.from('question_attempts').select('attempted_at', { count: 'exact' }).eq('user_id', userId),
      supabase.from('mock_test_attempts').select('start_time', { count: 'exact' }).eq('user_id', userId),
      supabase.from('bookmarks').select('id', { count: 'exact', head: true }).eq('user_id', userId),
    ]).then(([questionRes, mockRes, bookmarkRes]) => {
      const activityDates = [
        ...questionRes.data.map((r) => r.attempted_at),
        ...mockRes.data.map((r) => r.start_time),
      ]
      const todayISO = new Date().toISOString()
      const currentStreak = computeStreak(activityDates, todayISO)

      const computedStats = {
        totalQuestionAttempts: questionRes.count || 0,
        totalMockAttempts: mockRes.count || 0,
        totalBookmarks: bookmarkRes.count || 0,
        currentStreak,
      }
      setStats(computedStats)
      setBadges(computeBadges(computedStats))
      setLoading(false)
    })
  }, [userId])

  return { stats, badges, loading }
}
