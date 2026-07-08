import { describe, expect, it } from 'vitest'
import { pickDailyIndex, todayDateString } from './dailyChallenge'

describe('todayDateString', () => {
  it('formats a date as YYYY-MM-DD in UTC', () => {
    expect(todayDateString(new Date('2026-07-08T23:30:00Z'))).toBe('2026-07-08')
  })

  it('uses the UTC day even when local time would roll over', () => {
    // 2026-01-01T00:15:00Z is still 2025-12-31 in a negative-UTC-offset timezone,
    // but todayDateString must stay UTC-anchored so every user sees the same day.
    expect(todayDateString(new Date('2026-01-01T00:15:00Z'))).toBe('2026-01-01')
  })
})

describe('pickDailyIndex', () => {
  it('is deterministic - same date and length always pick the same index', () => {
    const a = pickDailyIndex(50, '2026-07-08')
    const b = pickDailyIndex(50, '2026-07-08')
    expect(a).toBe(b)
  })

  it('picks a different index on a different date (for a reasonably sized pool)', () => {
    const day1 = pickDailyIndex(98, '2026-07-08')
    const day2 = pickDailyIndex(98, '2026-07-09')
    expect(day1).not.toBe(day2)
  })

  it('always returns an index within bounds', () => {
    for (let i = 1; i <= 20; i++) {
      const idx = pickDailyIndex(i, `2026-01-${String(i).padStart(2, '0')}`)
      expect(idx).toBeGreaterThanOrEqual(0)
      expect(idx).toBeLessThan(i)
    }
  })

  it('returns 0 for an empty pool instead of dividing by zero', () => {
    expect(pickDailyIndex(0, '2026-07-08')).toBe(0)
  })

  it('distributes across a large pool reasonably (not always index 0)', () => {
    const indices = new Set()
    for (let d = 1; d <= 30; d++) {
      indices.add(pickDailyIndex(98, `2026-01-${String(d).padStart(2, '0')}`))
    }
    expect(indices.size).toBeGreaterThan(10)
  })
})
