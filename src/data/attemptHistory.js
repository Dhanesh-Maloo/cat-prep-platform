// Dummy historical data shaped like what `mock_test_attempts` and
// `question_attempts` would hold in Supabase. The analytics dashboard reads
// this through src/api/hooks/useAnalyticsData.js — once real attempts are
// stored, only that hook needs to change, not the chart components.

export const mockTestAttempts = [
  { id: 'att-1', date: '2026-04-05', rawScore: 28, percentile: 60, sectionScores: { VARC: 12, DILR: 6, QA: 10 } },
  { id: 'att-2', date: '2026-04-19', rawScore: 41, percentile: 70, sectionScores: { VARC: 15, DILR: 11, QA: 15 } },
  { id: 'att-3', date: '2026-05-03', rawScore: 39, percentile: 68, sectionScores: { VARC: 10, DILR: 14, QA: 15 } },
  { id: 'att-4', date: '2026-05-17', rawScore: 58, percentile: 82, sectionScores: { VARC: 18, DILR: 16, QA: 24 } },
  { id: 'att-5', date: '2026-05-31', rawScore: 64, percentile: 85, sectionScores: { VARC: 20, DILR: 18, QA: 26 } },
  { id: 'att-6', date: '2026-06-14', rawScore: 73, percentile: 90, sectionScores: { VARC: 22, DILR: 21, QA: 30 } },
  { id: 'att-7', date: '2026-06-28', rawScore: 81, percentile: 92, sectionScores: { VARC: 25, DILR: 23, QA: 33 } },
]

// One row per answered question across all past attempts.
export const questionAttempts = [
  // VARC
  { id: 'qa-1', section: 'VARC', topic: 'Main Idea & Tone', isCorrect: true, timeTakenSeconds: 85, recommendedTimeSeconds: 90, errorTag: null },
  { id: 'qa-2', section: 'VARC', topic: 'Main Idea & Tone', isCorrect: true, timeTakenSeconds: 95, recommendedTimeSeconds: 90, errorTag: null },
  { id: 'qa-3', section: 'VARC', topic: 'Main Idea & Tone', isCorrect: false, timeTakenSeconds: 200, recommendedTimeSeconds: 90, errorTag: 'time_pressure' },
  { id: 'qa-4', section: 'VARC', topic: 'Para Jumbles', isCorrect: false, timeTakenSeconds: 150, recommendedTimeSeconds: 100, errorTag: 'conceptual_gap' },
  { id: 'qa-5', section: 'VARC', topic: 'Para Jumbles', isCorrect: true, timeTakenSeconds: 110, recommendedTimeSeconds: 100, errorTag: null },
  { id: 'qa-6', section: 'VARC', topic: 'Para Jumbles', isCorrect: false, timeTakenSeconds: 90, recommendedTimeSeconds: 100, errorTag: 'silly_mistake' },
  { id: 'qa-7', section: 'VARC', topic: 'Odd Sentence Out', isCorrect: false, timeTakenSeconds: 130, recommendedTimeSeconds: 70, errorTag: 'conceptual_gap' },
  { id: 'qa-8', section: 'VARC', topic: 'Odd Sentence Out', isCorrect: false, timeTakenSeconds: 160, recommendedTimeSeconds: 70, errorTag: 'conceptual_gap' },

  // DILR
  { id: 'qa-9', section: 'DILR', topic: 'Tables & Caselets', isCorrect: true, timeTakenSeconds: 55, recommendedTimeSeconds: 60, errorTag: null },
  { id: 'qa-10', section: 'DILR', topic: 'Tables & Caselets', isCorrect: true, timeTakenSeconds: 65, recommendedTimeSeconds: 60, errorTag: null },
  { id: 'qa-11', section: 'DILR', topic: 'Tables & Caselets', isCorrect: false, timeTakenSeconds: 140, recommendedTimeSeconds: 60, errorTag: 'time_pressure' },
  { id: 'qa-12', section: 'DILR', topic: 'Seating Arrangements', isCorrect: false, timeTakenSeconds: 320, recommendedTimeSeconds: 150, errorTag: 'conceptual_gap' },
  { id: 'qa-13', section: 'DILR', topic: 'Seating Arrangements', isCorrect: false, timeTakenSeconds: 300, recommendedTimeSeconds: 150, errorTag: 'time_pressure' },
  { id: 'qa-14', section: 'DILR', topic: 'Seating Arrangements', isCorrect: true, timeTakenSeconds: 160, recommendedTimeSeconds: 150, errorTag: null },

  // QA
  { id: 'qa-15', section: 'QA', topic: 'Percentages & P&L', isCorrect: true, timeTakenSeconds: 50, recommendedTimeSeconds: 60, errorTag: null },
  { id: 'qa-16', section: 'QA', topic: 'Percentages & P&L', isCorrect: true, timeTakenSeconds: 55, recommendedTimeSeconds: 60, errorTag: null },
  { id: 'qa-17', section: 'QA', topic: 'Percentages & P&L', isCorrect: true, timeTakenSeconds: 40, recommendedTimeSeconds: 45, errorTag: null },
  { id: 'qa-18', section: 'QA', topic: 'Percentages & P&L', isCorrect: false, timeTakenSeconds: 70, recommendedTimeSeconds: 50, errorTag: 'silly_mistake' },
  { id: 'qa-19', section: 'QA', topic: 'Quadratic Equations', isCorrect: true, timeTakenSeconds: 58, recommendedTimeSeconds: 60, errorTag: null },
  { id: 'qa-20', section: 'QA', topic: 'Quadratic Equations', isCorrect: false, timeTakenSeconds: 95, recommendedTimeSeconds: 60, errorTag: 'conceptual_gap' },
  { id: 'qa-21', section: 'QA', topic: 'Quadratic Equations', isCorrect: false, timeTakenSeconds: 130, recommendedTimeSeconds: 60, errorTag: 'time_pressure' },
]
