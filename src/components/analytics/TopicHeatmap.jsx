import { useAnalyticsData } from '../../api/hooks/useAnalyticsData'

const ACCENT = { r: 0x47, g: 0x30, b: 0x86 } // #473086
const LIGHT = { r: 0xf1, g: 0xed, b: 0xfa }

function colorForAccuracy(pct) {
  const t = Math.max(0, Math.min(100, pct)) / 100
  const r = Math.round(LIGHT.r + (ACCENT.r - LIGHT.r) * t)
  const g = Math.round(LIGHT.g + (ACCENT.g - LIGHT.g) * t)
  const b = Math.round(LIGHT.b + (ACCENT.b - LIGHT.b) * t)
  return `rgb(${r}, ${g}, ${b})`
}

export function TopicHeatmap() {
  const { topicStats } = useAnalyticsData()

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Topic-wise Accuracy Heatmap</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Darker = higher accuracy</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {topicStats.map((t) => {
          const bg = colorForAccuracy(t.accuracyPct)
          const textColor = t.accuracyPct >= 50 ? 'white' : '#374151'
          return (
            <div
              key={t.topic}
              className="rounded-lg p-3 flex flex-col justify-between min-h-[84px]"
              style={{ backgroundColor: bg, color: textColor }}
            >
              <p className="text-xs font-medium opacity-90">{t.section}</p>
              <p className="text-sm font-semibold leading-tight mt-1">{t.topic}</p>
              <p className="text-lg font-bold mt-2">{t.accuracyPct}%</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
