import { readingCategories } from '../data/readingList'
import { TiltCard } from '../components/TiltCard'

export function ReadingListPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Reading List</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        CAT RC rewards candidates who read widely for months before the exam, not those who only drill passages in
        the final weeks - unfamiliar sentence structures and argument styles are what actually slow readers down on
        test day. Pick one category below and read something from it a few times a week; variety across categories
        matters more than sticking to one source.
      </p>

      <div className="space-y-6">
        {readingCategories.map((category) => (
          <TiltCard key={category.id} className="rounded-lg">
            <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 h-full">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{category.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{category.blurb}</p>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
                    >
                      {item.title}
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          </TiltCard>
        ))}
      </div>
    </div>
  )
}
