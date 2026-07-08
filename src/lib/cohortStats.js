/**
 * Pure cohort-comparison math: given the anonymized raw scores (and per-section
 * scores) of everyone who's taken a mock test, plus one user's own result,
 * compute their rank, percentile, and section-wise standing against that
 * real cohort - the "All India Rank" mechanic real coaching institutes use,
 * instead of a generic historical percentile table.
 */
export function computeCohortStats(cohortRows, userRawScore, userSectionScores) {
  const scores = cohortRows
    .map((r) => r.raw_score)
    .filter((s) => typeof s === 'number' || typeof s === 'string')
    .map(Number)
    .filter((s) => !Number.isNaN(s))
  const totalAttempts = scores.length
  if (totalAttempts === 0) return null

  const better = scores.filter((s) => s > userRawScore).length
  const rank = better + 1
  const worseOrEqual = scores.filter((s) => s <= userRawScore).length
  const percentile = totalAttempts > 1 ? Math.round(((worseOrEqual - 1) / (totalAttempts - 1)) * 100) : null
  const cohortAvg = scores.reduce((a, b) => a + b, 0) / totalAttempts

  const sectionCohortAvg = {}
  for (const key of Object.keys(userSectionScores || {})) {
    const vals = cohortRows.map((r) => r.section_scores?.[key]?.raw).filter((v) => typeof v === 'number')
    sectionCohortAvg[key] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }

  return { totalAttempts, rank, percentile, cohortAvg, sectionCohortAvg }
}
