import { create } from 'zustand'
import { calculateScore } from '../lib/scoring'
import { saveAnswers, loadAnswers, clearAnswers } from '../lib/attemptPersistence'

const FIVE_MINUTES = 5 * 60

function sectionsFromQuestions(questions, sectionConfigs) {
  const bySection = {}
  for (const q of questions) {
    if (!bySection[q.section]) bySection[q.section] = []
    bySection[q.section].push(q.id)
  }
  return sectionConfigs.map((cfg) => ({ ...cfg, questionIds: bySection[cfg.key] || [] }))
}

export const useExamSession = create((set, get) => ({
  test: null,
  questions: [],
  questionsById: {},
  sections: [], // [{ key, name, durationMinutes, questionIds }]
  currentSectionIndex: 0,
  currentQuestionId: null,
  answers: {},
  sectionTimeRemaining: {}, // key -> seconds
  sectionStatus: {}, // key -> 'pending' | 'active' | 'submitted' | 'auto-submitted'
  status: 'idle', // idle | in_progress | submitted
  result: null,
  showFiveMinuteWarning: false,
  _questionStartedAt: null,

  startTest(test) {
    const sections = sectionsFromQuestions(test.questions, test.sections)
    const questionsById = Object.fromEntries(test.questions.map((q) => [q.id, q]))
    const sectionTimeRemaining = Object.fromEntries(
      sections.map((s) => [s.key, s.durationMinutes * 60])
    )
    const sectionStatus = Object.fromEntries(
      sections.map((s, i) => [s.key, i === 0 ? 'active' : 'pending'])
    )
    const restored = loadAnswers(test.id) || {}
    const firstQuestionId = sections[0]?.questionIds[0] ?? null
    const answers = firstQuestionId
      ? { ...restored, [firstQuestionId]: { ...restored[firstQuestionId], visited: true } }
      : restored

    set({
      test,
      questions: test.questions,
      questionsById,
      sections,
      currentSectionIndex: 0,
      currentQuestionId: firstQuestionId,
      answers,
      sectionTimeRemaining,
      sectionStatus,
      status: 'in_progress',
      result: null,
      showFiveMinuteWarning: false,
      _questionStartedAt: Date.now(),
    })
  },

  _flushTimeForCurrentQuestion() {
    const { currentQuestionId, _questionStartedAt, answers } = get()
    if (!currentQuestionId || !_questionStartedAt) return answers
    const elapsed = Math.round((Date.now() - _questionStartedAt) / 1000)
    const prev = answers[currentQuestionId] || {}
    return {
      ...answers,
      [currentQuestionId]: {
        ...prev,
        timeTakenSeconds: (prev.timeTakenSeconds || 0) + elapsed,
      },
    }
  },

  goToQuestion(questionId) {
    const { test, sections, currentSectionIndex, sectionStatus } = get()
    const activeSection = sections[currentSectionIndex]
    if (!activeSection || sectionStatus[activeSection.key] !== 'active') return
    if (!activeSection.questionIds.includes(questionId)) return

    const flushed = get()._flushTimeForCurrentQuestion()
    const answers = {
      ...flushed,
      [questionId]: { ...flushed[questionId], visited: true },
    }
    set({ answers, currentQuestionId: questionId, _questionStartedAt: Date.now() })
    saveAnswers(test.id, answers)
  },

  selectAnswer(questionId, selectedIndex) {
    const { test, answers } = get()
    const next = {
      ...answers,
      [questionId]: { ...answers[questionId], selectedIndex },
    }
    set({ answers: next })
    saveAnswers(test.id, next)
  },

  setTitaAnswer(questionId, textAnswer) {
    const { test, answers } = get()
    const next = {
      ...answers,
      [questionId]: { ...answers[questionId], textAnswer },
    }
    set({ answers: next })
    saveAnswers(test.id, next)
  },

  toggleMarkForReview(questionId) {
    const { test, answers } = get()
    const prev = answers[questionId] || {}
    const next = {
      ...answers,
      [questionId]: { ...prev, markedForReview: !prev.markedForReview },
    }
    set({ answers: next })
    saveAnswers(test.id, next)
  },

  tickCurrentSection() {
    const { sections, currentSectionIndex, sectionTimeRemaining, status } = get()
    if (status !== 'in_progress') return
    const section = sections[currentSectionIndex]
    if (!section) return

    const remaining = sectionTimeRemaining[section.key]
    const nextRemaining = Math.max(0, remaining - 1)
    set({
      sectionTimeRemaining: { ...sectionTimeRemaining, [section.key]: nextRemaining },
      showFiveMinuteWarning: nextRemaining <= FIVE_MINUTES && nextRemaining > 0,
    })

    if (nextRemaining === 0) {
      get()._advanceSection('auto-submitted')
    }
  },

  submitCurrentSection() {
    get()._advanceSection('submitted')
  },

  _advanceSection(statusForCurrent) {
    const { test, sections, currentSectionIndex, sectionStatus } = get()
    const section = sections[currentSectionIndex]
    if (!section) return

    const answers = get()._flushTimeForCurrentQuestion()
    const nextSectionStatus = { ...sectionStatus, [section.key]: statusForCurrent }
    const nextIndex = currentSectionIndex + 1

    if (nextIndex >= sections.length) {
      set({ answers, sectionStatus: nextSectionStatus })
      saveAnswers(test.id, answers)
      get().submitTest()
      return
    }

    const nextSection = sections[nextIndex]
    nextSectionStatus[nextSection.key] = 'active'
    const nextQuestionId = nextSection.questionIds[0] ?? null
    const answersWithVisit = nextQuestionId
      ? { ...answers, [nextQuestionId]: { ...answers[nextQuestionId], visited: true } }
      : answers

    set({
      answers: answersWithVisit,
      sectionStatus: nextSectionStatus,
      currentSectionIndex: nextIndex,
      currentQuestionId: nextQuestionId,
      showFiveMinuteWarning: false,
      _questionStartedAt: Date.now(),
    })
    saveAnswers(test.id, answersWithVisit)
  },

  setErrorTag(questionId, errorTag) {
    const { answers } = get()
    set({
      answers: {
        ...answers,
        [questionId]: { ...answers[questionId], errorTag },
      },
    })
  },

  submitTest() {
    const { test, questions, answers } = get()
    const answersWithFlush = get()._flushTimeForCurrentQuestion()
    const result = calculateScore(questions, answersWithFlush)
    set({ status: 'submitted', answers: answersWithFlush, result })
    clearAnswers(test.id)
  },

  reset() {
    set({
      test: null,
      questions: [],
      questionsById: {},
      sections: [],
      currentSectionIndex: 0,
      currentQuestionId: null,
      answers: {},
      sectionTimeRemaining: {},
      sectionStatus: {},
      status: 'idle',
      result: null,
      showFiveMinuteWarning: false,
      _questionStartedAt: null,
    })
  },
}))
