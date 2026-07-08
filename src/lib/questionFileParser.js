// Parses a plain-text (or PDF-extracted-text) question file into question objects
// ready for bulk insert. Format:
//
//   Q: <question text, can wrap across lines>
//   A) <option>
//   B) <option>
//   C) <option>
//   D) <option>
//   ANSWER: B
//   EXPLANATION: <text, can wrap across lines>
//   DIFFICULTY: Beginner | Intermediate | Advanced   (optional, defaults to Beginner)
//
// For TITA (no options) questions, omit A-D and set TYPE: TITA, with ANSWER
// as the free-text correct answer instead of a letter. Each question starts
// with a new "Q:" line - everything up to the next "Q:" line belongs to it.

const QUESTION_START_RE = /^Q\s*[:.]\s*(.*)$/i
const OPTION_RE = /^([A-D])[).:-]\s*(.*)$/
const FIELD_RE = /^(TYPE|ANSWER|EXPLANATION|DIFFICULTY)\s*:\s*(.*)$/i
const LETTERS = ['A', 'B', 'C', 'D']

function normalizeDifficulty(value) {
  const v = (value || '').toLowerCase()
  if (v.startsWith('int')) return 'Intermediate'
  if (v.startsWith('adv')) return 'Advanced'
  return 'Beginner'
}

function parseBlock(lines) {
  let questionText = ''
  let explanation = ''
  const options = {}
  let type = null
  let answer = null
  let difficulty = 'Beginner'
  let mode = 'question'

  for (const line of lines) {
    const optMatch = line.match(OPTION_RE)
    if (optMatch) {
      options[optMatch[1].toUpperCase()] = optMatch[2].trim()
      mode = 'question'
      continue
    }
    const fieldMatch = line.match(FIELD_RE)
    if (fieldMatch) {
      const key = fieldMatch[1].toUpperCase()
      const value = fieldMatch[2].trim()
      if (key === 'TYPE') type = value.toUpperCase()
      else if (key === 'ANSWER') answer = value
      else if (key === 'DIFFICULTY') difficulty = normalizeDifficulty(value)
      else if (key === 'EXPLANATION') {
        explanation = value
        mode = 'explanation'
      }
      continue
    }
    if (mode === 'explanation') explanation = explanation ? `${explanation} ${line}` : line
    else questionText = questionText ? `${questionText} ${line}` : line
  }

  questionText = questionText.trim()
  explanation = explanation.trim()

  if (!questionText) throw new Error('Missing question text')
  if (!answer) throw new Error('Missing ANSWER')
  if (!explanation) throw new Error('Missing EXPLANATION')

  const hasOptions = LETTERS.some((k) => options[k])
  const resolvedType = type || (hasOptions ? 'MCQ' : 'TITA')

  if (resolvedType === 'MCQ') {
    const orderedOptions = LETTERS.map((k) => options[k])
    if (orderedOptions.some((o) => !o)) throw new Error('MCQ questions need options A, B, C, and D')
    const answerLetter = answer.trim().toUpperCase()
    const correctIndex = LETTERS.indexOf(answerLetter)
    if (correctIndex === -1) throw new Error(`ANSWER must be A, B, C, or D for an MCQ (got "${answer}")`)
    return { type: 'mcq', question: questionText, options: orderedOptions, correctIndex, explanation, difficulty }
  }

  return { type: 'tita', question: questionText, correctAnswer: answer.trim(), explanation, difficulty }
}

/**
 * Returns { questions, errors }. Errors reference the 1-based position of the
 * question block within the file so they can be shown for review without
 * blocking the questions that parsed successfully.
 */
export function parseQuestionsText(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim())
  const blocks = []
  let current = null

  for (const line of lines) {
    if (!line) continue
    const qMatch = line.match(QUESTION_START_RE)
    if (qMatch) {
      if (current) blocks.push(current)
      current = [qMatch[1]].filter(Boolean)
      continue
    }
    if (current) current.push(line)
  }
  if (current) blocks.push(current)

  const questions = []
  const errors = []
  blocks.forEach((lines, i) => {
    try {
      questions.push(parseBlock(lines))
    } catch (err) {
      errors.push({ position: i + 1, message: err.message, preview: lines.join(' ').slice(0, 80) })
    }
  })

  return { questions, errors }
}
