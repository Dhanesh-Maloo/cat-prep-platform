import { describe, expect, it } from 'vitest'
import { computeCohortStats } from './cohortStats'

function row(raw, sections = {}) {
  return { raw_score: raw, section_scores: sections }
}

describe('computeCohortStats', () => {
  it('returns null when there is no cohort data', () => {
    expect(computeCohortStats([], 50, {})).toBeNull()
  })

  it('ranks the user first when they beat everyone', () => {
    const cohort = [row(60), row(40), row(30)]
    const stats = computeCohortStats(cohort, 80, {})
    expect(stats.rank).toBe(1)
    expect(stats.totalAttempts).toBe(3)
  })

  it('ranks the user correctly among a mixed cohort', () => {
    // user scores 50: two scores above (60, 55), so rank should be 3rd
    const cohort = [row(60), row(55), row(40), row(30)]
    const stats = computeCohortStats(cohort, 50, {})
    expect(stats.rank).toBe(3)
  })

  it('computes 100th percentile for the sole top scorer in a cohort of several', () => {
    const cohort = [row(100), row(10), row(20), row(30), row(40)]
    const stats = computeCohortStats(cohort, 100, {})
    // user is the best of 5 -> percentile should be the max, 100
    expect(stats.percentile).toBe(100)
  })

  it('computes a low percentile for the worst scorer', () => {
    const cohort = [row(100), row(90), row(80), row(70), row(1)]
    const stats = computeCohortStats(cohort, 1, {})
    // user is worst of 5 -> only themselves at or below -> percentile near 0
    expect(stats.percentile).toBe(0)
  })

  it('returns null percentile when the cohort has only one attempt (nothing to compare against)', () => {
    const cohort = [row(50)]
    const stats = computeCohortStats(cohort, 50, {})
    expect(stats.percentile).toBeNull()
    expect(stats.rank).toBe(1)
  })

  it('computes the correct cohort average', () => {
    const cohort = [row(10), row(20), row(30)]
    const stats = computeCohortStats(cohort, 20, {})
    expect(stats.cohortAvg).toBe(20)
  })

  it('computes section-wise cohort averages only for sections the user has', () => {
    const cohort = [
      row(50, { QA: { raw: 20 }, VARC: { raw: 15 } }),
      row(40, { QA: { raw: 10 }, VARC: { raw: 25 } }),
    ]
    const stats = computeCohortStats(cohort, 45, { QA: { raw: 18 }, VARC: { raw: 20 } })
    expect(stats.sectionCohortAvg.QA).toBe(15)
    expect(stats.sectionCohortAvg.VARC).toBe(20)
  })

  it('ignores non-numeric raw scores in the cohort (e.g. incomplete attempts)', () => {
    const cohort = [row(50), row(null), row(40)]
    const stats = computeCohortStats(cohort, 45, {})
    expect(stats.totalAttempts).toBe(2)
  })
})
