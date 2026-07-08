import { supabase } from '../lib/supabaseClient'

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function addSection({ name, fullName }) {
  const { error } = await supabase.from('sections').insert({ id: slugify(name), name, full_name: fullName, sort_order: 0 })
  if (error) throw error
}

export async function addTopic({ sectionId, name }) {
  const { error } = await supabase.from('topics').insert({ id: `${sectionId}-${slugify(name)}`, section_id: sectionId, name, sort_order: 0 })
  if (error) throw error
}

export async function addSubtopic({ topicId, name, difficulty }) {
  const { error } = await supabase
    .from('subtopics')
    .insert({ id: `${topicId}-${slugify(name)}`, topic_id: topicId, name, difficulty, sort_order: 0 })
  if (error) throw error
}

export async function upsertNotes(subtopicId, body) {
  const { error } = await supabase.from('notes').upsert({ subtopic_id: subtopicId, body, updated_at: new Date().toISOString() })
  if (error) throw error
}

export async function replaceVideo(subtopicId, { youtubeId, title }) {
  await supabase.from('videos').delete().eq('subtopic_id', subtopicId)
  if (!youtubeId) return
  const { error } = await supabase.from('videos').insert({ subtopic_id: subtopicId, youtube_id: youtubeId, title })
  if (error) throw error
}

export async function addResource(subtopicId, { title, url }) {
  const { error } = await supabase.from('resources').insert({ subtopic_id: subtopicId, title, url })
  if (error) throw error
}

export async function getResourcesForSubtopic(subtopicId) {
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, url')
    .eq('subtopic_id', subtopicId)
    .order('title')
  if (error) throw error
  return data
}

export async function deleteResource(id) {
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) throw error
}

function questionToRow(question) {
  return {
    subtopic_id: question.subtopicId || null,
    section: question.section || null,
    type: question.type,
    question: question.question,
    options: question.type === 'mcq' ? question.options : null,
    correct_index: question.type === 'mcq' ? question.correctIndex : null,
    correct_answer: question.type === 'tita' ? question.correctAnswer : null,
    explanation: question.explanation,
    difficulty: question.difficulty || null,
  }
}

export async function addQuestion(question) {
  const { error } = await supabase.from('questions').insert(questionToRow(question))
  if (error) throw error
}

/** Bulk insert, e.g. from a parsed question-file upload. Single round trip. */
export async function addQuestions(questions) {
  const { error } = await supabase.from('questions').insert(questions.map(questionToRow))
  if (error) throw error
}

export async function getQuestionsForSubtopic(subtopicId) {
  const { data, error } = await supabase
    .from('questions')
    .select('id, question, type')
    .eq('subtopic_id', subtopicId)
    .order('question')
  if (error) throw error
  return data
}

export async function deleteQuestion(id) {
  const { error } = await supabase.from('questions').delete().eq('id', id)
  if (error) throw error
}
