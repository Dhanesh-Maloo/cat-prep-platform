import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scoreToPercentile } from '../lib/percentileTable'

export function PercentilePredictorPage() {
  const [score, setScore] = useState('')
  const parsed = score === '' ? null : Number(score)
  const percentile = parsed !== null && !Number.isNaN(parsed) ? scoreToPercentile(parsed) : null

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Percentile Predictor</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Enter a raw CAT score (out of roughly 198, across all three sections) to see an approximate percentile. Use
        this after an external mock or the actual CAT exam to gauge where you stand.
      </p>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-4">
        <label className="block text-sm mb-4">
          <span className="block text-gray-600 dark:text-gray-400 mb-1">Your raw score</span>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="e.g. 95"
            className="input w-full text-lg"
          />
        </label>

        {percentile !== null && (
          <div className="text-center py-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estimated percentile</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{percentile}<span className="text-lg text-gray-400 dark:text-gray-500">th</span></p>
          </div>
        )}
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
        This is a rough approximation based on publicly discussed historical CAT score-to-percentile curves, not an
        official or year-specific mapping. CAT is normalized every year based on the relative difficulty of each
        slot, so the same raw score can land at a meaningfully different percentile from one year to the next. Treat
        this as a directional estimate, not a guarantee.
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        For sectional targets and the strategy behind hitting them, see the{' '}
        <Link to="/playbook" className="text-indigo-600 dark:text-indigo-400 hover:underline">99th Percentile Playbook</Link>.
      </p>
    </div>
  )
}
