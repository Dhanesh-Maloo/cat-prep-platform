import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSyllabus } from '../api/hooks/useSyllabus'
import { DifficultyBadge } from '../components/DifficultyBadge'

export function SyllabusPage() {
  const { sections, loading, error } = useSyllabus()
  const [openTopic, setOpenTopic] = useState(null)

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading syllabus...</p>
  if (error) return <p className="text-red-500 dark:text-red-400">Couldn't load the syllabus. Please try again.</p>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Syllabus</h1>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-1">{section.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{section.fullName}</p>
            <div className="space-y-2">
              {section.topics.map((topic) => {
                const isOpen = openTopic === topic.id
                return (
                  <div key={topic.id} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {topic.name}
                      <span className="text-gray-400 dark:text-gray-500">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <ul className="divide-y divide-gray-100 border-t border-gray-100 dark:border-gray-800">
                        {topic.subtopics.map((subtopic) => (
                          <li key={subtopic.id} className="px-4 py-3 flex items-center justify-between">
                            <Link
                              to={`/subtopic/${subtopic.id}`}
                              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {subtopic.name}
                              {!subtopic.hasContent && (
                                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">(coming soon)</span>
                              )}
                            </Link>
                            <DifficultyBadge level={subtopic.difficulty} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
