import { useAuth } from '../lib/auth'
import { useStreakAndBadges } from '../api/hooks/useStreakAndBadges'

export function StreakBadgesCard() {
  const { user } = useAuth()
  const { stats, badges, loading } = useStreakAndBadges(user?.id)

  if (!user || loading || !stats) return null

  const earned = badges.filter((b) => b.earned)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">Your Streak</h2>
        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          🔥 {stats.currentStreak} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">day{stats.currentStreak === 1 ? '' : 's'}</span>
        </span>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Includes one free grace day if you miss a day - it won't reset your streak to zero.</p>
      <div className="flex flex-wrap gap-2">
        {earned.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">No badges yet - answer a question to get started.</p>
        ) : (
          earned.map((b) => (
            <span
              key={b.key}
              title={b.description}
              className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-full font-medium"
            >
              🏅 {b.label}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
