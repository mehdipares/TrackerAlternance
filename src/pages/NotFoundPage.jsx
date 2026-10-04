import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10 text-center">
      <title>Page introuvable · Alternance Tracker</title>
      <div>
        <Logo />
        <p className="mt-10 text-6xl font-extrabold tracking-tight text-brand-600">404</p>
        <h1 className="mt-2 text-xl font-bold text-stone-900">Cette page n’existe pas</h1>
        <p className="mt-1 text-stone-500">Le lien est peut-être incorrect ou la page a été déplacée.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}
