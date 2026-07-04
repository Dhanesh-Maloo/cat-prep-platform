import { Link } from 'react-router-dom'
import { useSyllabus } from '../api/hooks/useSyllabus'

export function HomePage() {
  const { sections, loading } = useSyllabus()
  const subtopicCount = sections.reduce(
    (sum, s) => sum + s.topics.reduce((t, topic) => t + topic.subtopics.length, 0),
    0
  )

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        Prepare for CAT, all in one place
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Structured syllabus notes, curated videos, free resources, and topic-wise practice
        across VARC, DILR, and Quant{!loading && ` - ${subtopicCount} sub-topics and counting`}.
      </p>
      <Link
        to="/syllabus"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
      >
        Browse the Syllabus
      </Link>

      {loading ? (
        <p className="text-gray-400 mt-16">Loading syllabus...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">{section.name}</h2>
              <p className="text-sm text-gray-500">{section.fullName}</p>
              <p className="text-sm text-gray-400 mt-2">{section.topics.length} topics</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
