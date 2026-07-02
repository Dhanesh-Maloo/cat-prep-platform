function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function Timer({ secondsRemaining, warning }) {
  return (
    <div
      className={`font-mono text-lg font-semibold px-3 py-1 rounded-lg ${
        warning ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {formatTime(secondsRemaining)}
    </div>
  )
}
