import { supabase } from '../lib/supabase'

// Toutes les fonctions renvoient { data, error } : c'est le format de Supabase.
// Les composants n'appellent jamais Supabase directement, ils passent par ce fichier.

export function signUp(email, password) {
  return supabase.auth.signUp({ email, password })
}

export function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function signOut() {
  return supabase.auth.signOut()
}

// Appelle callback(session) au démarrage (session existante ou null),
// puis à chaque connexion / déconnexion. Renvoie une fonction pour se désabonner.
export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return () => data.subscription.unsubscribe()
}
