const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Current streak = consecutive days with at least one activity, counting
 * backwards from today. A gap yesterday-or-earlier breaks it; today not yet
 * having activity doesn't break a streak that was active through yesterday.
 *
 * Includes one Duolingo-style "streak freeze": a single missed day is
 * bridged for free as long as there is activity on both sides of the gap,
 * so one bad day doesn't wipe out an otherwise long streak. This is an
 * approximation (a real freeze-credit system would need its own table) -
 * it grants exactly one bridge per streak computed, not a persisted
 * inventory of freezes.
 */
export function computeStreak(activityDatesISO, todayISO, { freezesAvailable = 1 } = {}) {
  const days = new Set(activityDatesISO.map((d) => d.slice(0, 10)))
  const today = new Date(todayISO)

  let streak = 0
  let freezesLeft = freezesAvailable
  let cursor = new Date(today)
  if (!days.has(todayISO.slice(0, 10))) {
    cursor = new Date(today.getTime() - MS_PER_DAY)
  }

  while (true) {
    const key = cursor.toISOString().slice(0, 10)
    if (days.has(key)) {
      streak += 1
      cursor = new Date(cursor.getTime() - MS_PER_DAY)
      continue
    }
    const dayBefore = new Date(cursor.getTime() - MS_PER_DAY)
    if (freezesLeft > 0 && days.has(dayBefore.toISOString().slice(0, 10))) {
      freezesLeft -= 1
      cursor = dayBefore
      continue
    }
    break
  }

  return streak
}

const BADGE_DEFINITIONS = [
  { key: 'first_steps', label: 'First Steps', description: 'Answer your first question', check: (s) => s.totalQuestionAttempts >= 1 },
  { key: 'ten_questions', label: '10 Questions', description: 'Answer 10 questions', check: (s) => s.totalQuestionAttempts >= 10 },
  { key: 'fifty_questions', label: '50 Questions', description: 'Answer 50 questions', check: (s) => s.totalQuestionAttempts >= 50 },
  { key: 'first_mock', label: 'First Mock Test', description: 'Complete your first mock test', check: (s) => s.totalMockAttempts >= 1 },
  { key: 'three_day_streak', label: '3-Day Streak', description: 'Study 3 days in a row', check: (s) => s.currentStreak >= 3 },
  { key: 'seven_day_streak', label: '7-Day Streak', description: 'Study 7 days in a row', check: (s) => s.currentStreak >= 7 },
  { key: 'bookworm', label: 'Bookworm', description: 'Bookmark 5 items', check: (s) => s.totalBookmarks >= 5 },
]

export function computeBadges(stats) {
  return BADGE_DEFINITIONS.map((b) => ({ ...b, earned: b.check(stats) }))
}
