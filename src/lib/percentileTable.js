// APPROXIMATION ONLY — not official CAT percentile data.
// Static score-to-percentile lookup, loosely modeled on publicly discussed
// historical CAT score/percentile curves for a 3-section paper (raw score
// range roughly -66 to +198). Replace with a real historical dataset before
// showing this to users as anything more than a rough estimate.

export const PERCENTILE_TABLE = [
  { minScore: 140, percentile: 99.5 },
  { minScore: 120, percentile: 99 },
  { minScore: 100, percentile: 97 },
  { minScore: 85, percentile: 95 },
  { minScore: 70, percentile: 90 },
  { minScore: 55, percentile: 80 },
  { minScore: 42, percentile: 70 },
  { minScore: 30, percentile: 60 },
  { minScore: 20, percentile: 50 },
  { minScore: 10, percentile: 35 },
  { minScore: 0, percentile: 20 },
  { minScore: -10, percentile: 10 },
  { minScore: -66, percentile: 1 },
]

/** Approximate percentile for a raw score. Not an official CAT mapping. */
export function scoreToPercentile(rawScore) {
  const row = PERCENTILE_TABLE.find((r) => rawScore >= r.minScore)
  return row ? row.percentile : 1
}
