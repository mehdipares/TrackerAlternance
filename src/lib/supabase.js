import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Variables Supabase manquantes : copiez .env.example en .env.local et remplissez-le.',
  )
}

// Un seul client pour toute l'application, importé par les fichiers de src/api.
export const supabase = createClient(supabaseUrl, supabaseKey)
