function statusStyle(state) {
  switch (state) {
    case 'answered-marked':
      return 'bg-purple-600 text-white ring-2 ring-green-400'
    case 'answered':
      return 'bg-green-600 text-white'
    case 'marked':
      return 'bg-purple-600 text-white'
    case 'visited':
      return 'bg-red-100 text-red-700 border border-red-300'
    default:
      return 'bg-gray-100 text-gray-600 border border-gray-300'
  }
}

function questionState(questionId, answers, question) {
  const answer = answers[questionId]
  const hasAnswer =
    answer && (question.type === 'tita' ? Boolean(answer.textAnswer) : answer.selectedIndex !== undefined)
  const marked = Boolean(answer?.markedForReview)
  if (hasAnswer && marked) return 'answered-marked'
  if (hasAnswer) return 'answered'
  if (marked) return 'marked'
  if (answer) return 'visited'
  return 'not-visited'
}

export function QuestionNavPanel({ questionIds, questionsById, answers, currentQuestionId, onSelect }) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {questionIds.map((qid, i) => (
          <button
            key={qid}
            type="button"
            onClick={() => onSelect(qid)}
            className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${statusStyle(
              questionState(qid, answers, questionsById[qid])
            )} ${qid === currentQuestionId ? 'outline outline-2 outline-offset-1 outline-indigo-600' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ul className="space-y-1.5 text-xs text-gray-500">
        <li><span className="inline-block w-3 h-3 rounded-sm bg-green-600 mr-2 align-middle" />Answered</li>
        <li><span className="inline-block w-3 h-3 rounded-sm bg-red-100 border border-red-300 mr-2 align-middle" />Visited, not answered</li>
        <li><span className="inline-block w-3 h-3 rounded-sm bg-gray-100 border border-gray-300 mr-2 align-middle" />Not visited</li>
        <li><span className="inline-block w-3 h-3 rounded-sm bg-purple-600 mr-2 align-middle" />Marked for review</li>
      </ul>
    </div>
  )
}
