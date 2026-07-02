const STYLES = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-red-100 text-red-700',
}

export function DifficultyBadge({ level }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[level] || 'bg-gray-100 text-gray-600'}`}>
      {level}
    </span>
  )
}
