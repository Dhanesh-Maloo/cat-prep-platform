// Placeholder sub-topic content: notes, curated video, resource links.
// 4 sub-topics are fully populated per the Phase 1 spec; others show a "coming soon" state.

export const content = {
  'rc-main-idea-tone': {
    notes: `Every CAT reading comprehension passage is built around a central idea and an authorial tone. The main idea is the single claim the passage as a whole is arguing for or explaining - not a summary of every paragraph, but the thread that ties them together. Test-takers often get trapped by answer choices that are true of one paragraph but too narrow, or that sound grand but go beyond what the passage actually supports.

Tone is the author's attitude toward the subject: critical, appreciative, skeptical, neutral-analytical, and so on. Tone is signaled by word choice (loaded adjectives, hedging language like "arguably" or "merely"), by which side of an argument gets more space, and by how counterarguments are framed. A passage can be factually neutral in content but sharply critical in tone, or vice versa.

Strategy: after reading, pause and try to state the main idea in one sentence before looking at the options. For tone questions, scan for evaluative language rather than re-reading the whole passage - tone rarely shifts drastically within a single passage, but the CAT sometimes tests passages with a deliberate tonal shift in the final paragraph, so always check the ending separately.

Common traps: (1) extreme-language options (always, never, completely) are usually wrong for tone, since most passages are measured; (2) options that summarize only the last paragraph instead of the whole passage; (3) conflating the tone of a quoted source within the passage with the author's own tone.`,
    video: {
      youtubeId: 'iIKDQSACJ_4',
      title: 'CAT RC - Tone & Main Idea',
    },
    resources: [
      { title: 'CAT previous year RC passages (2019-2023 compiled)', url: 'https://www.iimcat.ac.in/per/g04/pub/187_A2Z1_Final.pdf' },
      { title: 'Free RC practice sets - Rau\'s IAS / TestFunda archive', url: 'https://testfunda.com' },
      { title: 'Tone & attitude word list (PDF)', url: 'https://www.vocabulary.com/lists/' },
      { title: 'Alternative video: CAT 2025 RC Series - How to Solve Main Idea Questions', url: 'https://www.youtube.com/watch?v=73P--40QYVk' },
      { title: 'Alternative video: How to Analyse RC Tones (CAT VARC 2024)', url: 'https://www.youtube.com/watch?v=fOKoXugVYG4' },
    ],
  },

  'vr-para-jumbles': {
    notes: `Para jumbles present 4-5 sentences out of order and ask you to reconstruct the original paragraph, either by ranking all sentences or (in CAT's TITA format) by identifying which sentence comes first/last. The key skill is finding structural links between sentences rather than relying on general reading comprehension.

Start by identifying the opening sentence: it usually introduces a subject, a name, or a general claim, and does not contain pronouns like "this," "it," or "they" that require prior context, nor connector words like "however," "therefore," or "for example." Next, look for pairs of sentences linked by explicit clues - a pronoun referring back to a noun in another sentence, a date or number that's elaborated on, or a cause named in one sentence with its effect in the next.

Chain-building beats guessing the full order at once: find 2-3 confident sentence pairs first, then figure out where those chains fit relative to each other. For CAT's TITA-format questions (identify one specific sentence's position rather than rank all of them), you often don't need to solve the entire jumble - just enough of the chain to fix that one sentence's place with confidence.

Common traps: an option may look grammatically fine but violate the logical flow of an idea (e.g., an example given before the concept it illustrates is introduced); test the full paragraph by reading your constructed order end-to-end to catch this.`,
    video: {
      youtubeId: 'pgo0AEYN_GI',
      title: 'Para Jumbles for CAT | Best Tricks + CAT-Level Questions | VARC Strategy',
    },
    resources: [
      { title: 'Para jumbles practice set (100 questions, free PDF)', url: 'https://www.careerlauncher.com' },
      { title: 'CAT 2022-2023 official VARC papers', url: 'https://www.iimcat.ac.in' },
      { title: 'Sentence connector cheat-sheet', url: 'https://www.grammarly.com/blog/transition-words/' },
      { title: 'Alternative video: Para Jumbles & Paragraph Odd One Out (CAT 2025 VARC One Shot)', url: 'https://www.youtube.com/watch?v=w2JubYI2mzI' },
      { title: 'Alternative video: Master the PAIR-UP Technique for Para Jumbles', url: 'https://www.youtube.com/watch?v=jRGijoidr14' },
    ],
  },

  'di-tables-caselets': {
    notes: `Table and caselet-based Data Interpretation sets give you raw data (a table, or a paragraph describing relationships between quantities) and ask several questions that require combining pieces of that data. Unlike pure calculation questions, caselets often hide part of the data as prose ("twice as many as X, but 10 fewer than Y") that must first be converted into a table or set of equations before you can answer anything.

The first and most valuable step is spending 60-90 seconds converting the caselet into a clean table or diagram, even before reading the questions - this investment pays off because most caselet sets have 4-5 questions that reuse the same underlying structure. Look for what's NOT given directly: totals that must be derived, percentages that need a base value, or missing cells that can be inferred using row/column totals.

Approximation is a critical skill here: CAT rarely needs exact answers, and options are usually spread far enough apart that rounding to the nearest convenient number (e.g., 48 -> 50) is safe and much faster than pen-and-paper long division. Reserve exact computation only for questions where two options are close together.

Common traps: misreading whether a percentage is "of the total" versus "of a subgroup"; double-counting when categories overlap (e.g., a person counted in both "science" and "honors" students); and spending too long perfecting the master table instead of moving to questions once you have enough structure to answer the easy ones.`,
    video: {
      youtubeId: 'SbNHJtHJm-4',
      title: 'CAT DILR | Data Interpretation Caselets For CAT | Caselet DI Concept',
    },
    resources: [
      { title: 'CAT DILR previous year sets (2015-2023, free)', url: 'https://www.2iim.com/cat-question-papers' },
      { title: 'Caselet-to-table conversion practice worksheet', url: 'https://www.handakafunda.com' },
      { title: 'DI approximation techniques guide', url: 'https://www.wizako.com' },
      { title: 'Alternative video: Understanding Caselets in Data Interpretation', url: 'https://www.youtube.com/watch?v=yw4zFw5_Fh4' },
      { title: 'Alternative video: CAT Caselets - Important CAT DILR Topic', url: 'https://www.youtube.com/watch?v=Z3SWdERmAVE' },
    ],
  },

  'qa-percentages': {
    notes: `Percentages, and the closely related topics of profit/loss and simple/compound interest, form the arithmetic backbone of CAT QA - a large share of arithmetic questions ultimately reduce to a percentage change calculation. The core idea is that a percentage is just a ratio scaled to a base of 100, so "20% of 350" and "70 out of 350" express the same relationship.

For profit and loss, always fix what the percentage is calculated ON: profit percentage is on cost price, never on selling price, unless a question explicitly says "margin on selling price." Successive percentage changes (e.g., price increased by 20% then decreased by 10%) do NOT cancel out arithmetically - use the multiplying-factor method: 1.20 x 0.90 = 1.08, a net 8% increase, not 10%.

Memorizing fraction-percentage equivalents (1/8 = 12.5%, 1/6 = 16.67%, 1/3 = 33.33%, 3/8 = 37.5%, etc.) up to sixteenths dramatically speeds up mental calculation and is one of the highest-leverage things to drill before test day, since it converts division problems into multiplication.

Common traps: confusing "percentage point change" with "percentage change" (a rate going from 20% to 25% is a 5 percentage-point rise but a 25% relative increase); applying discount and tax in the wrong order when both apply; and forgetting that a loss percentage is still calculated on cost price even when cost price isn't explicitly stated as the reference.`,
    video: {
      youtubeId: 'x-k8iSNr85g',
      title: 'Percentages & Profit Loss - CAT Preparation',
    },
    resources: [
      { title: 'Fraction-to-percentage table (printable PDF)', url: 'https://www.mbauniverse.com' },
      { title: 'CAT QA arithmetic previous year questions', url: 'https://www.2iim.com/cat-question-papers' },
      { title: 'Profit & Loss practice set with solutions', url: 'https://www.testfunda.com' },
      { title: 'Alternative video: CAT Profit & Loss - All PYQs with Timer', url: 'https://www.youtube.com/watch?v=q6elvXFpJe0' },
      { title: 'Alternative video: Profit Loss Discount - Basic to Advanced', url: 'https://www.youtube.com/watch?v=9v7Vp_mZPr4' },
    ],
  },

  'rc-inference': {
    notes: `Inference questions ask what the passage implies without stating it directly - the correct answer must be a necessary logical consequence of what's written, not just a plausible-sounding extension of it. This is the single biggest source of wrong answers in CAT RC: options that "feel right" because they're consistent with the passage's spirit, but that the passage doesn't actually force you to conclude.

The test for a valid inference: could the passage be true while the option is false? If yes, it's not a valid inference - it's an assumption or an unsupported extrapolation. For example, if a passage says "Sales grew every year since the policy was introduced," you cannot infer "the policy caused the growth" - that requires a causal claim the passage never makes.

Inference questions often hinge on a single sentence or clause, so re-read the specific window of text the question points to rather than relying on your memory of the whole passage. Watch for logical connectors (therefore, because, despite) that constrain what can and cannot be inferred.

Common traps: (1) options that reverse a stated relationship (if A causes B, an option claiming B causes A is wrong); (2) options that are too strong (the passage says "some," the option says "most" or "all"); (3) options that introduce outside knowledge not present in the passage, however true it may be in reality.`,
    video: {
      youtubeId: 'Up-WZkVe8y0',
      title: 'How to Crack CAT RC Inference Based Questions Easily',
    },
    resources: [
      { title: 'Inference vs. assumption practice drills', url: 'https://www.2iim.com' },
      { title: 'CAT RC inference question bank (free)', url: 'https://www.handakafunda.com' },
      { title: 'Logical connectors reference sheet', url: 'https://www.grammarly.com/blog/transition-words/' },
      { title: 'Alternative video: How to Solve Inference Based Questions in RC (Career Launcher)', url: 'https://www.youtube.com/watch?v=_rjuDn3G3p0' },
      { title: 'Alternative video: Identify the RC Passage Types for Inference Questions', url: 'https://www.youtube.com/watch?v=vwDFjm1zinE' },
    ],
  },

  'qa-quadratic-equations': {
    notes: `Quadratic equations appear directly (solve for roots) and indirectly (word problems that reduce to a quadratic) throughout CAT QA. The standard form ax² + bx + c = 0 has roots found by factoring when possible, or via the quadratic formula x = (-b ± √(b²-4ac)) / 2a when it isn't.

Two shortcuts save significant time: sum of roots = -b/a and product of roots = c/a. These let you verify factored roots instantly (for x² - 5x + 6 = 0, sum should be 5 and product 6 - matching roots 2 and 3) and let you construct an equation directly from given roots without expanding brackets.

The discriminant (b² - 4ac) tells you the nature of roots before solving: positive means two distinct real roots, zero means one repeated real root, negative means no real roots (complex only) - CAT rarely tests complex roots directly, but discriminant sign is a fast way to eliminate answer choices that assume real roots exist.

Common traps: sign errors when reading off b and c from a rearranged equation (always move everything to one side first); forgetting that a quadratic word problem may have two mathematically valid roots but only one makes sense in context (e.g., negative age, negative length); and confusing "roots" with "coefficients" when a question describes a relationship between them.`,
    video: {
      youtubeId: 'qJx4IZ8FoKw',
      title: 'Complete Algebra | Quadratic Equations for CAT',
    },
    resources: [
      { title: 'Quadratic equations formula sheet (PDF)', url: 'https://www.mbauniverse.com' },
      { title: 'CAT QA algebra previous year questions', url: 'https://www.2iim.com/cat-question-papers' },
      { title: 'Sum/product of roots practice set', url: 'https://www.wizako.com' },
      { title: 'Alternative video: Quadratic Equations - Lecture 04 (CAT Quant)', url: 'https://www.youtube.com/watch?v=G3pESsL7s8U' },
      { title: 'Alternative video: Quadratic Equations Formulas - Important Questions', url: 'https://www.youtube.com/watch?v=CGmRSgkVzJ4' },
    ],
  },
}

export function getContent(subtopicId) {
  return content[subtopicId] || null
}
