import { useAuth } from '../hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <section>
      <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Tableau de bord</h1>
      <p className="mt-1 text-stone-500">Connecté en tant que {user.email}</p>
    </section>
  )
}
