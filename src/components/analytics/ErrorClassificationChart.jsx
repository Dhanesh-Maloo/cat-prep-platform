import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAnalyticsData } from '../../api/hooks/useAnalyticsData'

const COLORS = { silly_mistake: '#f59e0b', conceptual_gap: '#ef4444', time_pressure: '#473086' }

export function ErrorClassificationChart() {
  const { errorBreakdown } = useAnalyticsData()
  const total = errorBreakdown.reduce((sum, e) => sum + e.count, 0)

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Error Classification</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {total > 0 ? `${total} tagged misses across all attempts` : 'No tagged misses yet'}
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={errorBreakdown} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} width={110} />
          <Tooltip />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {errorBreakdown.map((e) => (
              <Cell key={e.key} fill={COLORS[e.key]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
