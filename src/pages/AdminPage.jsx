import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { useIsAdmin } from '../api/hooks/useIsAdmin'
import { useSyllabus } from '../api/hooks/useSyllabus'
import { addSection, addTopic, addSubtopic, upsertNotes, replaceVideo, addResource, addQuestion } from '../api/admin'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']

export function AdminPage() {
  const { user } = useAuth()
  const { isAdmin, loading: adminLoading } = useIsAdmin(user?.id)
  const { sections, loading: syllabusLoading, refresh } = useSyllabus()

  if (!user) return <p className="text-gray-500">Log in to access the admin panel.</p>
  if (adminLoading || syllabusLoading) return <p className="text-gray-500">Loading...</p>
  if (!isAdmin) return <p className="text-red-500">You don't have admin access.</p>

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
      <SectionTopicSubtopicForm sections={sections} onChanged={refresh} />
      <SubtopicContentForm sections={sections} onChanged={refresh} />
      <QuestionForm sections={sections} />
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
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 mb-4">Syllabus Structure</h2>
      {status && <p className="text-sm mb-3 text-indigo-600">{status}</p>}

      <form onSubmit={handleAddSection} className="flex flex-wrap items-end gap-2 mb-4 pb-4 border-b border-gray-100">
        <Field label="New section name">
          <input value={sectionName} onChange={(e) => setSectionName(e.target.value)} className="input" required />
        </Field>
        <Field label="Full name">
          <input value={sectionFullName} onChange={(e) => setSectionFullName(e.target.value)} className="input" required />
        </Field>
        <button type="submit" className="btn">Add Section</button>
      </form>

      <form onSubmit={handleAddTopic} className="flex flex-wrap items-end gap-2 mb-4 pb-4 border-b border-gray-100">
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

  async function handleSave(e) {
    e.preventDefault()
    setStatus(null)
    try {
      if (notes) await upsertNotes(subtopicId, notes)
      if (youtubeId) await replaceVideo(subtopicId, { youtubeId, title: videoTitle })
      if (resourceTitle && resourceUrl) await addResource(subtopicId, { title: resourceTitle, url: resourceUrl })
      setStatus('Saved.')
      onChanged()
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 mb-4">Sub-topic Content</h2>
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
        {status && <p className="text-sm text-indigo-600">{status}</p>}
        <button type="submit" className="btn">Save Content</button>
      </form>
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

  const selectedSubtopic = allSubtopics.find((st) => st.id === subtopicId)

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
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="font-semibold text-gray-800 mb-4">Add Practice Question</h2>
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
        {status && <p className="text-sm text-indigo-600">{status}</p>}
        <button type="submit" className="btn">Add Question</button>
      </form>
    </section>
  )
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="block text-gray-600 mb-1">{label}</span>
      {children}
    </label>
  )
}
