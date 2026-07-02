const MS_PER_DAY = 24 * 60 * 60 * 1000
const MIN_EASE = 1.3
const MAX_EASE = 3.0

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

/**
 * SM-2-lite: a remembered card gets a longer interval (scaled by ease, which
 * nudges up slightly), a missed card resets to a 1-day interval and the ease
 * drops a bit so it comes back around faster next time.
 */
export function computeNextReview({ intervalDays, ease, remembered, nowISO }) {
  const now = new Date(nowISO)
  const newEase = clamp(ease + (remembered ? 0.1 : -0.2), MIN_EASE, MAX_EASE)
  const newIntervalDays = remembered ? Math.max(intervalDays + 1, Math.round(intervalDays * newEase)) : 1
  const nextReviewAt = new Date(now.getTime() + newIntervalDays * MS_PER_DAY).toISOString()

  return { intervalDays: newIntervalDays, ease: newEase, nextReviewAt }
}
