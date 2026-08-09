// Curated reading list for building long-term RC comprehension and vocabulary.
// Inspired by 2IIM's well-known "reading list" approach: CAT RC rewards wide, varied
// reading habits built over months, not last-minute passage drilling.

export const readingCategories = [
  {
    id: 'long-form-journalism',
    title: 'Long-Form Journalism & Essays',
    blurb: 'Builds stamina for dense, argument-heavy CAT passages and trains you to track a writer\'s position across several paragraphs.',
    items: [
      { title: 'The New Yorker - Essays & Features', url: 'https://www.newyorker.com/magazine', note: 'Long, structured arguments - excellent practice for tracking main idea and tone shifts.' },
      { title: 'Aeon Essays', url: 'https://aeon.co/essays', note: 'Free philosophy, science, and culture essays with a clear argumentative arc.' },
      { title: 'The Atlantic - Ideas', url: 'https://www.theatlantic.com/ideas/', note: 'Opinion and analysis pieces good for author-purpose and argument-structure practice.' },
    ],
  },
  {
    id: 'economics-business',
    title: 'Economics & Business',
    blurb: 'CAT RC and para-summary passages draw heavily from economics, business, and policy writing.',
    items: [
      { title: 'Livemint - Opinion', url: 'https://www.livemint.com/opinion', note: 'Indian business and policy commentary, similar register to CAT passages.' },
      { title: 'The Economist - Free Articles', url: 'https://www.economist.com/free-articles', note: 'Terse, information-dense writing - good for practicing fast, careful reading.' },
      { title: 'Vox - The Highlight', url: 'https://www.vox.com/the-highlight', note: 'Explains complex policy and social topics in an accessible but nuanced way.' },
    ],
  },
  {
    id: 'science-ideas',
    title: 'Science, Philosophy & Ideas',
    blurb: 'A recurring CAT RC theme - passages that explain a scientific idea and then critique or contextualize it.',
    items: [
      { title: 'Scientific American - Opinion', url: 'https://www.scientificamerican.com/opinion/', note: 'Science writing aimed at general readers, close to CAT RC difficulty.' },
      { title: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/', note: 'Dense but precisely argued - useful for the hardest inference-style passages.' },
      { title: 'Nautilus', url: 'https://nautil.us/', note: 'Science essays that blend narrative and argument, a common CAT RC structure.' },
    ],
  },
  {
    id: 'daily-practice',
    title: 'Daily Reading Habit',
    blurb: 'Consistency matters more than volume - 15-20 minutes of varied reading a day, every day, compounds faster than occasional long sessions.',
    items: [
      { title: 'The Hindu - Editorial page', url: 'https://www.thehindu.com/opinion/editorial/', note: 'A CAT-prep staple: dense, formal editorial writing published daily.' },
      { title: 'Arts & Letters Daily', url: 'https://www.aldaily.com/', note: 'A daily-updated aggregator of essays across politics, culture, and science - one new source a day.' },
    ],
  },
]

export function getAllReadingItems() {
  return readingCategories.flatMap((c) => c.items.map((item) => ({ ...item, categoryTitle: c.title })))
}
