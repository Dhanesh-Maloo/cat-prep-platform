// Placeholder syllabus tree: Section -> Topic -> Sub-topic
// Real content will move to Supabase (sections/topics/subtopics tables) once backend is wired up.

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
        ],
      },
      {
        id: 'verbal-reasoning',
        name: 'Verbal Reasoning',
        subtopics: [
          { id: 'vr-para-jumbles', name: 'Para Jumbles', difficulty: 'Intermediate' },
          { id: 'vr-odd-one-out', name: 'Odd Sentence Out', difficulty: 'Advanced' },
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
        ],
      },
      {
        id: 'logical-reasoning',
        name: 'Logical Reasoning',
        subtopics: [
          { id: 'lr-arrangements', name: 'Seating Arrangements', difficulty: 'Advanced' },
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
        ],
      },
      {
        id: 'algebra',
        name: 'Algebra',
        subtopics: [
          { id: 'qa-quadratic-equations', name: 'Quadratic Equations', difficulty: 'Intermediate' },
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
