import { Link } from 'react-router-dom'
import { useSyllabus } from '../api/hooks/useSyllabus'
import { TiltCard } from '../components/TiltCard'

export function HomePage() {
  const { sections, loading } = useSyllabus()
  const subtopicCount = sections.reduce(
    (sum, s) => sum + s.topics.reduce((t, topic) => t + topic.subtopics.length, 0),
    0
  )

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Prepare for CAT, all in one place
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
        Structured syllabus notes, curated videos, free resources, and topic-wise practice
        across VARC, DILR, and Quant{!loading && ` - ${subtopicCount} sub-topics and counting`}.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/syllabus"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
        >
          Browse the Syllabus
        </Link>
        <Link
          to="/playbook"
          className="inline-block bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 px-6 py-3 rounded-lg font-medium hover:border-indigo-400 dark:hover:border-indigo-500"
        >
          99th Percentile Playbook
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400 dark:text-gray-500 mt-16">Loading syllabus...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left">
          {sections.map((section) => (
            <TiltCard key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{section.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{section.fullName}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{section.topics.length} topics</p>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  )
}
