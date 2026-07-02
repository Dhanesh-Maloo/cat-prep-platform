import { scoreToPercentile } from './percentileTable'

const MCQ_CORRECT = 3
const MCQ_INCORRECT = -1
const TITA_CORRECT = 3
const TITA_INCORRECT = 0

function isCorrect(question, answer) {
  if (!answer) return false
  if (question.type === 'tita') {
    if (answer.textAnswer === undefined || answer.textAnswer === '') return false
    return String(answer.textAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()
  }
  return answer.selectedIndex === question.correctIndex
}

function isAttempted(question, answer) {
  if (!answer) return false
  if (question.type === 'tita') return answer.textAnswer !== undefined && answer.textAnswer !== ''
  return answer.selectedIndex !== undefined && answer.selectedIndex !== null
}

function pointsFor(question, answer) {
  const attempted = isAttempted(question, answer)
  if (!attempted) return 0
  const correct = isCorrect(question, answer)
  if (question.type === 'tita') return correct ? TITA_CORRECT : TITA_INCORRECT
  return correct ? MCQ_CORRECT : MCQ_INCORRECT
}

/**
 * questions: [{ id, section, type: 'mcq'|'tita', correctIndex?, correctAnswer? }]
 * answers: { [questionId]: { selectedIndex?, textAnswer?, timeTakenSeconds?, markedForReview? } }
 */
export function calculateScore(questions, answers) {
  const sectionScores = {}

  for (const question of questions) {
    const answer = answers[question.id]
    const attempted = isAttempted(question, answer)
    const correct = attempted && isCorrect(question, answer)
    const points = pointsFor(question, answer)

    if (!sectionScores[question.section]) {
      sectionScores[question.section] = {
        raw: 0,
        maxScore: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
      }
    }
    const s = sectionScores[question.section]
    s.raw += points
    s.maxScore += question.type === 'tita' ? TITA_CORRECT : MCQ_CORRECT
    if (attempted) {
      s.attempted += 1
      if (correct) s.correct += 1
      else s.incorrect += 1
    } else {
      s.unattempted += 1
    }
  }

  const totals = Object.values(sectionScores).reduce(
    (acc, s) => ({
      raw: acc.raw + s.raw,
      maxScore: acc.maxScore + s.maxScore,
      attempted: acc.attempted + s.attempted,
      correct: acc.correct + s.correct,
      incorrect: acc.incorrect + s.incorrect,
      unattempted: acc.unattempted + s.unattempted,
    }),
    { raw: 0, maxScore: 0, attempted: 0, correct: 0, incorrect: 0, unattempted: 0 }
  )

  return {
    rawScore: totals.raw,
    maxScore: totals.maxScore,
    attempted: totals.attempted,
    correct: totals.correct,
    incorrect: totals.incorrect,
    unattempted: totals.unattempted,
    sectionScores,
    percentile: scoreToPercentile(totals.raw),
  }
}
