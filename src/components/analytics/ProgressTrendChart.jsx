import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAnalyticsData } from '../../api/hooks/useAnalyticsData'

export function ProgressTrendChart() {
  const { progressTrend } = useAnalyticsData()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-semibold text-gray-800 mb-1">Progress Over Time</h3>
      <p className="text-xs text-gray-500 mb-4">Raw score and approximate percentile across mock attempts</p>
      {progressTrend.length < 2 ? (
        <div className="h-[260px] flex items-center justify-center text-sm text-gray-400 text-center px-8">
          {progressTrend.length === 0
            ? 'No mock test attempts yet.'
            : `1 attempt so far — Raw score ${progressTrend[0].rawScore}, percentile ${progressTrend[0].percentile}. Complete another mock test to see a trend.`}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={progressTrend} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rawScore" name="Raw score" stroke="#473086" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="percentile" name="Percentile (approx.)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
