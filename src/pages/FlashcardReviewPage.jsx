import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabaseClient'
import { reviewFlashcard } from '../api/bookmarks'

export function FlashcardReviewPage() {
  const { user } = useAuth()
  const [cards, setCards] = useState(null)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase
      .from('bookmarks')
      .select('*, questions(question, options, correct_index, correct_answer, explanation, type)')
      .eq('user_id', user.id)
      .not('question_id', 'is', null)
      .lte('next_review_at', new Date().toISOString())
      .then(({ data }) => setCards(data || []))
  }, [user])

  if (!user) return <p className="text-gray-500">Log in to review flashcards.</p>
  if (cards === null) return <p className="text-gray-500">Loading...</p>
  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">No flashcards due</h1>
        <p className="text-gray-600 mb-6">Check back later, or bookmark more questions during practice.</p>
        <Link to="/bookmarks" className="text-indigo-600 hover:underline">← Back to Bookmarks</Link>
      </div>
    )
  }
  if (index >= cards.length) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Review complete</h1>
        <p className="text-gray-600 mb-6">You reviewed {cards.length} flashcard{cards.length === 1 ? '' : 's'}.</p>
        <Link to="/bookmarks" className="text-indigo-600 hover:underline">← Back to Bookmarks</Link>
      </div>
    )
  }

  const card = cards[index]
  const question = card.questions

  async function handleRate(remembered) {
    await reviewFlashcard(card, remembered)
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  return (
    <div className="max-w-xl mx-auto">
      <p className="text-sm text-gray-500 mb-4">Flashcard {index + 1} of {cards.length}</p>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-900 font-medium mb-4">{question.question}</p>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            Reveal answer
          </button>
        ) : (
          <>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-sm text-gray-700 mb-4">
              <p className="font-medium text-indigo-700 mb-1">
                Answer: {question.type === 'tita' ? question.correct_answer : question.options[question.correct_index]}
              </p>
              {question.explanation}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleRate(false)}
                className="flex-1 bg-red-50 text-red-700 px-4 py-2.5 rounded-lg font-medium hover:bg-red-100"
              >
                Missed it
              </button>
              <button
                type="button"
                onClick={() => handleRate(true)}
                className="flex-1 bg-green-50 text-green-700 px-4 py-2.5 rounded-lg font-medium hover:bg-green-100"
              >
                Got it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
