// Placeholder question bank for topic-wise practice. Maps to the `questions` table later.

export const questions = {
  'rc-main-idea-tone': [
    {
      id: 'q1',
      question: 'A passage that uses phrases like "arguably," "it seems," and "one might contend" most likely has a tone that is:',
      options: ['Aggressively dismissive', 'Hedged / cautious', 'Purely celebratory', 'Overtly sarcastic'],
      correctIndex: 1,
      explanation: 'Hedging language ("arguably," "it seems") signals that the author is presenting a claim cautiously rather than asserting it outright - this is a hallmark of a measured, cautious tone rather than an extreme one.',
    },
    {
      id: 'q2',
      question: 'The main idea of a passage is best described as:',
      options: [
        'A list of every fact mentioned in the passage',
        'The single central claim that ties the paragraphs together',
        'The topic of the final paragraph only',
        'The most frequently repeated word',
      ],
      correctIndex: 1,
      explanation: 'The main idea is the unifying argument or thesis, not a checklist of facts or the content of any single paragraph.',
    },
    {
      id: 'q3',
      question: 'An answer option for a tone question that uses the word "always" or "completely" is usually:',
      options: ['Correct, because it is precise', 'Suspicious, since most tones are measured, not extreme', 'Irrelevant to tone questions', 'Only wrong in DILR, not VARC'],
      correctIndex: 1,
      explanation: 'Extreme-language options are a classic trap - CAT passages are rarely absolute in tone, so options with "always/never/completely" should raise suspicion.',
    },
  ],

  'vr-para-jumbles': [
    {
      id: 'q1',
      question: 'Which sentence is LEAST likely to be the opening sentence of a para jumble?',
      options: [
        'One that introduces a general subject or claim',
        'One that begins with "However, this was not the case."',
        'One that names a person or event for the first time',
        'One that states a broad historical fact',
      ],
      correctIndex: 1,
      explanation: 'A sentence starting with "However" requires a preceding contrasting idea, so it cannot logically open the paragraph.',
    },
    {
      id: 'q2',
      question: 'The most efficient first step when solving a para jumble is to:',
      options: [
        'Guess the full order immediately',
        'Find 2-3 confidently linked sentence pairs, then place the resulting chain',
        'Only look at sentence length',
        'Assume alphabetical order of first words',
      ],
      correctIndex: 1,
      explanation: 'Building small, confident chains from clear linking clues (pronouns, connectors) is more reliable than trying to solve the whole order at once.',
    },
    {
      id: 'q3',
      question: 'A pronoun like "it" or "they" appearing early in a sentence usually signals that:',
      options: [
        'The sentence is the opening sentence',
        'The sentence needs a prior sentence establishing what the pronoun refers to',
        'The sentence should be ignored',
        'The paragraph has no clear structure',
      ],
      correctIndex: 1,
      explanation: 'Pronouns without a clear antecedent in the same sentence point back to an earlier sentence, so such sentences are rarely the opener.',
    },
  ],

  'di-tables-caselets': [
    {
      id: 'q1',
      question: 'Before answering the questions in a DI caselet, the highest-leverage first step is to:',
      options: [
        'Answer the easiest question first without organizing data',
        'Convert the prose/caselet into a clean table or diagram',
        'Skip the caselet entirely',
        'Memorize the passage word-for-word',
      ],
      correctIndex: 1,
      explanation: 'Since most caselet questions reuse the same underlying data structure, organizing it into a table upfront saves time across all the questions in the set.',
    },
    {
      id: 'q2',
      question: 'When a question asks for "48% of the total" but options are far apart, the fastest approach is to:',
      options: [
        'Compute the exact decimal value to 4 places',
        'Approximate 48% as roughly half and round the total to a convenient number',
        'Leave the question blank',
        'Assume 48% means 48 out of 48',
      ],
      correctIndex: 1,
      explanation: 'When options are well-spread, approximation is faster and safe; exact computation should be reserved for closely-spaced options.',
    },
    {
      id: 'q3',
      question: 'A common trap in caselet-based DI is:',
      options: [
        'Confusing whether a percentage is of the total or of a subgroup',
        'Reading the table too many times',
        'Using a calculator (not allowed on CAT, so irrelevant here)',
        'Answering questions in order',
      ],
      correctIndex: 0,
      explanation: 'Misreading the base of a percentage (subgroup vs. total) is one of the most common errors in DI caselets.',
    },
  ],

  'qa-percentages': [
    {
      id: 'q1',
      question: 'A price is increased by 20% and then decreased by 10%. What is the net percentage change?',
      options: ['10% increase', '8% increase', '30% increase', '2% decrease'],
      correctIndex: 1,
      explanation: 'Using multiplying factors: 1.20 x 0.90 = 1.08, i.e. a net 8% increase - successive percentage changes do not simply add or subtract.',
    },
    {
      id: 'q2',
      question: 'Profit percentage is always calculated on:',
      options: ['Selling price', 'Cost price', 'Marked price', 'Discount amount'],
      correctIndex: 1,
      explanation: 'Profit % (and loss %) is by convention calculated on the cost price, unless a question explicitly specifies margin on selling price.',
    },
    {
      id: 'q3',
      question: 'A rate rises from 20% to 25%. This is best described as:',
      options: [
        'A 5% increase',
        'A 5 percentage-point increase, which is a 25% relative increase',
        'A 25 percentage-point increase',
        'No real change',
      ],
      correctIndex: 1,
      explanation: 'The absolute rise is 5 percentage points, but relative to the original 20%, that is a 25% increase (5/20) - the two phrasings are easy to conflate.',
    },
    {
      id: 'q4',
      question: '1/8 expressed as a percentage is:',
      options: ['8%', '12.5%', '16.67%', '18%'],
      correctIndex: 1,
      explanation: '1/8 = 0.125 = 12.5%. Memorizing fraction-percentage equivalents up to sixteenths speeds up mental calculation significantly.',
    },
  ],

  'rc-inference': [
    {
      id: 'q1',
      question: 'A passage states "Sales grew every year since the new policy was introduced." Which of these can be validly inferred?',
      options: [
        'The policy caused the sales growth',
        'Sales grew in each year following the policy\'s introduction',
        'Sales would have declined without the policy',
        'The policy was popular with customers',
      ],
      correctIndex: 1,
      explanation: 'Only the restated fact itself is a valid inference - causation, counterfactuals, and popularity are all unsupported extrapolations.',
    },
    {
      id: 'q2',
      question: 'The test for whether an option is a valid inference is:',
      options: [
        'Whether it sounds reasonable',
        'Whether the passage could be true while the option is false',
        'Whether it uses the same vocabulary as the passage',
        'Whether it is the most interesting option',
      ],
      correctIndex: 1,
      explanation: 'If the passage could be true while the option is false, the option is not a necessary logical consequence - so it is not a valid inference.',
    },
    {
      id: 'q3',
      question: 'A passage says "Some experts believe X." An option claiming "Most experts believe X" is:',
      options: ['A valid inference', 'An overreach - too strong relative to "some"', 'Irrelevant to the passage', 'Definitely false'],
      correctIndex: 1,
      explanation: 'Strengthening "some" to "most" goes beyond what the passage supports - a classic inference trap.',
    },
  ],

  'qa-quadratic-equations': [
    {
      id: 'q1',
      question: 'For x² - 5x + 6 = 0, what is the sum of the roots?',
      options: ['-5', '5', '6', '-6'],
      correctIndex: 1,
      explanation: 'Sum of roots = -b/a = -(-5)/1 = 5.',
    },
    {
      id: 'q2',
      question: 'For x² - 5x + 6 = 0, what is the product of the roots?',
      options: ['5', '-5', '6', '-6'],
      correctIndex: 2,
      explanation: 'Product of roots = c/a = 6/1 = 6.',
    },
    {
      id: 'q3',
      question: 'A quadratic has discriminant b² - 4ac = -16. This means:',
      options: ['Two distinct real roots', 'One repeated real root', 'No real roots', 'Roots cannot be determined'],
      correctIndex: 2,
      explanation: 'A negative discriminant means the roots are complex, not real.',
    },
    {
      id: 'q4',
      question: 'x² - 9 = 0. What are the roots?',
      options: ['3 and -3', '9 and -9', '3 only', 'No real roots'],
      correctIndex: 0,
      explanation: 'x² - 9 = (x-3)(x+3) = 0, so x = 3 or x = -3.',
    },
  ],
}

export function getQuestions(subtopicId) {
  return questions[subtopicId] || []
}
