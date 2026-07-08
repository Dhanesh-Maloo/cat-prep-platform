import { supabase } from '../lib/supabaseClient'
import { computeCohortStats } from '../lib/cohortStats'

/**
 * Institute-style "All India Rank" for a mock test: rank and percentile
 * computed against everyone who's actually taken THIS test, not a generic
 * historical lookup table. Returns null if the RPC isn't available yet
 * (schema not applied) or there's no cohort data to compare against.
 */
export async function getMockTestCohortStats(mockTestId, userRawScore, userSectionScores) {
  const { data, error } = await supabase.rpc('get_mock_test_cohort', { p_mock_test_id: mockTestId })
  if (error) {
    console.error('Failed to load cohort stats:', error.message)
    return null
  }
  if (!data) return null
  return computeCohortStats(data, userRawScore, userSectionScores)
}
