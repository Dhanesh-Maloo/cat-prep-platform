import { describe, expect, it } from 'vitest'
import { parseQuestionsText } from './questionFileParser'

describe('parseQuestionsText', () => {
  it('parses a well-formed MCQ question', () => {
    const text = `
Q: What is 1/8 as a percentage?
A) 8%
B) 12.5%
C) 18%
D) 80%
ANSWER: B
EXPLANATION: 1/8 = 0.125 = 12.5%.
DIFFICULTY: Beginner
`
    const { questions, errors } = parseQuestionsText(text)
    expect(errors).toHaveLength(0)
    expect(questions).toHaveLength(1)
    expect(questions[0]).toEqual({
      type: 'mcq',
      question: 'What is 1/8 as a percentage?',
      options: ['8%', '12.5%', '18%', '80%'],
      correctIndex: 1,
      explanation: '1/8 = 0.125 = 12.5%.',
      difficulty: 'Beginner',
    })
  })

  it('parses multiple questions separated by Q: lines', () => {
    const text = `
Q: First question?
A) a
B) b
C) c
D) d
ANSWER: A
EXPLANATION: because a.

Q: Second question?
A) w
B) x
C) y
D) z
ANSWER: C
EXPLANATION: because y.
`
    const { questions, errors } = parseQuestionsText(text)
    expect(errors).toHaveLength(0)
    expect(questions).toHaveLength(2)
    expect(questions[0].question).toBe('First question?')
    expect(questions[1].question).toBe('Second question?')
    expect(questions[1].correctIndex).toBe(2)
  })

  it('joins multi-line question and explanation text', () => {
    const text = `
Q: A price is increased by 20% and then
decreased by 10%. What is the net change?
A) 10% increase
B) 8% increase
C) 8% decrease
D) No change
ANSWER: B
EXPLANATION: Use multiplying factors: 1.2 x 0.9 = 1.08,
a net 8% increase.
`
    const { questions, errors } = parseQuestionsText(text)
    expect(errors).toHaveLength(0)
    expect(questions[0].question).toBe(
      'A price is increased by 20% and then decreased by 10%. What is the net change?'
    )
    expect(questions[0].explanation).toBe('Use multiplying factors: 1.2 x 0.9 = 1.08, a net 8% increase.')
  })

  it('parses a TITA question with a free-text answer', () => {
    const text = `
Q: What is the value of x if 2x + 3 = 11?
TYPE: TITA
ANSWER: 4
EXPLANATION: 2x = 8, so x = 4.
DIFFICULTY: Intermediate
`
    const { questions, errors } = parseQuestionsText(text)
    expect(errors).toHaveLength(0)
    expect(questions[0]).toEqual({
      type: 'tita',
      question: 'What is the value of x if 2x + 3 = 11?',
      correctAnswer: '4',
      explanation: '2x = 8, so x = 4.',
      difficulty: 'Intermediate',
    })
  })

  it('parses a TITA question without an explicit DIFFICULTY, defaulting to Beginner', () => {
    const text = `
Q: What is the remainder when 17 is divided by 5?
TYPE: TITA
ANSWER: 2
EXPLANATION: 17 = 3*5 + 2.
`
    const { questions, errors } = parseQuestionsText(text)
    expect(errors).toHaveLength(0)
    expect(questions[0]).toEqual({
      type: 'tita',
      question: 'What is the remainder when 17 is divided by 5?',
      correctAnswer: '2',
      explanation: '17 = 3*5 + 2.',
      difficulty: 'Beginner',
    })
  })

  it('infers TITA when no options are given, even without an explicit TYPE', () => {
    const text = `
Q: What is 7 x 8?
ANSWER: 56
EXPLANATION: 7 x 8 = 56.
`
    const { questions, errors } = parseQuestionsText(text)
    expect(errors).toHaveLength(0)
    expect(questions[0].type).toBe('tita')
    expect(questions[0].correctAnswer).toBe('56')
  })

  it('reports an error for a question missing an option, without dropping other valid questions', () => {
    const text = `
Q: Broken question - missing option D?
A) a
B) b
C) c
ANSWER: A
EXPLANATION: because a.

Q: Valid question?
A) a
B) b
C) c
D) d
ANSWER: D
EXPLANATION: because d.
`
    const { questions, errors } = parseQuestionsText(text)
    expect(questions).toHaveLength(1)
    expect(questions[0].question).toBe('Valid question?')
    expect(errors).toHaveLength(1)
    expect(errors[0].position).toBe(1)
    expect(errors[0].message).toMatch(/options A, B, C, and D/)
  })

  it('reports an error when ANSWER is not one of A-D for an MCQ', () => {
    const text = `
Q: Which option is correct?
A) a
B) b
C) c
D) d
ANSWER: E
EXPLANATION: some explanation.
`
    const { questions, errors } = parseQuestionsText(text)
    expect(questions).toHaveLength(0)
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toMatch(/ANSWER must be A, B, C, or D/)
  })

  it('reports an error when EXPLANATION is missing', () => {
    const text = `
Q: Incomplete question?
A) a
B) b
C) c
D) d
ANSWER: A
`
    const { questions, errors } = parseQuestionsText(text)
    expect(questions).toHaveLength(0)
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toMatch(/Missing EXPLANATION/)
  })

  it('returns no questions and no errors for empty input', () => {
    const { questions, errors } = parseQuestionsText('')
    expect(questions).toHaveLength(0)
    expect(errors).toHaveLength(0)
  })

  it('normalizes difficulty values loosely', () => {
    const text = `
Q: Q1?
A) a
B) b
C) c
D) d
ANSWER: A
EXPLANATION: e.
DIFFICULTY: advanced level
`
    const { questions } = parseQuestionsText(text)
    expect(questions[0].difficulty).toBe('Advanced')
  })
})
