import { describe, expect, it } from 'vitest'
import { calculateScore } from './scoring'
import { scoreToPercentile } from './percentileTable'

const questions = [
  { id: 'q1', section: 'QA', type: 'mcq', correctIndex: 1 },
  { id: 'q2', section: 'QA', type: 'mcq', correctIndex: 0 },
  { id: 'q3', section: 'QA', type: 'tita', correctAnswer: '42' },
  { id: 'q4', section: 'VARC', type: 'mcq', correctIndex: 2 },
  { id: 'q5', section: 'VARC', type: 'tita', correctAnswer: '7' },
]

describe('calculateScore', () => {
  it('awards +3 for correct MCQ, -1 for incorrect MCQ, 0 for unattempted', () => {
    const answers = {
      q1: { selectedIndex: 1 }, // correct
      q2: { selectedIndex: 2 }, // incorrect
      // q3 unattempted
      q4: { selectedIndex: 2 }, // correct
      q5: { textAnswer: '7' }, // correct TITA
    }
    const result = calculateScore(questions, answers)
    expect(result.rawScore).toBe(3 - 1 + 0 + 3 + 3)
    expect(result.correct).toBe(3)
    expect(result.incorrect).toBe(1)
    expect(result.unattempted).toBe(1)
  })

  it('never applies negative marking to TITA, even when wrong', () => {
    const answers = {
      q3: { textAnswer: '99' }, // wrong TITA
      q5: { textAnswer: '0' }, // wrong TITA
    }
    const result = calculateScore(questions, answers)
    expect(result.rawScore).toBe(0)
    expect(result.incorrect).toBe(2)
  })

  it('splits scores per section', () => {
    const answers = {
      q1: { selectedIndex: 1 }, // QA correct
      q4: { selectedIndex: 2 }, // VARC correct
    }
    const result = calculateScore(questions, answers)
    expect(result.sectionScores.QA.raw).toBe(3)
    expect(result.sectionScores.VARC.raw).toBe(3)
    expect(result.sectionScores.QA.attempted).toBe(1)
    expect(result.sectionScores.QA.unattempted).toBe(2)
  })

  it('trims and lowercases TITA text answers before comparing', () => {
    const answers = { q3: { textAnswer: ' 42 ' } }
    const result = calculateScore(questions, answers)
    expect(result.sectionScores.QA.correct).toBe(1)
  })

  it('treats a fully blank attempt as zero score', () => {
    const result = calculateScore(questions, {})
    expect(result.rawScore).toBe(0)
    expect(result.unattempted).toBe(questions.length)
  })
})

describe('scoreToPercentile', () => {
  it('is monotonically non-decreasing with score', () => {
    const scores = [-66, -10, 0, 10, 20, 30, 42, 55, 70, 85, 100, 120, 140, 198]
    const percentiles = scores.map(scoreToPercentile)
    for (let i = 1; i < percentiles.length; i++) {
      expect(percentiles[i]).toBeGreaterThanOrEqual(percentiles[i - 1])
    }
  })

  it('caps at the lowest bucket for very low scores', () => {
    expect(scoreToPercentile(-200)).toBe(1)
  })
})
