import { useEffect, useState } from 'react'
import { useAuth } from '../lib/auth'
import { useIsAdmin } from '../api/hooks/useIsAdmin'
import { useSyllabus } from '../api/hooks/useSyllabus'
import {
  addSection,
  addTopic,
  addSubtopic,
  upsertNotes,
  replaceVideo,
  addResource,
  getResourcesForSubtopic,
  deleteResource,
  addQuestion,
  addQuestions,
  getQuestionsForSubtopic,
  deleteQuestion,
} from '../api/admin'
import { parseQuestionsText } from '../lib/questionFileParser'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']

export function AdminPage() {
  const { user } = useAuth()
  const { isAdmin, loading: adminLoading } = useIsAdmin(user?.id)
  const { sections, loading: syllabusLoading, refresh } = useSyllabus()

  if (!user) return <p className="text-gray-500 dark:text-gray-400">Log in to access the admin panel.</p>
  if (adminLoading || syllabusLoading) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>
  if (!isAdmin) return <p className="text-red-500 dark:text-red-400">You don't have admin access.</p>

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Admin Panel</h1>
      <SectionTopicSubtopicForm sections={sections} onChanged={refresh} />
      <SubtopicContentForm sections={sections} onChanged={refresh} />
      <QuestionForm sections={sections} />
      <BulkQuestionUploadForm sections={sections} />
    </div>
  )
}

