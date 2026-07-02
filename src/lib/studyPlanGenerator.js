const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Distributes subtopics across the weeks remaining until the exam date,
 * prioritizing subtopics with no attempts yet, then lowest accuracy first.
 * The final week (if there's more than one) is reserved for full mock tests
 * and revision rather than new topics.
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

  const studyWeeks = weekCount > 1 ? weekCount - 1 : weekCount
  const perWeek = Math.max(1, Math.ceil(ordered.length / studyWeeks))

  const weeks = []
  for (let w = 0; w < studyWeeks; w++) {
    const startDate = new Date(today.getTime() + w * 7 * MS_PER_DAY)
    const endDate = new Date(Math.min(startDate.getTime() + 6 * MS_PER_DAY, examDate.getTime()))
    weeks.push({
      week: w + 1,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      focus: 'topics',
      subtopicIds: ordered.slice(w * perWeek, (w + 1) * perWeek).map((s) => s.id),
    })
  }

  if (weekCount > 1) {
    const startDate = new Date(examDate.getTime() - 6 * MS_PER_DAY)
    weeks.push({
      week: weekCount,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: targetExamDateISO,
      focus: 'revision',
      subtopicIds: [],
    })
  }

  return weeks
}
