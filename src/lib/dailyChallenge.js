// Deterministic "question of the day" selection - every user sees the same
// question on the same UTC calendar day, without needing a server or a
// schema change: given a stable, sorted list of question ids and today's
// date string, everyone computes the same index independently.

/** YYYY-MM-DD in UTC, so the "day" boundary is the same for every user regardless of timezone. */
export function todayDateString(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

/** Stable string hash (djb2-ish) - same input always produces the same non-negative index. */
export function pickDailyIndex(length, dateString) {
  if (length <= 0) return 0
  let hash = 5381
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash * 33) ^ dateString.charCodeAt(i)) >>> 0
  }
  return hash % length
}
