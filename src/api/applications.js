import { supabase } from '../lib/supabase'

// Toutes les requêtes sur la table applications.
// Pas besoin de filtrer par utilisateur : le RLS ne renvoie que ses lignes,
// et user_id est rempli automatiquement par la base à l'insertion.
// En cas d'erreur, on la lance (throw) : c'est le hook appelant qui l'attrape.

const TABLE = 'applications'

export async function fetchApplications() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createApplication(values) {
  const { data, error } = await supabase.from(TABLE).insert(values).select().single()

  if (error) throw error
  return data
}

export async function updateApplication(id, values) {
  const { data, error } = await supabase.from(TABLE).update(values).eq('id', id).select().single()

  if (error) throw error
  return data
}

export async function deleteApplication(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)

  if (error) throw error
}
