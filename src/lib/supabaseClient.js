import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Phase 1 runs entirely on placeholder data in src/data/. This client is
// unused until VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set in .env.
export const supabase = url && anonKey ? createClient(url, anonKey) : null
