// Full CAT syllabus tree: Section -> Topic -> Sub-topic.

export const sections = [
  {
    id: 'varc',
    name: 'VARC',
    fullName: 'Verbal Ability & Reading Comprehension',
    topics: [
      {
        id: 'reading-comprehension',
        name: 'Reading Comprehension',
        subtopics: [
          { id: 'rc-main-idea-tone', name: 'Main Idea & Tone Questions', difficulty: 'Beginner' },
          { id: 'rc-inference', name: 'Inference-Based Questions', difficulty: 'Intermediate' },
          { id: 'rc-author-purpose', name: "Author's Purpose & Argument Structure", difficulty: 'Intermediate' },
          { id: 'rc-vocabulary-context', name: 'Vocabulary in Context', difficulty: 'Beginner' },
        ],
      },
      {
        id: 'verbal-reasoning',
        name: 'Verbal Reasoning',
        subtopics: [
          { id: 'vr-para-jumbles', name: 'Para Jumbles', difficulty: 'Intermediate' },
          { id: 'vr-odd-one-out', name: 'Odd Sentence Out', difficulty: 'Advanced' },
          { id: 'vr-para-summary', name: 'Para Summary', difficulty: 'Intermediate' },
          { id: 'vr-sentence-elimination', name: 'Sentence Elimination', difficulty: 'Advanced' },
        ],
      },
    ],
  },
  {
    id: 'dilr',
    name: 'DILR',
    fullName: 'Data Interpretation & Logical Reasoning',
    topics: [
      {
        id: 'data-interpretation',
        name: 'Data Interpretation',
        subtopics: [
          { id: 'di-tables-caselets', name: 'Tables & Caselets', difficulty: 'Intermediate' },
          { id: 'di-bar-line-pie', name: 'Bar, Line & Pie Charts', difficulty: 'Beginner' },
          { id: 'di-combination-graphs', name: 'Combination Graphs', difficulty: 'Advanced' },
        ],
      },
      {
        id: 'logical-reasoning',
        name: 'Logical Reasoning',
        subtopics: [
          { id: 'lr-arrangements', name: 'Seating Arrangements', difficulty: 'Advanced' },
          { id: 'lr-puzzles-blood-relations', name: 'Puzzles & Blood Relations', difficulty: 'Intermediate' },
          { id: 'lr-games-tournaments', name: 'Games & Tournaments', difficulty: 'Advanced' },
          { id: 'lr-venn-sets', name: 'Venn Diagrams & Set Theory in LR', difficulty: 'Intermediate' },
        ],
      },
    ],
  },
  {
    id: 'qa',
    name: 'QA',
    fullName: 'Quantitative Aptitude',
    topics: [
      {
        id: 'arithmetic',
        name: 'Arithmetic',
        subtopics: [
          { id: 'qa-percentages', name: 'Percentages, Profit & Loss', difficulty: 'Beginner' },
          { id: 'qa-time-speed-distance', name: 'Time, Speed & Distance', difficulty: 'Beginner' },
          { id: 'qa-time-work', name: 'Time & Work', difficulty: 'Intermediate' },
          { id: 'qa-averages-mixtures', name: 'Averages, Mixtures & Alligations', difficulty: 'Intermediate' },
          { id: 'qa-ratio-proportion', name: 'Ratio, Proportion & Variation', difficulty: 'Beginner' },
        ],
      },
      {
        id: 'algebra',
        name: 'Algebra',
        subtopics: [
          { id: 'qa-quadratic-equations', name: 'Quadratic Equations', difficulty: 'Intermediate' },
          { id: 'qa-linear-inequalities', name: 'Linear Equations & Inequalities', difficulty: 'Beginner' },
          { id: 'qa-progressions', name: 'Progressions (AP, GP, HP)', difficulty: 'Intermediate' },
          { id: 'qa-logs-surds-indices', name: 'Logarithms, Surds & Indices', difficulty: 'Intermediate' },
        ],
      },
      {
        id: 'geometry-mensuration',
        name: 'Geometry & Mensuration',
        subtopics: [
          { id: 'geo-triangles-circles', name: 'Triangles & Circles', difficulty: 'Intermediate' },
          { id: 'geo-mensuration', name: 'Mensuration (2D & 3D)', difficulty: 'Intermediate' },
          { id: 'geo-coordinate', name: 'Coordinate Geometry', difficulty: 'Advanced' },
        ],
      },
      {
        id: 'number-system',
        name: 'Number System',
        subtopics: [
          { id: 'ns-divisibility-lcm-hcf', name: 'Divisibility, LCM & HCF', difficulty: 'Beginner' },
          { id: 'ns-remainders-factors', name: 'Remainders & Factors', difficulty: 'Intermediate' },
        ],
      },
      {
        id: 'modern-math',
        name: 'Modern Math',
        subtopics: [
          { id: 'mm-permutation-combination', name: 'Permutation & Combination', difficulty: 'Advanced' },
          { id: 'mm-probability', name: 'Probability', difficulty: 'Advanced' },
          { id: 'mm-set-theory-functions', name: 'Set Theory & Functions', difficulty: 'Intermediate' },
        ],
      },
    ],
  },
]

export function findSubtopic(subtopicId) {
  for (const section of sections) {
    for (const topic of section.topics) {
      const subtopic = topic.subtopics.find((s) => s.id === subtopicId)
      if (subtopic) return { section, topic, subtopic }
    }
  }
  return null
}

/** Flattened, syllabus-ordered list of subtopics, for structured prev/next navigation. */
export function flattenSubtopics() {
  const list = []
  for (const section of sections) {
    for (const topic of section.topics) {
      for (const subtopic of topic.subtopics) {
        list.push({ ...subtopic, sectionId: section.id, sectionName: section.name, topicId: topic.id, topicName: topic.name })
      }
    }
  }
  return list
}
