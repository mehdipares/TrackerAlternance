import { createContext, useEffect, useState } from 'react'
import { onAuthChange, signIn, signOut, signUp } from '../api/auth'

export const AuthContext = createContext(null)

// Rend l'utilisateur connecté disponible dans toute l'application,
// sans avoir à le passer de composant en composant via les props.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // true tant qu'on ne sait pas encore si une session existe
  // (évite d'afficher la page de connexion une fraction de seconde au rechargement).
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((newSession) => {
      setSession(newSession)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    user: session?.user ?? null,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
