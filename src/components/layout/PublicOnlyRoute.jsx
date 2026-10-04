import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import FullPageSpinner from '../ui/FullPageSpinner'

// Pages de connexion / inscription : un utilisateur déjà connecté est renvoyé vers l'app.
export default function PublicOnlyRoute() {
  const { user, loading } = useAuth()

  if (loading) return <FullPageSpinner />
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}
