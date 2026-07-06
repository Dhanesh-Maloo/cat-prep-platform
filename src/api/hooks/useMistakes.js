import { useCallback, useEffect, useState } from 'react'
import { getMistakes } from '../mistakes'

export function useMistakes(userId) {
  const [mistakes, setMistakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    try {
      setMistakes(await getMistakes(userId))
      setError(null)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  return { mistakes, loading, error, refresh: load }
}
