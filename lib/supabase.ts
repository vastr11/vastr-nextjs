import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tgcblotkdqzhoxcrjrwi.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_hB4gqBd9LS2B76ume9_rAg_b5s1UgAT'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)