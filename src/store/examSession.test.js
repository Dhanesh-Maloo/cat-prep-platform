import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useExamSession } from './examSession'

const test = {
  id: 'test-mock',
  title: 'Test Mock',
  type: 'full',
  sections: [
    { key: 'A', name: 'Section A', durationMinutes: 1 },
    { key: 'B', name: 'Section B', durationMinutes: 1 },
  ],
  questions: [
    { id: 'a1', section: 'A', type: 'mcq', correctIndex: 0 },
    { id: 'a2', section: 'A', type: 'mcq', correctIndex: 1 },
    { id: 'b1', section: 'B', type: 'mcq', correctIndex: 0 },
  ],
}

beforeEach(() => {
  localStorage.clear()
  useExamSession.getState().reset()
})

describe('examSession store', () => {
  it('starts with the first section active and others pending', () => {
    useExamSession.getState().startTest(test)
    const state = useExamSession.getState()
    expect(state.sectionStatus.A).toBe('active')
    expect(state.sectionStatus.B).toBe('pending')
    expect(state.sectionTimeRemaining.A).toBe(60)
    expect(state.currentQuestionId).toBe('a1')
  })

  it('blocks navigation into a non-active section', () => {
    useExamSession.getState().startTest(test)
    useExamSession.getState().goToQuestion('b1')
    expect(useExamSession.getState().currentQuestionId).toBe('a1')
  })

  it('auto-submits a section and advances when the timer hits zero', () => {
    useExamSession.getState().startTest(test)
    for (let i = 0; i < 60; i++) {
      useExamSession.getState().tickCurrentSection()
    }
    const state = useExamSession.getState()
    expect(state.sectionStatus.A).toBe('auto-submitted')
    expect(state.sectionStatus.B).toBe('active')
    expect(state.currentQuestionId).toBe('b1')
    expect(state.status).toBe('in_progress')
  })

  it('shows the five-minute warning once remaining time crosses the threshold', () => {
    const longTest = {
      ...test,
      sections: [{ key: 'A', name: 'Section A', durationMinutes: 6 }],
      questions: [{ id: 'a1', section: 'A', type: 'mcq', correctIndex: 0 }],
    }
    useExamSession.getState().startTest(longTest)
    // 6 min = 360s; cross into <=300s (5 min) after 60 ticks
    for (let i = 0; i < 60; i++) {
      useExamSession.getState().tickCurrentSection()
    }
    expect(useExamSession.getState().showFiveMinuteWarning).toBe(true)
  })

  it('submits the whole test once the last section is exhausted, producing a score', () => {
    useExamSession.getState().startTest(test)
    useExamSession.getState().selectAnswer('a1', 0) // correct
    useExamSession.getState().submitCurrentSection() // finish section A
    useExamSession.getState().selectAnswer('b1', 0) // correct
    useExamSession.getState().submitCurrentSection() // finish section B -> submits test

    const state = useExamSession.getState()
    expect(state.status).toBe('submitted')
    expect(state.result).not.toBeNull()
    expect(state.result.correct).toBeGreaterThanOrEqual(2)
  })

  it('persists answers to localStorage as they are entered', () => {
    useExamSession.getState().startTest(test)
    useExamSession.getState().selectAnswer('a1', 1)
    const raw = localStorage.getItem('cat-prep-attempt:test-mock')
    expect(raw).toContain('"a1"')
  })
})
