import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMockTest } from '../api/hooks/useMockTest'
import { useExamSession } from '../store/examSession'
import { Timer } from '../components/exam/Timer'
import { QuestionNavPanel } from '../components/exam/QuestionNavPanel'
import { Calculator } from '../components/exam/Calculator'
import { SubmitConfirmModal } from '../components/exam/SubmitConfirmModal'

export function MockTestRunnerPage() {
  const { mockTestId } = useParams()
  const navigate = useNavigate()
  const [showCalculator, setShowCalculator] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const {
    test,
    sections,
    currentSectionIndex,
    currentQuestionId,
    questionsById,
    answers,
    sectionTimeRemaining,
    showFiveMinuteWarning,
    status,
    startTest,
    goToQuestion,
    selectAnswer,
    setTitaAnswer,
    toggleMarkForReview,
    tickCurrentSection,
    submitCurrentSection,
  } = useExamSession()

  const { mockTest: loadedTest, loading: mockTestLoading, error: mockTestError } = useMockTest(mockTestId)

  useEffect(() => {
    if (loadedTest && (!test || test.id !== mockTestId)) {
      startTest(loadedTest)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTest, mockTestId])

  useEffect(() => {
    if (status !== 'in_progress') return
    const interval = setInterval(() => tickCurrentSection(), 1000)
    return () => clearInterval(interval)
  }, [status, tickCurrentSection])

  useEffect(() => {
    if (status === 'submitted') navigate(`/results/${mockTestId}`)
  }, [status, mockTestId, navigate])

  if (mockTestError) return <p className="text-red-500">Couldn't load this test. Please try again.</p>
  if (!test) {
    return <p className="text-gray-500">{mockTestLoading ? 'Loading test...' : 'Test not found.'}</p>
  }

  const section = sections[currentSectionIndex]
  const question = questionsById[currentQuestionId]
  const answer = answers[currentQuestionId] || {}
  const isLastSection = currentSectionIndex === sections.length - 1

  function handleClear() {
    if (question.type === 'tita') setTitaAnswer(question.id, '')
    else selectAnswer(question.id, undefined)
  }

  function goNext() {
    const idx = section.questionIds.indexOf(currentQuestionId)
    const nextId = section.questionIds[idx + 1]
    if (nextId) goToQuestion(nextId)
  }

  return (
    <div className="-mx-4 -my-8 min-h-[calc(100vh-8.5rem)] flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-semibold text-gray-900 truncate">{test.title}</h1>
          <p className="text-sm text-gray-500">{section.name}</p>
        </div>
        <Timer secondsRemaining={sectionTimeRemaining[section.key]} warning={showFiveMinuteWarning} />
      </div>

      {showFiveMinuteWarning && (
        <div className="bg-red-50 text-red-700 text-sm text-center py-1.5 font-medium">
          Less than 5 minutes remaining in this section - it will auto-submit at zero.
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 p-3 sm:p-6">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 relative min-w-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              Question {section.questionIds.indexOf(currentQuestionId) + 1} of {section.questionIds.length}
            </span>
            {question.type === 'tita' && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                TITA - Type In The Answer
              </span>
            )}
          </div>

          <p className="text-gray-900 font-medium mb-5">{question.question}</p>

          {question.type === 'mcq' ? (
            <div className="space-y-2 max-w-lg">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectAnswer(question.id, i)}
                  className={`w-full text-left border rounded-lg px-4 py-2.5 transition-colors ${
                    answer.selectedIndex === i
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={answer.textAnswer || ''}
              onChange={(e) => setTitaAnswer(question.id, e.target.value)}
              placeholder="Type your answer"
              className="border border-gray-300 rounded-lg px-4 py-2.5 max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => toggleMarkForReview(question.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                answer.markedForReview
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {answer.markedForReview ? 'Marked for Review' : 'Mark for Review & Next'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Clear Response
            </button>
            <button
              type="button"
              onClick={goNext}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 sm:ml-auto"
            >
              Save & Next
            </button>
          </div>

          {section.key === 'QA' && (
            <div className="absolute bottom-4 right-4">
              {showCalculator ? (
                <Calculator onClose={() => setShowCalculator(false)} />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCalculator(true)}
                  className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow hover:bg-gray-700"
                >
                  🖩 Calculator
                </button>
              )}
            </div>
          )}
        </div>

        <div className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-4 h-fit">
          <QuestionNavPanel
            questionIds={section.questionIds}
            questionsById={questionsById}
            answers={answers}
            currentQuestionId={currentQuestionId}
            onSelect={goToQuestion}
          />
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="mt-4 w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-700"
          >
            {isLastSection ? 'Submit Test' : 'Submit Section'}
          </button>
        </div>
      </div>

      {confirmOpen && (
        <SubmitConfirmModal
          title={isLastSection ? 'Submit test?' : 'Submit this section?'}
          message={
            isLastSection
              ? 'This will end the test and take you to your results. You cannot return to any section afterward.'
              : 'You will not be able to return to this section once submitted.'
          }
          confirmLabel={isLastSection ? 'Submit Test' : 'Submit Section'}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false)
            submitCurrentSection()
          }}
        />
      )}
    </div>
  )
}
