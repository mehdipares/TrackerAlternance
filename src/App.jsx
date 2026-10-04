import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import PublicOnlyRoute from './components/layout/PublicOnlyRoute'
import FullPageSpinner from './components/ui/FullPageSpinner'
import { AuthProvider } from './context/AuthContext'

// Chargement à la demande (lazy loading) : le code d'une page n'est téléchargé
// que lorsqu'on y navigue. Un visiteur sur la page de connexion ne télécharge pas le tableau de bord.
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'))
const KanbanPage = lazy(() => import('./pages/KanbanPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Suspense affiche le spinner pendant le téléchargement d'une page */}
        <Suspense fallback={<FullPageSpinner />}>
          <Routes>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="candidatures" element={<ApplicationsPage />} />
                <Route path="kanban" element={<KanbanPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
