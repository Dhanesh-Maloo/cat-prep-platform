import { describe, expect, it } from 'vitest'
import { computeNextReview } from './spacedRepetition'

describe('computeNextReview', () => {
  it('grows the interval and ease on a remembered card', () => {
    const result = computeNextReview({ intervalDays: 1, ease: 2.5, remembered: true, nowISO: '2026-07-01T00:00:00.000Z' })
    expect(result.intervalDays).toBeGreaterThan(1)
    expect(result.ease).toBeCloseTo(2.6)
    expect(result.nextReviewAt > '2026-07-01').toBe(true)
  })

  it('resets the interval to 1 day and lowers ease on a missed card', () => {
    const result = computeNextReview({ intervalDays: 10, ease: 2.5, remembered: false, nowISO: '2026-07-01T00:00:00.000Z' })
    expect(result.intervalDays).toBe(1)
    expect(result.ease).toBeCloseTo(2.3)
  })

  it('keeps ease within [1.3, 3.0] bounds', () => {
    const high = computeNextReview({ intervalDays: 1, ease: 2.95, remembered: true, nowISO: '2026-07-01T00:00:00.000Z' })
    expect(high.ease).toBeLessThanOrEqual(3.0)

    const low = computeNextReview({ intervalDays: 1, ease: 1.35, remembered: false, nowISO: '2026-07-01T00:00:00.000Z' })
    expect(low.ease).toBeGreaterThanOrEqual(1.3)
  })

  it('keeps intervals strictly increasing across repeated successful reviews', () => {
    let state = { intervalDays: 1, ease: 2.5 }
    const seen = []
    for (let i = 0; i < 5; i++) {
      state = computeNextReview({ ...state, remembered: true, nowISO: '2026-07-01T00:00:00.000Z' })
      seen.push(state.intervalDays)
    }
    for (let i = 1; i < seen.length; i++) {
      expect(seen[i]).toBeGreaterThan(seen[i - 1])
    }
  })
})
