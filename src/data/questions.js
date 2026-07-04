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
  'geo-triangles-circles': [
    {
      id: 'q1',
      question: 'A right-angled triangle has legs of length 9 cm and 12 cm. What is the radius of the circle inscribed in this triangle?',
      options: ['2 cm', '3 cm', '4 cm', '4.5 cm'],
      correctIndex: 1,
      explanation: 'The hypotenuse = sqrt(9^2 + 12^2) = sqrt(81+144) = sqrt(225) = 15 cm. For a right triangle, the inradius r = (sum of legs - hypotenuse) / 2 = (9 + 12 - 15) / 2 = 6/2 = 3 cm.',
    },
    {
      id: 'q2',
      question: 'Two circles have radii 9 cm and 4 cm. The distance between their centers is 13 cm. What is the length of the direct common tangent to the two circles?',
      options: ['10 cm', '11 cm', '12 cm', '13 cm'],
      correctIndex: 2,
      explanation: 'Length of direct common tangent = sqrt(d^2 - (r1 - r2)^2). Here d = 13, r1 - r2 = 5. Length = sqrt(13^2 - 5^2) = sqrt(169 - 25) = sqrt(144) = 12 cm.',
    },
    {
      id: 'q3',
      question: 'Triangle ABC is inscribed in a circle. Angle B = 68 degrees. What is the angle subtended by side AC at the center of the circle?',
      options: ['90 degrees', '112 degrees', '136 degrees', '144 degrees'],
      correctIndex: 2,
      explanation: 'By the inscribed angle theorem, the angle subtended by an arc at the center is exactly double the angle subtended at the circumference by the same arc. So the angle at the center = 2 x angle B = 2 x 68 = 136 degrees.',
    },
  ],

  'geo-mensuration': [
    {
      id: 'q1',
      question: 'A cone has a base radius of 7 cm and a height of 24 cm. What is its curved surface area? (Use pi = 22/7)',
      options: ['440 sq cm', '550 sq cm', '616 sq cm', '704 sq cm'],
      correctIndex: 1,
      explanation: 'Slant height l = sqrt(r^2 + h^2) = sqrt(7^2 + 24^2) = sqrt(625) = 25 cm. Curved surface area = pi * r * l = (22/7) * 7 * 25 = 22 * 25 = 550 sq cm.',
    },
    {
      id: 'q2',
      question: 'A solid cylinder of radius 6 cm and height 12 cm is melted and recast into solid spheres of radius 3 cm each. How many complete spheres can be formed?',
      options: ['9', '10', '12', '16'],
      correctIndex: 2,
      explanation: 'Volume of cylinder = pi * 6^2 * 12 = 432*pi. Volume of one sphere = (4/3) * pi * 3^3 = 36*pi. Number of spheres = 432*pi / 36*pi = 12.',
    },
    {
      id: 'q3',
      question: 'A cuboid-shaped box has length 12 cm, width 9 cm, and height 8 cm. What is the length of its space diagonal?',
      options: ['15 cm', '16 cm', '17 cm', '19 cm'],
      correctIndex: 2,
      explanation: 'Space diagonal = sqrt(l^2 + w^2 + h^2) = sqrt(144 + 81 + 64) = sqrt(289) = 17 cm.',
    },
  ],

  'geo-coordinate': [
    {
      id: 'q1',
      question: 'What is the area of the triangle formed by the points A(1,2), B(4,6), and C(6,2)?',
      options: ['8 sq units', '9 sq units', '10 sq units', '12 sq units'],
      correctIndex: 2,
      explanation: 'Area = (1/2) * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| = (1/2) * |1(4) + 4(0) + 6(-4)| = (1/2) * |4 - 24| = 10 sq units.',
    },
    {
      id: 'q2',
      question: 'A line passes through the points (2,3) and (6,11). At what point does this line cross the x-axis?',
      options: ['(0.5, 0)', '(1, 0)', '(1.5, 0)', '(2, 0)'],
      correctIndex: 0,
      explanation: 'Slope = (11-3)/(6-2) = 2. Using point-slope form: y - 3 = 2(x-2), so y = 2x - 1. Setting y=0: x = 0.5. The line crosses the x-axis at (0.5, 0).',
    },
    {
      id: 'q3',
      question: 'A circle has its center at (3,4) and passes through the point (7,1). What is the radius of the circle?',
      options: ['4 units', '5 units', '6 units', '7 units'],
      correctIndex: 1,
      explanation: 'Radius = distance from center to a point on the circle = sqrt((7-3)^2 + (1-4)^2) = sqrt(16+9) = sqrt(25) = 5 units.',
    },
  ],

  'ns-divisibility-lcm-hcf': [
    {
      id: 'q1',
      question: 'The product of two numbers is 3600. If their HCF is 12, what is their LCM?',
      options: ['200', '250', '300', '360'],
      correctIndex: 2,
      explanation: 'For any two numbers, LCM x HCF = product of the numbers. So LCM = 3600 / 12 = 300.',
    },
    {
      id: 'q2',
      question: 'Three bells ring at intervals of 12, 18, and 24 minutes respectively. If they all ring together at 8:00 AM, at what time will they next ring together?',
      options: ['9:00 AM', '9:12 AM', '9:36 AM', '10:12 AM'],
      correctIndex: 1,
      explanation: 'LCM(12,18,24): 12=2^2x3, 18=2x3^2, 24=2^3x3, so LCM = 2^3 x 3^2 = 72 minutes. Adding 72 minutes to 8:00 AM gives 9:12 AM.',
    },
    {
      id: 'q3',
      question: 'What is the smallest number which, when divided by 6, 8, and 15, leaves a remainder of 5 in each case?',
      options: ['115', '120', '125', '135'],
      correctIndex: 2,
      explanation: 'LCM(6,8,15): 6=2x3, 8=2^3, 15=3x5, so LCM = 2^3 x 3 x 5 = 120. The required number is LCM + remainder = 120 + 5 = 125.',
    },
  ],

  'ns-remainders-factors': [
    {
      id: 'q1',
      question: 'What is the remainder when 7^100 is divided by 5?',
      options: ['1', '2', '3', '4'],
      correctIndex: 0,
      explanation: 'Remainders of powers of 7 mod 5 cycle with period 4: 2,4,3,1. Since 100 is exactly divisible by 4, 7^100 mod 5 equals the 4th term in the cycle, which is 1.',
    },
    {
      id: 'q2',
      question: 'How many total factors does 360 have?',
      options: ['20', '22', '24', '28'],
      correctIndex: 2,
      explanation: 'Prime factorize 360 = 2^3 x 3^2 x 5^1. Number of factors = (3+1)(2+1)(1+1) = 24.',
    },
    {
      id: 'q3',
      question: 'A number, when divided by 7, leaves a remainder of 3. What is the remainder when the square of the same number is divided by 7?',
      options: ['1', '2', '4', '6'],
      correctIndex: 1,
      explanation: 'If N mod 7 = 3, then N^2 mod 7 = 9 mod 7 = 2.',
    },
  ],

  'mm-permutation-combination': [
    {
      id: 'q1',
      question: 'In how many distinct ways can the letters of the word STATISTICS be arranged?',
      options: ['50400', '75600', '100800', '151200'],
      correctIndex: 0,
      explanation: 'STATISTICS has 10 letters: S appears 3 times, T appears 3 times, I appears 2 times. Total arrangements = 10! / (3! x 3! x 2!) = 3628800 / 72 = 50400.',
    },
    {
      id: 'q2',
      question: 'A committee of 5 people is to be selected from 6 men and 4 women such that the committee has at least 2 women. In how many ways can this be done?',
      options: ['156', '186', '210', '246'],
      correctIndex: 1,
      explanation: '2W3M: C(4,2)xC(6,3)=6x20=120. 3W2M: C(4,3)xC(6,2)=4x15=60. 4W1M: C(4,4)xC(6,1)=1x6=6. Total = 120+60+6 = 186.',
    },
    {
      id: 'q3',
      question: 'In how many ways can 8 distinct people be seated around a circular table?',
      options: ['5040', '20160', '40320', '2520'],
      correctIndex: 0,
      explanation: 'Circular arrangements of n distinct objects = (n-1)!. For 8 people: 7! = 5040.',
    },
  ],

  'mm-probability': [
    {
      id: 'q1',
      question: 'Two fair dice are rolled together. What is the probability that the sum of the numbers shown is 8?',
      options: ['5/36', '1/6', '7/36', '1/9'],
      correctIndex: 0,
      explanation: 'Total outcomes = 36. Outcomes summing to 8: (2,6),(3,5),(4,4),(5,3),(6,2) = 5 outcomes. Probability = 5/36.',
    },
    {
      id: 'q2',
      question: 'A card is drawn at random from a standard deck of 52 cards. What is the probability that it is a king or a heart?',
      options: ['4/13', '17/52', '1/4', '5/13'],
      correctIndex: 0,
      explanation: 'P(king)=4/52, P(heart)=13/52, P(king of hearts)=1/52. P(king or heart) = 4/52+13/52-1/52 = 16/52 = 4/13.',
    },
    {
      id: 'q3',
      question: 'A bag contains 5 red balls and 3 blue balls. Two balls are drawn at random without replacement. What is the probability that both balls are of the same color?',
      options: ['13/28', '11/28', '15/28', '1/2'],
      correctIndex: 0,
      explanation: 'Total ways C(8,2)=28. Both red: C(5,2)=10. Both blue: C(3,2)=3. Favorable = 13. Probability = 13/28.',
    },
  ],

  'mm-set-theory-functions': [
    {
      id: 'q1',
      question: 'In a class of 60 students, 25 play cricket, 20 play football, and 10 play both cricket and football. How many students play neither sport?',
      options: ['20', '25', '30', '35'],
      correctIndex: 1,
      explanation: '|C union F| = 25+20-10 = 35. Neither = 60-35 = 25.',
    },
    {
      id: 'q2',
      question: 'If f(x) = 2x + 3 and g(x) = x^2 - 1, what is the value of f(g(2))?',
      options: ['7', '9', '11', '13'],
      correctIndex: 1,
      explanation: 'g(2) = 4-1 = 3. f(3) = 2(3)+3 = 9.',
    },
    {
      id: 'q3',
      question: 'If |A| = 30, |B| = 25, and |A union B| = 45, what is |A intersect B|?',
      options: ['5', '10', '15', '20'],
      correctIndex: 1,
      explanation: '|A intersect B| = |A|+|B|-|A union B| = 30+25-45 = 10.',
    },
  ],
  'rc-author-purpose': [
    {
      id: 'q1',
      question: 'A passage argues that urban rewilding projects reduce local temperatures, then adds: "Critics point out that such projects can also displace low-income residents through rising property values, a cost rarely factored into their published benefits." Why does the author most likely include this sentence?',
      options: [
        'To prove that rewilding projects are ultimately harmful and should be abandoned',
        'To qualify the earlier claim by acknowledging a significant social cost the initial framing omitted',
        'To provide statistical evidence that contradicts the temperature-reduction claim',
        "To introduce a new topic unrelated to the passage's main argument",
      ],
      correctIndex: 1,
      explanation: '"Critics point out" signals a qualification, not a reversal of the whole argument. The author is not condemning rewilding (too extreme) or presenting data against the temperature claim (displacement is a social cost, not a rebuttal). It is directly connected to the previous claim, so it is not off-topic. The function is to add balance by naming an overlooked cost.',
    },
    {
      id: 'q2',
      question: 'In a passage that spends its first three paragraphs praising a company\'s innovation record before a final paragraph beginning "Yet none of this explains why the company\'s market share has fallen every year since 2019," what is the relationship between the final paragraph and the rest of the passage?',
      options: [
        'It summarizes the same point made in the earlier paragraphs using different words',
        "It presents a complication that the earlier praise does not account for, shifting the passage's focus",
        'It provides additional evidence supporting the claims made in the first three paragraphs',
        'It is unrelated background information included for context',
      ],
      correctIndex: 1,
      explanation: '"Yet" is a strong contrast signal, and the content that follows (falling market share) is not explained by the earlier praise - this is a complication, not a summary or supporting evidence, and it is clearly tied to the passage\'s central subject.',
    },
    {
      id: 'q3',
      question: 'Which of the following, if used to describe an author\'s purpose, is LEAST likely to be correct for a typical CAT RC passage (which tend to be analytical rather than polemical)?',
      options: [
        'To illustrate a general claim with a specific example',
        'To contrast two differing scholarly interpretations of an event',
        'To conclusively prove that one viewpoint is entirely correct and all others are false',
        'To qualify an earlier statement by noting an exception',
      ],
      correctIndex: 2,
      explanation: 'CAT passages are usually analytical or journalistic, presenting multiple perspectives rather than asserting absolute certainty. An option claiming the author "conclusively proves" a single viewpoint uses extreme, one-sided language that rarely matches the measured tone of actual CAT passages.',
    },
  ],

  'rc-vocabulary-context': [
    {
      id: 'q1',
      question: 'In the sentence, "The committee decided to table the controversial proposal until further consultations could be held," the word "table" most nearly means:',
      options: [
        'To formally introduce a proposal for discussion',
        'To postpone or set aside a matter for later consideration',
        'To place a physical document on a surface',
        'To reject a proposal permanently',
      ],
      correctIndex: 1,
      explanation: 'The surrounding context, "until further consultations could be held," indicates a delay. This is a word with a secondary meaning (to postpone) that only becomes clear from context.',
    },
    {
      id: 'q2',
      question: 'A passage describes a critic\'s review as "a masterclass in faint praise, admiring the novel\'s ambition while quietly noting that ambition alone does not make a good book." The word "quietly" in this context suggests the criticism is:',
      options: [
        'Loud and aggressive in tone',
        'Subtle and understated, delivered without overt hostility',
        'Completely absent from the review',
        'Focused entirely on praising the novel',
      ],
      correctIndex: 1,
      explanation: '"Faint praise" already signals a backhanded compliment, and "quietly noting" reinforces that the criticism is embedded subtly rather than stated directly or aggressively.',
    },
    {
      id: 'q3',
      question: 'In the sentence, "Her novel approach to the problem impressed the judges, even though some of her methods were unconventional," the word "novel" functions as:',
      options: [
        'A noun referring to a work of long-form fiction',
        'An adjective meaning new and original',
        'A verb meaning to write fiction',
        'An adjective meaning old-fashioned and outdated',
      ],
      correctIndex: 1,
      explanation: '"Novel approach" uses "novel" as an adjective describing the approach as new and original, consistent with "impressed the judges" and "unconventional."',
    },
  ],

  'vr-para-summary': [
    {
      id: 'q1',
      question: 'Paragraph: "Remote work was initially embraced by companies as a cost-cutting measure, reducing spending on office real estate. Over time, however, many organizations found that collaboration and mentorship suffered when teams were fully distributed. Several large firms have since introduced hybrid models that mandate a minimum number of in-office days, arguing that this balances cost savings with the benefits of in-person interaction." Which option best summarizes this paragraph?',
      options: [
        'Remote work is a failed experiment that most companies now regret adopting',
        'Companies initially adopted remote work for cost reasons but shifted to hybrid models after finding collaboration suffered',
        'Office real estate costs are the single biggest factor driving corporate location decisions',
        'Employees generally resist hybrid work mandates imposed by large firms',
      ],
      correctIndex: 1,
      explanation: 'The paragraph traces cost-driven adoption, a collaboration problem, and a hybrid compromise. Option B captures this full arc without the extremity of A, the narrow focus of C, or the unsupported claim in D.',
    },
    {
      id: 'q2',
      question: 'Paragraph: "Microfinance was once hailed as a powerful tool for lifting households out of poverty by providing small loans to those excluded from traditional banking. Subsequent studies, however, found that while microloans modestly increased business investment, they did not produce the dramatic gains in income or well-being that early advocates had promised. Some researchers now argue that microfinance is best understood as a useful but limited financial tool, not a comprehensive poverty solution." Which option best captures the essence of this paragraph?',
      options: [
        'Microfinance has been proven to be completely ineffective at helping the poor',
        'Early enthusiasm for microfinance as a poverty cure has given way to a more modest view of it as a limited but useful tool',
        'Traditional banks should adopt microfinance practices to serve excluded households',
        'Researchers unanimously agree that microfinance should be discontinued worldwide',
      ],
      correctIndex: 1,
      explanation: 'The paragraph shows a shift from a grand initial claim to a tempered, evidence-based conclusion, which option B mirrors precisely. A overstates the finding, C is not discussed, and D falsely claims unanimous agreement.',
    },
    {
      id: 'q3',
      question: 'Paragraph: "Coral reefs occupy less than one percent of the ocean floor, yet they support roughly a quarter of all marine species, making them disproportionately important to ocean biodiversity. Rising sea temperatures have triggered widespread coral bleaching, which weakens reefs and threatens the vast web of species that depend on them. Conservationists argue that protecting even small, resilient reef patches could help preserve much of this biodiversity if warming is slowed in time." Which option best summarizes this paragraph?',
      options: [
        'Coral reefs cover a small fraction of the ocean and are declining in size every year',
        'Despite their small area, coral reefs support disproportionate biodiversity that is now threatened by warming, though protecting resilient patches may help preserve it',
        'Marine biodiversity is no longer a priority for conservationists worldwide',
        'Sea temperature increases only affect coral reefs and no other marine ecosystems',
      ],
      correctIndex: 1,
      explanation: 'Option B captures all three moves: disproportionate importance, the warming threat, and the conservation possibility. The others either restate only one fact, contradict the passage, or overgeneralize a claim never made.',
    },
  ],

  'vr-sentence-elimination': [
    {
      id: 'q1',
      question: '1. Urban beekeeping has grown rapidly in cities across the world over the past decade.\n2. City-kept bees often produce more honey than their rural counterparts due to the diversity of urban flowering plants.\n3. Honeybee populations have declined sharply in agricultural regions due to pesticide use.\n4. Municipal governments have responded by relaxing zoning rules that once prohibited hives in residential areas.\n5. Enthusiast groups now offer training programs to help new urban beekeepers get started safely.\n\nWhich sentence does NOT belong with the rest?',
      options: ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'],
      correctIndex: 2,
      explanation: 'Sentences 1, 2, 4, and 5 stay focused on urban beekeeping: its growth, a benefit, a regulatory response, and support infrastructure. Sentence 3 shifts to rural agricultural pesticide use, a related but distinct issue none of the others reference.',
    },
    {
      id: 'q2',
      question: "1. The museum's new wing was designed to house its growing collection of contemporary sculpture.\n2. Construction delays pushed the opening back by nearly eighteen months.\n3. The architect drew inspiration from the region's traditional courtyard houses.\n4. Renaissance painting techniques relied heavily on the use of linear perspective.\n5. Visitors have praised the natural light that floods the main gallery space.\n\nWhich sentence does NOT belong with the rest?",
      options: ['Sentence 2', 'Sentence 3', 'Sentence 4', 'Sentence 5'],
      correctIndex: 2,
      explanation: "Sentences 1, 2, 3, and 5 form a coherent narrative about the museum's new wing. Sentence 4 introduces an entirely different subject, Renaissance painting technique, with no connection to the museum wing.",
    },
    {
      id: 'q3',
      question: '1. Electric vehicle sales in the country crossed one million units for the first time last year.\n2. Battery costs have fallen by nearly forty percent over the past five years, making EVs more affordable.\n3. Government subsidies have played a significant role in accelerating consumer adoption.\n4. Traditional automakers are now investing heavily in electric vehicle production lines.\n5. Coffee consumption has risen steadily among young professionals in urban areas.\n\nWhich sentence does NOT belong with the rest?',
      options: ['Sentence 2', 'Sentence 3', 'Sentence 4', 'Sentence 5'],
      correctIndex: 3,
      explanation: 'Sentences 1 through 4 build a coherent paragraph about the rise of electric vehicles. Sentence 5, about coffee consumption, is completely unrelated and shares no logical link with any other sentence.',
    },
  ],
  'di-bar-line-pie': [
    {
      id: 'q1',
      question: 'A pie chart shows the market share of five smartphone brands in a city. Brand A has a 90-degree slice and total smartphone sales in the city were 48,000 units. How many units did Brand A sell?',
      options: ['10,000', '12,000', '14,000', '16,000'],
      correctIndex: 1,
      explanation: 'A 90-degree slice out of 360 degrees represents 90/360 = 1/4 of the total. Brand A sold 48,000 x 1/4 = 12,000 units.',
    },
    {
      id: 'q2',
      question: "A line graph plots the revenue (Rs. crore) of two companies from 2019 to 2023. Company X's revenue in successive years is 40, 50, 60, 70, 80. Company Y's revenue in successive years is 90, 80, 70, 60, 50. In which year does Company X's revenue first exceed Company Y's?",
      options: ['2020', '2021', '2022', '2023'],
      correctIndex: 2,
      explanation: 'Comparing year by year: 2019 X=40 < Y=90; 2020 X=50 < Y=80; 2021 X=60 < Y=70; 2022 X=70 > Y=60 - this is the first year X exceeds Y. Locating the exact crossover by checking each year in turn, rather than assuming a trend extrapolates, is the key skill this question tests.',
    },
    {
      id: 'q3',
      question: 'A bar chart shows the number of units produced by four factories (P, Q, R, S) in a month: P = 320, Q = 280, R = 410, S = 190. If factory R\'s production is reduced by 25% next month while the others remain unchanged, what will be the new percentage share of factory R in the total output (rounded to the nearest whole number)?',
      options: ['22%', '25%', '28%', '31%'],
      correctIndex: 2,
      explanation: 'New R = 410 x 0.75 = 307.5. New total = 320 + 280 + 307.5 + 190 = 1097.5. R\'s share = 307.5 / 1097.5 = 0.280, which rounds to 28%. Always recompute the total after any single bar changes rather than reusing the old total.',
    },
  ],

  'di-combination-graphs': [
    {
      id: 'q1',
      question: 'A set gives a bar chart of total revenue (Rs. crore) for a company from 2020 to 2023: 200, 240, 300, 360. A line chart in the same set shows the company\'s profit margin (%) for the same years: 10%, 12%, 15%, 15%. What was the company\'s profit (in Rs. crore) in 2022?',
      options: ['30', '36', '45', '54'],
      correctIndex: 2,
      explanation: 'Profit = Revenue x Profit margin. For 2022, revenue = 300 and margin = 15%, so profit = 300 x 0.15 = 45 crore. The bar chart supplies the absolute base and the line chart supplies the rate; neither chart alone answers the question.',
    },
    {
      id: 'q2',
      question: 'A set has a pie chart showing the percentage distribution of a college\'s 2,000 students across four streams (Arts 20%, Commerce 30%, Science 35%, Law 15%) and a separate table showing the male-to-female ratio only for Commerce and Science students (Commerce 3:2, Science 4:3). Which of the following can be determined from this data?',
      options: [
        'The exact number of male students in Arts',
        'The exact number of female students in Commerce',
        'The exact number of male students in Law',
        'The total number of male students across the college',
      ],
      correctIndex: 1,
      explanation: 'Commerce students = 30% of 2000 = 600. With a 3:2 male-to-female ratio, female students = 600 x 2/5 = 240, fully determinable. Arts and Law have no ratio data given, so their gender split is unknown, and the college-wide male total cannot be found since Arts and Law contributions are missing.',
    },
    {
      id: 'q3',
      question: 'A combination set shows a stacked bar chart of a store\'s monthly sales split into Online and In-store components, plus a line graph showing overall month-on-month growth. From January to February, total sales grew by 20%. January\'s bar shows Online = 40 units and In-store = 60 units. February\'s In-store sales stayed at 60 units. What were February\'s Online sales?',
      options: ['52 units', '58 units', '60 units', '64 units'],
      correctIndex: 2,
      explanation: 'January total = 40 + 60 = 100. A 20% growth means February total = 120. Since In-store stayed at 60, Online sales in February = 120 - 60 = 60 units.',
    },
  ],

  'lr-puzzles-blood-relations': [
    {
      id: 'q1',
      question: "Pointing to a man, Neha said, \"His mother is the only daughter of my mother.\" How is the man related to Neha?",
      options: ['Son', 'Father', 'Brother', 'Nephew'],
      correctIndex: 0,
      explanation: "\"My mother's only daughter\" refers to Neha herself, since she is explicitly the only daughter. So the man's mother is Neha, which means the man is Neha's son.",
    },
    {
      id: 'q2',
      question: 'Five friends J, K, L, M, and N sit in a row facing north, in positions 1 to 5 from left to right. K sits at position 3. J sits immediately to the left of K. L sits immediately to the right of K. M sits at the left extreme end. Who sits at the right extreme end?',
      options: ['J', 'K', 'L', 'N'],
      correctIndex: 3,
      explanation: 'K is at position 3. J is immediately left of K, so J=2. L is immediately right of K, so L=4. M is at the left extreme, position 1. The only remaining friend, N, must occupy the only remaining seat, position 5, the right extreme end.',
    },
    {
      id: 'q3',
      question: 'In a family, A is the mother of B. C is the son of D. D is the spouse of A. If C is not B, how is B related to C?',
      options: ['Sister only', 'Brother only', 'Sibling (brother or sister)', 'Cousin'],
      correctIndex: 2,
      explanation: "A is B's mother, and D (A's spouse) is B's other parent. C is D's son, so C shares both parents with B. Since C is confirmed not the same person as B, they are siblings - but B's gender is never stated, so the only fully correct relation is \"sibling,\" not specifically brother or sister.",
    },
  ],

  'lr-games-tournaments': [
    {
      id: 'q1',
      question: 'In a round-robin chess tournament, every player plays every other player exactly once. If a total of 45 matches were played, how many players participated?',
      options: ['9', '10', '11', '12'],
      correctIndex: 1,
      explanation: 'For n players in round-robin, total matches = n(n-1)/2. Setting n(n-1)/2 = 45 gives n(n-1) = 90. Testing n=10: 10x9=90. So there were 10 players.',
    },
    {
      id: 'q2',
      question: 'Four teams (A, B, C, D) play a round-robin tournament where a win earns 2 points, a draw earns 1 point to each team, and a loss earns 0. After all six matches are played, what is the total number of points distributed among all teams?',
      options: ['10', '12', '14', 'It varies depending on results'],
      correctIndex: 1,
      explanation: 'There are 6 matches total (4x3/2). Every match distributes exactly 2 points regardless of result (2+0 for a win/loss, or 1+1 for a draw). With 6 matches, the total is always exactly 6 x 2 = 12, regardless of how many matches are drawn.',
    },
    {
      id: 'q3',
      question: 'In a knockout tournament with 16 teams, every round eliminates exactly half the remaining teams until one champion remains. How many total matches are played?',
      options: ['14', '15', '16', '31'],
      correctIndex: 1,
      explanation: 'In a single-elimination knockout, exactly one team is eliminated per match, and every team except the champion is eliminated exactly once. With 16 teams, 15 must be eliminated, so exactly 15 matches are played (matches = n - 1).',
    },
  ],

  'lr-venn-sets': [
    {
      id: 'q1',
      question: 'In a survey of 100 students, 60 study Mathematics, 50 study Physics, and 30 study both. How many students study neither subject?',
      options: ['10', '20', '30', '40'],
      correctIndex: 1,
      explanation: 'Students studying at least one subject = 60 + 50 - 30 = 80. Students studying neither = 100 - 80 = 20.',
    },
    {
      id: 'q2',
      question: 'In a survey of 100 people, 50 like tea, 40 like coffee, and 30 like juice. 20 like both tea and coffee, 15 like both coffee and juice, 10 like both tea and juice, and 5 like all three drinks. How many people like at least one of the three drinks?',
      options: ['70', '75', '80', '85'],
      correctIndex: 2,
      explanation: 'By inclusion-exclusion: Total = T + C + J - (T-C) - (C-J) - (T-J) + (all three) = 50+40+30-20-15-10+5 = 80.',
    },
    {
      id: 'q3',
      question: 'A survey of 50 people found that 20 like Tea only and 15 like Coffee only. Everyone surveyed likes at least one of the two beverages. How many people like both Tea and Coffee?',
      options: ['10', '15', '20', '35'],
      correctIndex: 1,
      explanation: 'Since everyone likes at least one beverage, Tea-only + Coffee-only + Both = 50. So Both = 50 - 20 - 15 = 15.',
    },
  ],
  'qa-time-speed-distance': [
    {
      id: 'q1',
      question: 'A train travels at 60 km/hr for the first half of a journey (by distance) and 40 km/hr for the second half. What is the average speed for the entire journey?',
      options: ['50 km/hr', '48 km/hr', '52 km/hr', '45 km/hr'],
      correctIndex: 1,
      explanation: 'For equal distances covered at speeds a and b, average speed = 2ab/(a+b) = 2(60)(40)/(60+40) = 4800/100 = 48 km/hr. This is the harmonic mean, not the simple average of 50, which is a common trap.',
    },
    {
      id: 'q2',
      question: 'Two trains, 150 m and 100 m long, run on parallel tracks in opposite directions at 54 km/hr and 36 km/hr respectively. How long do they take to cross each other completely?',
      options: ['8 seconds', '10 seconds', '12 seconds', '15 seconds'],
      correctIndex: 1,
      explanation: 'Total distance to cover = sum of lengths = 150 + 100 = 250 m. Relative speed (opposite directions) = 54 + 36 = 90 km/hr = 25 m/s. Time = 250/25 = 10 seconds.',
    },
    {
      id: 'q3',
      question: 'A boat travels 24 km downstream in 2 hours and returns the same distance upstream in 3 hours. What is the speed of the boat in still water?',
      options: ['8 km/hr', '9 km/hr', '10 km/hr', '11 km/hr'],
      correctIndex: 2,
      explanation: 'Downstream speed = 24/2 = 12 km/hr. Upstream speed = 24/3 = 8 km/hr. Speed in still water = (12+8)/2 = 10 km/hr.',
    },
  ],

  'qa-time-work': [
    {
      id: 'q1',
      question: 'A can complete a job in 10 days and B can complete it in 15 days. If they work together, how many days will they take to finish the job?',
      options: ['5 days', '6 days', '7 days', '12.5 days'],
      correctIndex: 1,
      explanation: "A's rate = 1/10, B's rate = 1/15. Combined rate = 1/10 + 1/15 = 1/6. So together they take 6 days.",
    },
    {
      id: 'q2',
      question: 'A is twice as efficient as B. Working together, they complete a job in 8 days. How many days would A alone take to complete the job?',
      options: ['10 days', '12 days', '16 days', '24 days'],
      correctIndex: 1,
      explanation: "Let B's rate = x per day, so A's rate = 2x. Combined rate = 3x = 1/8, so x = 1/24. A's rate = 2/24 = 1/12, meaning A alone takes 12 days.",
    },
    {
      id: 'q3',
      question: 'Pipe A can fill a tank in 6 hours and Pipe B can empty it in 10 hours. If both pipes are opened together, how long will it take to fill the empty tank?',
      options: ['12 hours', '15 hours', '18 hours', '20 hours'],
      correctIndex: 1,
      explanation: 'Fill rate of A = 1/6, empty rate of B = 1/10. Net rate = 1/6 - 1/10 = 1/15 per hour. Time to fill = 15 hours.',
    },
  ],

  'qa-averages-mixtures': [
    {
      id: 'q1',
      question: 'In what ratio must a shopkeeper mix tea worth Rs 20/kg with tea worth Rs 30/kg so that the mixture is worth Rs 24/kg?',
      options: ['2:3', '3:2', '1:2', '2:1'],
      correctIndex: 1,
      explanation: 'By alligation, ratio = (30-24) : (24-20) = 6:4 = 3:2.',
    },
    {
      id: 'q2',
      question: "The average age of a class of 30 students is 15 years. If the teacher's age (46 years) is included, what is the new average age?",
      options: ['15.5 years', '16 years', '16.5 years', '17 years'],
      correctIndex: 1,
      explanation: 'Total age of students = 30 x 15 = 450. Including the teacher: total = 450 + 46 = 496, count = 31. New average = 496 / 31 = 16 years.',
    },
    {
      id: 'q3',
      question: 'A container has 81 litres of pure milk. 27 litres are removed and replaced with water, and this process is repeated two more times (3 replacements total). How much pure milk is left in the container?',
      options: ['24 litres', '27 litres', '32 litres', '18 litres'],
      correctIndex: 0,
      explanation: 'Using the replacement formula: final = initial x (1 - removed/total)^n = 81 x (1 - 27/81)^3 = 81 x (2/3)^3 = 81 x 8/27 = 24 litres.',
    },
  ],

  'qa-ratio-proportion': [
    {
      id: 'q1',
      question: 'If A:B = 2:3 and B:C = 4:5, what is A:B:C?',
      options: ['2:3:5', '6:9:12', '8:12:15', '4:6:9'],
      correctIndex: 2,
      explanation: 'The LCM of the B values (3 and 4) is 12. Scale A:B = 2:3 by 4 to get 8:12. Scale B:C = 4:5 by 3 to get 12:15. Now B matches at 12, so A:B:C = 8:12:15.',
    },
    {
      id: 'q2',
      question: 'A sum of money is divided among A, B, and C in the ratio 2:3:5. If C receives 1500 rupees more than A, what is the total sum of money?',
      options: ['4000 rupees', '4500 rupees', '5000 rupees', '5500 rupees'],
      correctIndex: 2,
      explanation: 'C - A corresponds to (5-2) = 3 parts, which equals 1500 rupees, so 1 part = 500 rupees. Total parts = 10, so total sum = 10 x 500 = 5000 rupees.',
    },
    {
      id: 'q3',
      question: 'x varies directly as y and inversely as z. When y=5 and z=2, x=10. What is the value of x when y=8 and z=4?',
      options: ['6', '7', '8', '10'],
      correctIndex: 2,
      explanation: 'x = ky/z. Using y=5, z=2, x=10: 10 = k(5)/2, so k=4. With y=8, z=4: x = 4(8)/4 = 8.',
    },
  ],

  'qa-linear-inequalities': [
    {
      id: 'q1',
      question: 'Solve the simultaneous equations: 2x + 3y = 12 and 3x - y = 7. What is the value of x + y?',
      options: ['3', '4', '5', '6'],
      correctIndex: 2,
      explanation: 'From the second equation, y = 3x - 7. Substituting: 2x + 3(3x-7) = 12, so 11x = 33, x = 3. Then y = 3(3)-7 = 2. x + y = 5.',
    },
    {
      id: 'q2',
      question: 'How many positive integer values of x satisfy both inequalities: 3x - 2 < 10 and 2x + 1 >= 5?',
      options: ['1', '2', '3', '4'],
      correctIndex: 1,
      explanation: 'From 3x-2<10: x<4. From 2x+1>=5: x>=2. Combining: 2<=x<4. The positive integers satisfying this are x=2 and x=3, giving 2 values.',
    },
    {
      id: 'q3',
      question: 'The sum of two numbers is 25 and their difference is 5. What is the product of the two numbers?',
      options: ['100', '150', '125', '75'],
      correctIndex: 1,
      explanation: 'Let the numbers be x and y. x+y=25, x-y=5. Adding: 2x=30, x=15, y=10. Product = 15 x 10 = 150.',
    },
  ],

  'qa-progressions': [
    {
      id: 'q1',
      question: 'Find the sum of the first 20 terms of the arithmetic progression 3, 7, 11, 15, ...',
      options: ['780', '800', '820', '760'],
      correctIndex: 2,
      explanation: 'First term a=3, common difference d=4, n=20. Sum = (n/2)(2a+(n-1)d) = 10 x (6+76) = 10 x 82 = 820.',
    },
    {
      id: 'q2',
      question: 'Find the sum to infinity of the geometric progression 8, 4, 2, 1, ...',
      options: ['12', '14', '16', '20'],
      correctIndex: 2,
      explanation: 'First term a=8, common ratio r=1/2. Since |r|<1, sum to infinity = a/(1-r) = 8/0.5 = 16.',
    },
    {
      id: 'q3',
      question: 'The 3rd term of a GP is 12 and the 6th term is 96. What is the common ratio?',
      options: ['1.5', '2', '2.5', '3'],
      correctIndex: 1,
      explanation: '6th term / 3rd term = r^3 = 96/12 = 8, so r = 2 (cube root of 8).',
    },
  ],

  'qa-logs-surds-indices': [
    {
      id: 'q1',
      question: 'Simplify: sqrt(2) x sqrt(8)',
      options: ['2', '4', '8', '16'],
      correctIndex: 1,
      explanation: 'sqrt(2) x sqrt(8) = sqrt(16) = 4.',
    },
    {
      id: 'q2',
      question: 'If log base 2 of x = 5, what is the value of x?',
      options: ['10', '16', '25', '32'],
      correctIndex: 3,
      explanation: 'log base 2 of x = 5 means 2^5 = x, so x = 32.',
    },
    {
      id: 'q3',
      question: 'Simplify: log(20) + log(5), using base 10',
      options: ['1', '2', '3', '4'],
      correctIndex: 1,
      explanation: 'log(20) + log(5) = log(20 x 5) = log(100) = 2 (base 10).',
    },
  ],
}

export function getQuestions(subtopicId) {
  return questions[subtopicId] || []
}
