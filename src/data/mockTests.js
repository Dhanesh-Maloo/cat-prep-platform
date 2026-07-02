// Dummy mock test content for building/testing the exam runner UI before
// real question banks are wired up. Durations are shortened from real CAT
// timing (40 min/section) so the full timer/auto-submit flow can be
// exercised quickly during development and manual QA.

export const mockTests = [
  {
    id: 'mock-full-01',
    title: 'CAT Full Mock Test 1 (Dummy)',
    type: 'full',
    sections: [
      { key: 'VARC', name: 'Verbal Ability & Reading Comprehension', durationMinutes: 3 },
      { key: 'DILR', name: 'Data Interpretation & Logical Reasoning', durationMinutes: 3 },
      { key: 'QA', name: 'Quantitative Aptitude', durationMinutes: 3 },
    ],
  },
  {
    id: 'mock-sectional-varc-01',
    title: 'VARC Sectional Test (Dummy)',
    type: 'sectional',
    sections: [{ key: 'VARC', name: 'Verbal Ability & Reading Comprehension', durationMinutes: 3 }],
  },
]

// Real CAT: 40 min/section. Swap the dummy `durationMinutes` above for this
// once real content + realistic pacing is needed.
export const REAL_SECTION_DURATION_MINUTES = 40

export const mockTestQuestions = {
  'mock-full-01': [
    // VARC — 5 questions
    {
      id: 'mt1-varc-1',
      section: 'VARC',
      type: 'mcq',
      question: 'The author\'s tone in the passage about urban migration is best described as:',
      options: ['Alarmist', 'Cautiously optimistic', 'Indifferent', 'Nostalgic'],
      correctIndex: 1,
      explanation: 'The passage acknowledges risks but frames migration trends as a manageable, even beneficial, long-term shift — cautiously optimistic.',
      recommendedTimeSeconds: 90,
    },
    {
      id: 'mt1-varc-2',
      section: 'VARC',
      type: 'mcq',
      question: 'Which sentence most likely opens the jumbled paragraph: "It was later banned in three countries." / "The compound was first synthesized in 1962." / "This led to widespread agricultural use throughout the 1970s." / "Its effects on soil bacteria remained unstudied until 1985."',
      options: [
        'It was later banned in three countries.',
        'The compound was first synthesized in 1962.',
        'This led to widespread agricultural use throughout the 1970s.',
        'Its effects on soil bacteria remained unstudied until 1985.',
      ],
      correctIndex: 1,
      explanation: 'This sentence introduces the subject (a compound, a date) without relying on any prior context — a valid opener.',
      recommendedTimeSeconds: 100,
    },
    {
      id: 'mt1-varc-3',
      section: 'VARC',
      type: 'mcq',
      question: 'The primary purpose of the passage is to:',
      options: ['Refute a popular theory', 'Narrate a historical event', 'Explain a scientific process', 'Compare two economic models'],
      correctIndex: 2,
      explanation: 'The passage walks through the mechanism step by step, which is explanatory rather than argumentative or narrative.',
      recommendedTimeSeconds: 80,
    },
    {
      id: 'mt1-varc-4',
      section: 'VARC',
      type: 'mcq',
      question: 'An "odd sentence out" question asks you to identify the sentence that:',
      options: ['Is grammatically incorrect', 'Does not belong to the paragraph\'s logical flow', 'Is the longest', 'Contains a citation'],
      correctIndex: 1,
      explanation: 'The odd sentence disrupts the logical coherence of the paragraph even if it is grammatically fine on its own.',
      recommendedTimeSeconds: 70,
    },
    {
      id: 'mt1-varc-5',
      section: 'VARC',
      type: 'mcq',
      question: 'Which of these best signals a shift in tone within a passage?',
      options: ['Repetition of the main noun', 'A contrasting connector like "yet" or "however" followed by evaluative language', 'Longer sentences', 'Use of the passive voice'],
      correctIndex: 1,
      explanation: 'Contrast connectors paired with evaluative language are the clearest structural signal of a tonal shift.',
      recommendedTimeSeconds: 80,
    },

    // DILR — 5 questions (mix of mcq/tita)
    {
      id: 'mt1-dilr-1',
      section: 'DILR',
      type: 'mcq',
      question: 'In a caselet where Total = Category A + Category B and 60% of Total is Category A, if Total = 250, what is Category B?',
      options: ['100', '150', '90', '110'],
      correctIndex: 0,
      explanation: 'Category A = 60% of 250 = 150, so Category B = 250 - 150 = 100.',
      recommendedTimeSeconds: 60,
    },
    {
      id: 'mt1-dilr-2',
      section: 'DILR',
      type: 'tita',
      question: 'Five friends sit in a row. A is immediately left of B. C is at one end. If D is exactly in the middle and E is not adjacent to A, how many arrangements satisfy this (enter the count)?',
      correctAnswer: '2',
      explanation: 'Working through the constraints systematically yields exactly 2 valid seatings (C at either end mirrors the arrangement).',
      recommendedTimeSeconds: 150,
    },
    {
      id: 'mt1-dilr-3',
      section: 'DILR',
      type: 'mcq',
      question: 'A table shows quarterly revenue for 4 products. If Product C\'s Q3 revenue is described only as "twice Product A\'s Q2 figure," this is an example of:',
      options: ['Directly given data', 'Derived/inferred data requiring cross-referencing', 'Irrelevant data', 'A contradiction'],
      correctIndex: 1,
      explanation: 'This value must be computed by referencing another cell — classic caselet-style derived data.',
      recommendedTimeSeconds: 70,
    },
    {
      id: 'mt1-dilr-4',
      section: 'DILR',
      type: 'mcq',
      question: 'When two categories overlap in a DI set (e.g., "science students" and "honors students"), the most common trap is:',
      options: ['Ignoring the overlap and double-counting', 'Assuming no students exist', 'Rounding too early', 'Misreading the y-axis'],
      correctIndex: 0,
      explanation: 'Double-counting students who belong to both categories is the classic caselet trap when categories overlap.',
      recommendedTimeSeconds: 60,
    },
    {
      id: 'mt1-dilr-5',
      section: 'DILR',
      type: 'tita',
      question: 'If a table shows Total = 480 split across 4 regions in ratio 2:3:4:3, what is the value of the smallest region (enter the number)?',
      correctAnswer: '80',
      explanation: 'Total parts = 2+3+4+3 = 12. Smallest = 2 parts = (480/12)*2 = 80.',
      recommendedTimeSeconds: 90,
    },

    // QA — 5 questions (mix of mcq/tita)
    {
      id: 'mt1-qa-1',
      section: 'QA',
      type: 'mcq',
      question: 'A price is increased by 25% and then decreased by 20%. What is the net change?',
      options: ['5% increase', 'No change', '5% decrease', '10% increase'],
      correctIndex: 1,
      explanation: 'Multiplying factors: 1.25 x 0.80 = 1.00 — exactly no net change.',
      recommendedTimeSeconds: 60,
    },
    {
      id: 'mt1-qa-2',
      section: 'QA',
      type: 'tita',
      question: 'What is 1/6 expressed as a percentage, rounded to two decimal places (enter just the number, e.g. 12.50)?',
      correctAnswer: '16.67',
      explanation: '1/6 = 0.16666... = 16.67% rounded to two decimals.',
      recommendedTimeSeconds: 45,
    },
    {
      id: 'mt1-qa-3',
      section: 'QA',
      type: 'mcq',
      question: 'x^2 - 5x + 6 = 0. What are the roots?',
      options: ['2 and 3', '1 and 6', '-2 and -3', '2 and -3'],
      correctIndex: 0,
      explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3.',
      recommendedTimeSeconds: 60,
    },
    {
      id: 'mt1-qa-4',
      section: 'QA',
      type: 'mcq',
      question: 'A shopkeeper marks up an item by 40% then offers a 20% discount. What is his overall profit percentage on cost price?',
      options: ['20%', '12%', '8%', '16%'],
      correctIndex: 1,
      explanation: 'Multiplying factors: 1.40 x 0.80 = 1.12, i.e. a 12% profit on cost price.',
      recommendedTimeSeconds: 75,
    },
    {
      id: 'mt1-qa-5',
      section: 'QA',
      type: 'tita',
      question: 'The cost price of an item is 200. It is sold at a 15% loss. What is the selling price (enter just the number)?',
      correctAnswer: '170',
      explanation: 'Selling price = 200 x (1 - 0.15) = 200 x 0.85 = 170.',
      recommendedTimeSeconds: 50,
    },
  ],

  'mock-sectional-varc-01': [
    {
      id: 'mts1-varc-1',
      section: 'VARC',
      type: 'mcq',
      question: 'The passage argues that remote work "flattens" corporate hierarchies. This claim is best supported by:',
      options: ['Anecdotes from a single company', 'A cited multi-year survey across industries', 'The author\'s personal opinion', 'A dictionary definition of "flat"'],
      correctIndex: 1,
      explanation: 'A cited multi-year cross-industry survey is the strongest form of evidence among the options for a general claim.',
      recommendedTimeSeconds: 90,
    },
    {
      id: 'mts1-varc-2',
      section: 'VARC',
      type: 'mcq',
      question: 'Which sentence best fits as the concluding sentence of a paragraph arguing that a policy had unintended consequences?',
      options: [
        'The policy was introduced in 2015.',
        'Thus, what began as a cost-saving measure ultimately raised costs elsewhere.',
        'Many policies are introduced each year.',
        'The department responsible has since been renamed.',
      ],
      correctIndex: 1,
      explanation: 'This sentence explicitly ties back to the "unintended consequences" thesis, making it the natural concluding statement.',
      recommendedTimeSeconds: 80,
    },
    {
      id: 'mts1-varc-3',
      section: 'VARC',
      type: 'mcq',
      question: 'An author who repeatedly hedges claims with "some evidence suggests" is likely trying to:',
      options: ['Persuade through repetition', 'Signal appropriate uncertainty given limited data', 'Confuse the reader', 'Pad the word count'],
      correctIndex: 1,
      explanation: 'Repeated hedging is a standard academic signal of appropriate epistemic caution, not a rhetorical trick.',
      recommendedTimeSeconds: 70,
    },
    {
      id: 'mts1-varc-4',
      section: 'VARC',
      type: 'mcq',
      question: 'In a passage comparing two economic theories, the author spends 80% of the space on Theory A\'s flaws. The likely purpose is to:',
      options: ['Present a balanced overview', 'Advocate for Theory B by contrast', 'Summarize Theory A neutrally', 'Introduce a third theory'],
      correctIndex: 1,
      explanation: 'Disproportionate space spent critiquing one side, without balancing critique of the other, signals implicit advocacy for the alternative.',
      recommendedTimeSeconds: 85,
    },
    {
      id: 'mts1-varc-5',
      section: 'VARC',
      type: 'mcq',
      question: 'Which of these is the clearest signal that a paragraph is about to introduce a counterargument?',
      options: ['A repeated key term', 'A transition like "Critics contend, however,"', 'A long list of examples', 'A rhetorical question'],
      correctIndex: 1,
      explanation: '"Critics contend, however," is an explicit, unambiguous counterargument signal.',
      recommendedTimeSeconds: 75,
    },
  ],
}

export function getMockTest(mockTestId) {
  const test = mockTests.find((t) => t.id === mockTestId)
  const questions = mockTestQuestions[mockTestId] || []
  return test ? { ...test, questions } : null
}
