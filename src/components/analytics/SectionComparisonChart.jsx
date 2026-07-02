import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAnalyticsData } from '../../api/hooks/useAnalyticsData'

export function SectionComparisonChart() {
  const { sectionComparison } = useAnalyticsData()

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-semibold text-gray-800 mb-1">Section-wise Comparison</h3>
      <p className="text-xs text-gray-500 mb-4">Average score per section across all mock attempts</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={sectionComparison} margin={{ left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="section" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="avgScore" name="Avg score" fill="#473086" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
