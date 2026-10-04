import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../ui/Logo'
import Spinner from '../ui/Spinner'
import NavItems from './NavItems'

export default function AppLayout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-stone-200/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-1 sm:flex" aria-label="Navigation principale">
              <NavItems variant="top" />
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-stone-500 lg:inline">{user.email}</span>
            {/* Sur mobile : icône seule, pour que l'en-tête tienne dans la largeur de l'écran */}
            <button
              type="button"
              onClick={signOut}
              aria-label="Déconnexion"
              className="inline-flex items-center gap-2 rounded-xl p-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 sm:px-4"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" />
              </svg>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* pb-24 sur mobile : laisse de la place à la barre de navigation du bas */}
      <main className="mx-auto max-w-5xl px-4 pt-6 pb-24 sm:py-10">
        {/* Pendant le chargement d'une page, l'en-tête et la navigation restent visibles */}
        <Suspense
          fallback={
            <div className="grid place-items-center py-20 text-brand-600">
              <Spinner className="size-8" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
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
