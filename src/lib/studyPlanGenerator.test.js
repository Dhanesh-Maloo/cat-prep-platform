import { describe, expect, it } from 'vitest'
import { generateStudyPlan } from './studyPlanGenerator'

const subtopics = [
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
  { id: 'c', name: 'C' },
  { id: 'd', name: 'D' },
]

describe('generateStudyPlan', () => {
  it('puts never-attempted subtopics before low-accuracy ones, before high-accuracy ones', () => {
    const weeks = generateStudyPlan({
      subtopics,
      statsBySubtopic: {
        a: { accuracyPct: 90, total: 5 },
        b: { accuracyPct: 40, total: 3 },
        // c, d never attempted
      },
      targetExamDateISO: '2026-08-01',
      todayISO: '2026-07-01',
    })
    const allOrdered = weeks.flatMap((w) => w.subtopicIds)
    expect(allOrdered.indexOf('c')).toBeLessThan(allOrdered.indexOf('b'))
    expect(allOrdered.indexOf('d')).toBeLessThan(allOrdered.indexOf('b'))
    expect(allOrdered.indexOf('b')).toBeLessThan(allOrdered.indexOf('a'))
  })

  it('reserves the final week for revision when there is more than one week', () => {
    const weeks = generateStudyPlan({
      subtopics,
      statsBySubtopic: {},
      targetExamDateISO: '2026-07-22', // 3 weeks out from today
      todayISO: '2026-07-01',
    })
    const lastWeek = weeks[weeks.length - 1]
    expect(lastWeek.focus).toBe('revision')
    expect(lastWeek.subtopicIds).toEqual([])
    expect(lastWeek.endDate).toBe('2026-07-22')
  })

  it('uses a single topics-only week when the exam is within a week', () => {
    const weeks = generateStudyPlan({
      subtopics,
      statsBySubtopic: {},
      targetExamDateISO: '2026-07-05',
      todayISO: '2026-07-01',
    })
    expect(weeks).toHaveLength(1)
    expect(weeks[0].focus).toBe('topics')
  })

  it('covers every subtopic exactly once across all study weeks', () => {
    const weeks = generateStudyPlan({
      subtopics,
      statsBySubtopic: {},
      targetExamDateISO: '2026-09-01',
      todayISO: '2026-07-01',
    })
    const allIds = weeks.flatMap((w) => w.subtopicIds)
    expect(new Set(allIds).size).toBe(subtopics.length)
  })
})
