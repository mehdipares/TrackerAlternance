import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import FullPageSpinner from '../ui/FullPageSpinner'

// Pages réservées aux utilisateurs connectés.
// Rappel : c'est du confort d'affichage. La vraie sécurité des données, c'est le RLS côté base.
export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <FullPageSpinner />
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
