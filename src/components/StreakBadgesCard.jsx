import { useAuth } from '../lib/auth'
import { useStreakAndBadges } from '../api/hooks/useStreakAndBadges'

export function StreakBadgesCard() {
  const { user } = useAuth()
  const { stats, badges, loading } = useStreakAndBadges(user?.id)

  if (!user || loading || !stats) return null

  const earned = badges.filter((b) => b.earned)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800">Your Streak</h2>
        <span className="text-2xl font-bold text-indigo-600">
          {stats.currentStreak} <span className="text-sm font-normal text-gray-500">day{stats.currentStreak === 1 ? '' : 's'}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {earned.length === 0 ? (
          <p className="text-sm text-gray-400">No badges yet - answer a question to get started.</p>
        ) : (
          earned.map((b) => (
            <span
              key={b.key}
              title={b.description}
              className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium"
            >
              🏅 {b.label}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
