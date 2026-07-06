import { describe, expect, it } from 'vitest'
import { computeStreak, computeBadges } from './streaks'

describe('computeStreak', () => {
  it('counts consecutive days ending today', () => {
    const dates = ['2026-06-29T10:00:00Z', '2026-06-30T10:00:00Z', '2026-07-01T10:00:00Z']
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(3)
  })

  it('still counts the streak if today has no activity yet but yesterday did', () => {
    const dates = ['2026-06-29T10:00:00Z', '2026-06-30T10:00:00Z']
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(2)
  })

  it('breaks the streak on a gap', () => {
    const dates = ['2026-06-25T10:00:00Z', '2026-06-30T10:00:00Z', '2026-07-01T10:00:00Z']
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(2)
  })

  it('returns 0 when there is no recent activity', () => {
    const dates = ['2026-06-01T10:00:00Z']
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(0)
  })

  it('bridges a single missed day with the streak freeze', () => {
    const dates = ['2026-06-29T10:00:00Z', '2026-07-01T10:00:00Z'] // 06-30 missing
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(2)
  })

  it('only bridges one gap - a second gap still breaks the streak', () => {
    const dates = ['2026-06-25T10:00:00Z', '2026-06-27T10:00:00Z', '2026-07-01T10:00:00Z'] // 06-26 and 06-28..06-30 missing
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(1)
  })

  it('does not bridge a gap larger than one day even with a freeze available', () => {
    const dates = ['2026-06-25T10:00:00Z', '2026-06-30T10:00:00Z', '2026-07-01T10:00:00Z']
    expect(computeStreak(dates, '2026-07-01T00:00:00Z')).toBe(2)
  })
})

describe('computeBadges', () => {
  it('marks badges earned based on thresholds', () => {
    const badges = computeBadges({ totalQuestionAttempts: 12, totalMockAttempts: 0, currentStreak: 1, totalBookmarks: 0 })
    const byKey = Object.fromEntries(badges.map((b) => [b.key, b.earned]))
    expect(byKey.first_steps).toBe(true)
    expect(byKey.ten_questions).toBe(true)
    expect(byKey.fifty_questions).toBe(false)
    expect(byKey.first_mock).toBe(false)
  })
})
