import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import NavItems from './NavItems'

export default function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-stone-200/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-1 sm:flex" aria-label="Navigation principale">
              <NavItems variant="top" />
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-stone-500 lg:inline">{user.email}</span>
            <Button variant="ghost" onClick={signOut}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* pb-24 sur mobile : laisse de la place à la barre de navigation du bas */}
      <main className="mx-auto max-w-5xl px-4 pt-6 pb-24 sm:py-10">
        <Outlet />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-10 flex border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden"
        aria-label="Navigation principale"
      >
        <NavItems variant="bottom" />
      </nav>
    </div>
  )
}
