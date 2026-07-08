import { TopicHeatmap } from '../components/analytics/TopicHeatmap'
import { TimePerQuestionChart } from '../components/analytics/TimePerQuestionChart'
import { ErrorClassificationChart } from '../components/analytics/ErrorClassificationChart'
import { ProgressTrendChart } from '../components/analytics/ProgressTrendChart'
import { SectionComparisonChart } from '../components/analytics/SectionComparisonChart'
import { AnalyticsDataProvider, useAnalyticsData } from '../api/hooks/useAnalyticsData'
import { useAuth } from '../lib/auth'
import { StreakBadgesCard } from '../components/StreakBadgesCard'

export function AnalyticsPage() {
  return (
    <AnalyticsDataProvider>
      <AnalyticsContent />
    </AnalyticsDataProvider>
  )
}

function AnalyticsContent() {
  const { user } = useAuth()
  const { usingRealData, loading } = useAnalyticsData()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Analytics</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        {!user && 'Built from your practice and mock test attempts. Log in and take a mock test to see your real data - showing sample history for now.'}
        {user && loading && 'Loading your attempts...'}
        {user && !loading && usingRealData && 'Reflecting your real mock test attempts.'}
        {user && !loading && !usingRealData && "You haven't completed a mock test yet - showing sample history so you can see what this looks like."}
      </p>
      <StreakBadgesCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ProgressTrendChart />
        <SectionComparisonChart />
        <TopicHeatmap />
        <TimePerQuestionChart />
        <div className="lg:col-span-2">
          <ErrorClassificationChart />
        </div>
      </div>
    </div>
  )
}
