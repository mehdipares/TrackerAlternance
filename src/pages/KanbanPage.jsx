import { useState } from 'react'
import { Link } from 'react-router-dom'
import KanbanBoard from '../components/kanban/KanbanBoard'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useApplications } from '../hooks/useApplications'

export default function KanbanPage() {
  const { applications, loading, error, reload, moveApplication } = useApplications()
  const [moveError, setMoveError] = useState(null)

  async function handleMove(application, status) {
    setMoveError(null)
    try {
      await moveApplication(application, status)
    } catch {
      // Le hook a déjà remis la carte dans sa colonne d'origine.
      setMoveError(`Le déplacement de ${application.company} n’a pas pu être enregistré. La carte a été remise à sa place.`)
    }
  }

  return (
    <section>
      <title>Kanban · Alternance Tracker</title>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Kanban</h1>
        <p className="mt-1 text-stone-500">
          <span className="hidden md:inline">Glissez une carte vers une autre colonne pour changer son statut.</span>
          <span className="md:hidden">Faites glisser une carte par sa poignée ⠿ vers une autre section.</span>
        </p>
      </div>

      {moveError && (
        <div className="mb-4">
          <Alert>{moveError}</Alert>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-3 md:flex-row md:overflow-hidden" aria-busy="true" aria-label="Chargement du kanban">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-32 w-full shrink-0 animate-pulse rounded-2xl bg-stone-100 md:h-72 md:w-72" />
          ))}
        </div>
      ) : error ? (
        <div className="space-y-3">
          <Alert>{error}</Alert>
          <Button variant="secondary" onClick={reload}>
            Réessayer
          </Button>
        </div>
      ) : applications.length === 0 ? (
        <EmptyState icon="🗂️" title="Aucune candidature à organiser">
          <p>Ajoutez des candidatures pour les retrouver ici, rangées par statut.</p>
          <Link
            to="/candidatures"
            className="mt-4 inline-block rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Ajouter une candidature
          </Link>
        </EmptyState>
      ) : (
        <KanbanBoard applications={applications} onMove={handleMove} />
      )}
    </section>
  )
}