function SectionTopicSubtopicForm({ sections, onChanged }) {
  const [sectionName, setSectionName] = useState('')
  const [sectionFullName, setSectionFullName] = useState('')
  const [topicSectionId, setTopicSectionId] = useState('')
  const [topicName, setTopicName] = useState('')
  const [subtopicTopicId, setSubtopicTopicId] = useState('')
  const [subtopicName, setSubtopicName] = useState('')
  const [subtopicDifficulty, setSubtopicDifficulty] = useState('Beginner')
  const [status, setStatus] = useState(null)

  const allTopics = sections.flatMap((s) => s.topics.map((t) => ({ ...t, sectionName: s.name })))

  async function handleAddSection(e) {
    e.preventDefault()
    setStatus(null)
    try {
      await addSection({ name: sectionName, fullName: sectionFullName })
      setSectionName('')
      setSectionFullName('')
      setStatus('Section added.')
      onChanged()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  async function handleAddTopic(e) {
    e.preventDefault()
    setStatus(null)
    try {
      await addTopic({ sectionId: topicSectionId, name: topicName })
      setTopicName('')
      setStatus('Topic added.')
      onChanged()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  async function handleAddSubtopic(e) {
    e.preventDefault()
    setStatus(null)
    try {
      await addSubtopic({ topicId: subtopicTopicId, name: subtopicName, difficulty: subtopicDifficulty })
      setSubtopicName('')
      setStatus('Sub-topic added.')
      onChanged()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Syllabus Structure</h2>
      {status && <p className="text-sm mb-3 text-indigo-600 dark:text-indigo-400">{status}</p>}

      <form onSubmit={handleAddSection} className="flex flex-wrap items-end gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <Field label="New section name">
          <input value={sectionName} onChange={(e) => setSectionName(e.target.value)} className="input" required />
        </Field>
        <Field label="Full name">
          <input value={sectionFullName} onChange={(e) => setSectionFullName(e.target.value)} className="input" required />
        </Field>
        <button type="submit" className="btn">Add Section</button>
      </form>

      <form onSubmit={handleAddTopic} className="flex flex-wrap items-end gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <Field label="Section">
          <select value={topicSectionId} onChange={(e) => setTopicSectionId(e.target.value)} className="input" required>
            <option value="">Select...</option>
            {sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <Field label="New topic name">
          <input value={topicName} onChange={(e) => setTopicName(e.target.value)} className="input" required />
        </Field>
        <button type="submit" className="btn">Add Topic</button>
      </form>

      <form onSubmit={handleAddSubtopic} className="flex flex-wrap items-end gap-2">
        <Field label="Topic">
          <select value={subtopicTopicId} onChange={(e) => setSubtopicTopicId(e.target.value)} className="input" required>
            <option value="">Select...</option>
            {allTopics.map((t) => <option key={t.id} value={t.id}>{t.sectionName} / {t.name}</option>)}
          </select>
        </Field>
        <Field label="New sub-topic name">
          <input value={subtopicName} onChange={(e) => setSubtopicName(e.target.value)} className="input" required />
        </Field>
        <Field label="Difficulty">
          <select value={subtopicDifficulty} onChange={(e) => setSubtopicDifficulty(e.target.value)} className="input">
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <button type="submit" className="btn">Add Sub-topic</button>
      </form>
    </section>
  )
}

function SubtopicContentForm({ sections, onChanged }) {
  const allSubtopics = sections.flatMap((s) => s.topics.flatMap((t) => t.subtopics.map((st) => ({ ...st, path: `${s.name} / ${t.name} / ${st.name}` }))))
  const [subtopicId, setSubtopicId] = useState('')
  const [notes, setNotes] = useState('')
  const [youtubeId, setYoutubeId] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')
  const [status, setStatus] = useState(null)
  const [resources, setResources] = useState([])

  useEffect(() => {
    if (!subtopicId) {
      setResources([])
      return
    }
    let cancelled = false
    getResourcesForSubtopic(subtopicId).then((data) => {
      if (!cancelled) setResources(data)
    })
    return () => {
      cancelled = true
    }
  }, [subtopicId])

  async function handleSave(e) {
    e.preventDefault()
    setStatus(null)
    try {
      if (notes) await upsertNotes(subtopicId, notes)
      if (youtubeId) await replaceVideo(subtopicId, { youtubeId, title: videoTitle })
      if (resourceTitle && resourceUrl) {
        await addResource(subtopicId, { title: resourceTitle, url: resourceUrl })
        setResources(await getResourcesForSubtopic(subtopicId))
      }
      setStatus('Saved.')
      onChanged()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  async function handleDeleteResource(id) {
    if (!window.confirm('Delete this resource?')) return
    try {
      await deleteResource(id)
      setResources((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Sub-topic Content</h2>
      <form onSubmit={handleSave} className="space-y-3">
        <Field label="Sub-topic">
          <select value={subtopicId} onChange={(e) => setSubtopicId(e.target.value)} className="input w-full" required>
            <option value="">Select...</option>
            {allSubtopics.map((st) => <option key={st.id} value={st.id}>{st.path}</option>)}
          </select>
        </Field>
        <Field label="Notes (leave blank to skip)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="input w-full" />
        </Field>
        <div className="flex flex-col sm:flex-row gap-2">
          <Field label="YouTube video ID" className="flex-1 min-w-0">
            <input value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className="input w-full" />
          </Field>
          <Field label="Video title" className="flex-1 min-w-0">
            <input value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="input w-full" />
          </Field>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Field label="Resource title" className="flex-1 min-w-0">
            <input value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} className="input w-full" />
          </Field>
          <Field label="Resource URL" className="flex-1 min-w-0">
            <input value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} className="input w-full" />
          </Field>
        </div>
        {status && <p className="text-sm text-indigo-600 dark:text-indigo-400">{status}</p>}
        <button type="submit" className="btn">Save Content</button>
      </form>

      {resources.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Existing resources for this sub-topic</h3>
          <ul className="space-y-1">
            {resources.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 text-sm">
                <a href={r.url} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline truncate">
                  {r.title}
                </a>
                <button
                  type="button"
                  onClick={() => handleDeleteResource(r.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 text-xs font-medium shrink-0"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function QuestionForm({ sections }) {
  const allSubtopics = sections.flatMap((s) => s.topics.flatMap((t) => t.subtopics.map((st) => ({ ...st, sectionName: s.name, path: `${s.name} / ${t.name} / ${st.name}` }))))
  const [subtopicId, setSubtopicId] = useState('')
  const [type, setType] = useState('mcq')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIndex, setCorrectIndex] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [explanation, setExplanation] = useState('')
  const [difficulty, setDifficulty] = useState('Beginner')
  const [status, setStatus] = useState(null)
  const [questions, setQuestions] = useState([])

  const selectedSubtopic = allSubtopics.find((st) => st.id === subtopicId)

  useEffect(() => {
    if (!subtopicId) {
      setQuestions([])
      return
    }
    let cancelled = false
    getQuestionsForSubtopic(subtopicId).then((data) => {
      if (!cancelled) setQuestions(data)
    })
    return () => {
      cancelled = true
    }
  }, [subtopicId])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    try {
      await addQuestion({
        subtopicId: subtopicId || null,
        section: selectedSubtopic?.sectionName,
        type,
        question,
        options: options.filter(Boolean),
        correctIndex: Number(correctIndex),
        correctAnswer,
        explanation,
        difficulty,
      })
      setQuestion('')
      setOptions(['', '', '', ''])
      setCorrectAnswer('')
      setExplanation('')
      setStatus('Question added.')
      if (subtopicId) setQuestions(await getQuestionsForSubtopic(subtopicId))
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  async function handleDeleteQuestion(id) {
    if (!window.confirm('Delete this question? This cannot be undone.')) return
    try {
      await deleteQuestion(id)
      setQuestions((prev) => prev.filter((q) => q.id !== id))
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Practice Question</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Sub-topic">
          <select value={subtopicId} onChange={(e) => setSubtopicId(e.target.value)} className="input w-full" required>
            <option value="">Select...</option>
            {allSubtopics.map((st) => <option key={st.id} value={st.id}>{st.path}</option>)}
          </select>
        </Field>
        <Field label="Type">
          <select value={type} onChange={(e) => setType(e.target.value)} className="input">
            <option value="mcq">MCQ</option>
            <option value="tita">TITA</option>
          </select>
        </Field>
        <Field label="Question">
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2} className="input w-full" required />
        </Field>
        {type === 'mcq' ? (
          <>
            {options.map((opt, i) => (
              <Field key={i} label={`Option ${i + 1}`}>
                <input
                  value={opt}
                  onChange={(e) => setOptions((prev) => prev.map((o, oi) => (oi === i ? e.target.value : o)))}
                  className="input w-full"
                />
              </Field>
            ))}
            <Field label="Correct option index (0-based)">
              <input type="number" min="0" max="3" value={correctIndex} onChange={(e) => setCorrectIndex(e.target.value)} className="input" />
            </Field>
          </>
        ) : (
          <Field label="Correct answer">
            <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="input w-full" required />
          </Field>
        )}
        <Field label="Explanation">
          <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={2} className="input w-full" required />
        </Field>
        <Field label="Difficulty">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="input">
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        {status && <p className="text-sm text-indigo-600 dark:text-indigo-400">{status}</p>}
        <button type="submit" className="btn">Add Question</button>
      </form>

      {questions.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Existing questions for this sub-topic</h3>
          <ul className="space-y-1">
            {questions.map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-gray-700 dark:text-gray-300 truncate">
                  {q.question}
                  <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">({q.type.toUpperCase()})</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 text-xs font-medium shrink-0"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

const FORMAT_EXAMPLE = `Q: What is 1/8 as a percentage?
A) 8%
B) 12.5%
C) 18%
D) 80%
ANSWER: B
EXPLANATION: 1/8 = 0.125 = 12.5%.
DIFFICULTY: Beginner

Q: What is the remainder when 17 is divided by 5?
TYPE: TITA
ANSWER: 2
EXPLANATION: 17 = 3*5 + 2, remainder 2.`

function BulkQuestionUploadForm({ sections }) {
  const allSubtopics = sections.flatMap((s) => s.topics.flatMap((t) => t.subtopics.map((st) => ({ ...st, sectionName: s.name, path: `${s.name} / ${t.name} / ${st.name}` }))))
  const [subtopicId, setSubtopicId] = useState('')
  const [fileName, setFileName] = useState('')
  const [parsed, setParsed] = useState(null)
  const [parsing, setParsing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [showFormat, setShowFormat] = useState(false)

  const selectedSubtopic = allSubtopics.find((st) => st.id === subtopicId)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setParsed(null)
    setStatus(null)
    setParsing(true)
    try {
      let text
      if (file.name.toLowerCase().endsWith('.pdf')) {
        const { extractTextFromPdf } = await import('../lib/pdfTextExtractor')
        text = await extractTextFromPdf(file)
      } else {
        text = await file.text()
      }
      setParsed(parseQuestionsText(text))
    } catch (err) {
      setStatus(`Error reading file: ${err.message}`)
    }
    setParsing(false)
  }

  async function handleConfirm() {
    if (!parsed?.questions.length || !subtopicId) return
    setSaving(true)
    setStatus(null)
    try {
      await addQuestions(
        parsed.questions.map((q) => ({ ...q, subtopicId, section: selectedSubtopic?.sectionName }))
      )
      setStatus(`Added ${parsed.questions.length} question${parsed.questions.length === 1 ? '' : 's'}.`)
      setParsed(null)
      setFileName('')
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
    setSaving(false)
  }

  return (
    <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Bulk Upload Questions</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Upload a .txt or .pdf file of questions in the format below - they'll be parsed and shown for review before
        anything is saved.{' '}
        <button type="button" onClick={() => setShowFormat((v) => !v)} className="text-indigo-600 dark:text-indigo-400 hover:underline">
          {showFormat ? 'Hide format' : 'Show format'}
        </button>
      </p>

      {showFormat && (
        <pre className="text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-4 overflow-x-auto whitespace-pre-wrap">
{FORMAT_EXAMPLE}
        </pre>
      )}

      <div className="space-y-3">
        <Field label="Sub-topic">
          <select value={subtopicId} onChange={(e) => setSubtopicId(e.target.value)} className="input w-full" required>
            <option value="">Select...</option>
            {allSubtopics.map((st) => <option key={st.id} value={st.id}>{st.path}</option>)}
          </select>
        </Field>
        <Field label="Question file (.txt or .pdf)">
          <input type="file" accept=".txt,.pdf" onChange={handleFile} className="input w-full" />
        </Field>

        {parsing && <p className="text-sm text-gray-500 dark:text-gray-400">Parsing {fileName}...</p>}

        {parsed && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium text-green-700 dark:text-green-400">{parsed.questions.length} question{parsed.questions.length === 1 ? '' : 's'} parsed successfully</span>
              {parsed.errors.length > 0 && (
                <span className="text-red-600 dark:text-red-400"> - {parsed.errors.length} block{parsed.errors.length === 1 ? '' : 's'} had errors and will be skipped</span>
              )}
            </p>

            {parsed.errors.length > 0 && (
              <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
                {parsed.errors.map((e, i) => (
                  <li key={i}>Block {e.position}: {e.message} ({e.preview}...)</li>
                ))}
              </ul>
            )}

            {parsed.questions.length > 0 && (
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 max-h-56 overflow-y-auto">
                {parsed.questions.map((q, i) => (
                  <li key={i} className="truncate">
                    {i + 1}. {q.question} <span className="text-gray-400 dark:text-gray-500 text-xs">({q.type.toUpperCase()})</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              disabled={!subtopicId || parsed.questions.length === 0 || saving}
              className="btn disabled:opacity-50"
            >
              {saving ? 'Adding...' : `Add ${parsed.questions.length} Question${parsed.questions.length === 1 ? '' : 's'}`}
            </button>
            {!subtopicId && <p className="text-xs text-amber-600 dark:text-amber-400">Select a sub-topic above before confirming.</p>}
          </div>
        )}

        {status && <p className="text-sm text-indigo-600 dark:text-indigo-400">{status}</p>}
      </div>
    </section>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="block text-gray-600 dark:text-gray-400 mb-1">{label}</span>
      {children}
    </label>
  )
}
