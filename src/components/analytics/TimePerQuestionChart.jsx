import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAnalyticsData } from '../../api/hooks/useAnalyticsData'

export function TimePerQuestionChart() {
  const { topicStats } = useAnalyticsData()
  const overTime = topicStats.filter((t) => t.overTimeCount > 0)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Time-per-Question vs. Recommended</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Seconds spent on average vs. the recommended pace per topic</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={topicStats} margin={{ left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="topic" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={70} />
          <YAxis tick={{ fontSize: 11 }} label={{ value: 'seconds', angle: -90, position: 'insideLeft', fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgTimeSeconds" name="Avg time taken" fill="#473086" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recommendedTime" name="Recommended time" fill="#c4b5fd" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      {overTime.length > 0 && (
        <div className="mt-3 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 rounded-lg px-3 py-2">
          Spending 2x+ the recommended time on: {overTime.map((t) => t.topic).join(', ')}
        </div>
      )}
    </div>
  )
}
