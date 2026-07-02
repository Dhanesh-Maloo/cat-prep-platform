import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useIsAdmin(userId) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(Boolean(userId))

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false)
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        setIsAdmin(data?.role === 'admin')
        setLoading(false)
      })
  }, [userId])

  return { isAdmin, loading }
}
