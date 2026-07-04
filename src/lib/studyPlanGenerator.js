const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Distributes subtopics across the weeks remaining until the exam date,
 * prioritizing subtopics with no attempts yet, then lowest accuracy first.
 * Only as many "topics" weeks are scheduled as there's actual content for —
 * once every subtopic has been placed, every remaining week (including the
 * last) becomes a revision/mock-test week rather than sitting empty.
 *
 * @param {Array<{id, name, section, topic}>} subtopics
 * @param {Record<string, {accuracyPct: number, total: number}>} statsBySubtopic
 * @param {string} targetExamDateISO - 'YYYY-MM-DD'
 * @param {string} todayISO - 'YYYY-MM-DD', injected so this stays pure/testable
 */
export function generateStudyPlan({ subtopics, statsBySubtopic, targetExamDateISO, todayISO }) {
  const today = new Date(todayISO)
  const examDate = new Date(targetExamDateISO)
  const daysRemaining = Math.max(1, Math.round((examDate - today) / MS_PER_DAY))
  const weekCount = Math.max(1, Math.ceil(daysRemaining / 7))

  const priority = (subtopicId) => {
    const stats = statsBySubtopic[subtopicId]
    if (!stats || stats.total === 0) return -1 // never attempted: highest priority
    return stats.accuracyPct
  }

  const ordered = [...subtopics].sort((a, b) => priority(a.id) - priority(b.id))

  const weeksAvailableForTopics = weekCount > 1 ? weekCount - 1 : weekCount
  // Never schedule more "topics" weeks than there's content for — extra time
  // becomes revision, not empty weeks.
  const topicWeekCount = Math.max(1, Math.min(weeksAvailableForTopics, ordered.length))
  const perWeek = Math.max(1, Math.ceil(ordered.length / topicWeekCount))

  const weeks = []
  for (let w = 0; w < weekCount; w++) {
    const startDate = new Date(today.getTime() + w * 7 * MS_PER_DAY)
    const endDate = new Date(Math.min(startDate.getTime() + 6 * MS_PER_DAY, examDate.getTime()))
    const isTopicWeek = w < topicWeekCount

    weeks.push({
      week: w + 1,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      focus: isTopicWeek ? 'topics' : 'revision',
      subtopicIds: isTopicWeek ? ordered.slice(w * perWeek, (w + 1) * perWeek).map((s) => s.id) : [],
    })
  }

  // The final week always ends exactly on the exam date, even if that means
  // a slightly shorter last week.
  if (weeks.length > 1) {
    const last = weeks[weeks.length - 1]
    const startDate = new Date(examDate.getTime() - 6 * MS_PER_DAY)
    last.startDate = startDate.toISOString().slice(0, 10)
    last.endDate = targetExamDateISO
  }

  return weeks
}
