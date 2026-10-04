import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Logo from '../ui/Logo'

export default function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-stone-200/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-stone-500 sm:inline">{user.email}</span>
            <Button variant="ghost" onClick={signOut}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
