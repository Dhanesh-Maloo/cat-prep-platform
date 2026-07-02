// Pushes the Phase 1/2 dummy content (src/data/*.js) into Supabase so the
// frontend has something real to query once it's switched off dummy data.
// Idempotent: text-keyed tables use upsert; uuid-keyed tables are cleared
// and re-inserted on each run.
//
// Usage: node --env-file=.env scripts/seed.mjs

import { createClient } from '@supabase/supabase-js'
import { sections, findSubtopic } from '../src/data/syllabus.js'
import { content } from '../src/data/content.js'
import { questions as practiceQuestionsBySubtopic } from '../src/data/questions.js'
import { mockTests, mockTestQuestions } from '../src/data/mockTests.js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error(
    'Missing VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Seeding writes past Row Level Security, so it needs the secret key — add\n' +
      'SUPABASE_SERVICE_ROLE_KEY=... to .env (never commit it, never use it in frontend code).\n' +
      'Run with: node --env-file=.env scripts/seed.mjs'
  )
  process.exit(1)
}

// Service-role client: local/admin use only. Never import this key into src/.
const supabase = createClient(url, serviceRoleKey)

function must(label, { error, data }) {
  if (error) {
    console.error(`✗ ${label}:`, error.message)
    process.exit(1)
  }
  console.log(`✓ ${label}${data ? ` (${data.length})` : ''}`)
  return data
}

async function seedSyllabus() {
  const sectionRows = sections.map((s, i) => ({
    id: s.id,
    name: s.name,
    full_name: s.fullName,
    sort_order: i,
  }))
  must('sections', await supabase.from('sections').upsert(sectionRows))

  const topicRows = []
  const subtopicRows = []
  sections.forEach((s) => {
    s.topics.forEach((t, ti) => {
      topicRows.push({ id: t.id, section_id: s.id, name: t.name, sort_order: ti })
      t.subtopics.forEach((st, sti) => {
        subtopicRows.push({
          id: st.id,
          topic_id: t.id,
          name: st.name,
          difficulty: st.difficulty,
          sort_order: sti,
        })
      })
    })
  })
  must('topics', await supabase.from('topics').upsert(topicRows))
  must('subtopics', await supabase.from('subtopics').upsert(subtopicRows))

  const noteRows = Object.entries(content).map(([subtopicId, c]) => ({
    subtopic_id: subtopicId,
    body: c.notes,
  }))
  must('notes', await supabase.from('notes').upsert(noteRows))

  await supabase.from('videos').delete().not('id', 'is', null)
  const videoRows = Object.entries(content).map(([subtopicId, c]) => ({
    subtopic_id: subtopicId,
    youtube_id: c.video.youtubeId,
    title: c.video.title,
  }))
  must('videos', await supabase.from('videos').insert(videoRows).select())

  await supabase.from('resources').delete().not('id', 'is', null)
  const resourceRows = Object.entries(content).flatMap(([subtopicId, c]) =>
    c.resources.map((r) => ({ subtopic_id: subtopicId, title: r.title, url: r.url }))
  )
  must('resources', await supabase.from('resources').insert(resourceRows).select())
}

async function seedPracticeQuestions() {
  await supabase.from('questions').delete().not('id', 'is', null)

  const rows = Object.entries(practiceQuestionsBySubtopic).flatMap(([subtopicId, qs]) => {
    const match = findSubtopic(subtopicId)
    return qs.map((q) => ({
      subtopic_id: subtopicId,
      section: match?.section.name ?? null,
      type: 'mcq',
      question: q.question,
      options: q.options,
      correct_index: q.correctIndex,
      explanation: q.explanation,
      difficulty: match?.subtopic.difficulty ?? null,
    }))
  })
  return must('practice questions', await supabase.from('questions').insert(rows).select())
}

async function seedMockTests(practiceQuestionRows) {
  await supabase.from('mock_test_questions').delete().not('mock_test_id', 'is', null)
  await supabase.from('mock_tests').delete().not('id', 'is', null)

  for (const test of mockTests) {
    const insertedTests = must(
      `mock_test: ${test.title}`,
      await supabase
        .from('mock_tests')
        .insert({
          title: test.title,
          type: test.type,
          duration_minutes: test.sections.reduce((sum, s) => sum + s.durationMinutes, 0),
          sections: test.sections.map((s) => ({ key: s.key, name: s.name, duration_minutes: s.durationMinutes })),
        })
        .select()
    )
    const mockTestId = insertedTests[0].id

    const questionDefs = mockTestQuestions[test.id] || []
    const questionRows = questionDefs.map((q) => ({
      section: q.section,
      type: q.type,
      question: q.question,
      options: q.options ?? null,
      correct_index: q.correctIndex ?? null,
      correct_answer: q.correctAnswer ?? null,
      explanation: q.explanation,
      recommended_time_seconds: q.recommendedTimeSeconds,
    }))
    const insertedQuestions = must(
      `mock test questions: ${test.title}`,
      await supabase.from('questions').insert(questionRows).select()
    )

    const junctionRows = insertedQuestions.map((row, i) => ({
      mock_test_id: mockTestId,
      question_id: row.id,
      section: questionDefs[i].section,
      order_index: i,
    }))
    must(`mock_test_questions: ${test.title}`, await supabase.from('mock_test_questions').insert(junctionRows))
  }

  return practiceQuestionRows
}

async function main() {
  await seedSyllabus()
  const practiceQuestionRows = await seedPracticeQuestions()
  await seedMockTests(practiceQuestionRows)
  console.log('\nSeed complete.')
}

main()
