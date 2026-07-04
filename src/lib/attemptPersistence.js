// Auto-save layer for in-progress attempts. Currently backed by localStorage
// so answers survive a refresh/crash during development. Once Supabase is
// wired up, saveAnswer should upsert into `question_attempts` and loadAnswers
// should be replaced by a query scoped to the current user + mock_test_id -
// the call sites in the exam store don't need to change shape.

const keyFor = (attemptId) => `cat-prep-attempt:${attemptId}`

export function saveAnswers(attemptId, answers) {
  try {
    localStorage.setItem(keyFor(attemptId), JSON.stringify(answers))
  } catch {
    // localStorage unavailable (e.g. private browsing) - auto-save is best-effort
  }
}

export function loadAnswers(attemptId) {
  try {
    const raw = localStorage.getItem(keyFor(attemptId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearAnswers(attemptId) {
  try {
    localStorage.removeItem(keyFor(attemptId))
  } catch {
    // ignore
  }
}
