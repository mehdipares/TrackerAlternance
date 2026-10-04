import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ApplicationForm from '../components/applications/ApplicationForm'
import ApplicationList from '../components/applications/ApplicationList'
import ApplicationListSkeleton from '../components/applications/ApplicationListSkeleton'
import Filters from '../components/applications/Filters'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import { useApplications } from '../hooks/useApplications'
import { countByStatus, filterApplications } from '../utils/filters'
import { getStatus } from '../utils/status'

export default function ApplicationsPage() {
  const { applications, loading, error, reload, addApplication, editApplication, removeApplication } =
    useApplications()

  // null = fenêtre fermée ; 'new' = ajout ; un objet candidature = modification de celle-ci.
  const [editing, setEditing] = useState(null)
  const isNew = editing === 'new'

  // Les filtres vivent dans l'URL (?statut=sent&q=doc) : le bouton « Retour » fonctionne,
  // et d'autres pages peuvent ouvrir la liste déjà filtrée.
  const [searchParams, setSearchParams] = useSearchParams()
  const statusParam = searchParams.get('statut')
  const status = getStatus(statusParam) ? statusParam : 'all' // valeur inconnue dans l'URL -> « Toutes »
  const search = searchParams.get('q') ?? ''

  function updateFilter(name, value) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value && value !== 'all') next.set(name, value)
        else next.delete(name)
        return next
      },
      { replace: true }, // pas une entrée d'historique par lettre tapée
    )
  }

  // État dérivé : calculé à chaque rendu à partir de la liste et des filtres, jamais stocké.
  const visibleApplications = filterApplications(applications, { status, search })
  const hasFilters = status !== 'all' || search !== ''

  async function handleSubmit(values) {
    if (isNew) {
      await addApplication(values)
    } else {
      await editApplication(editing.id, values)
    }
    setEditing(null) // n'est atteint que si l'enregistrement a réussi
  }

  async function handleDelete() {
    await removeApplication(editing.id)
    setEditing(null)
  }

  return (
    <section>
      <title>Mes candidatures · Alternance Tracker</title>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Mes candidatures</h1>
          {!loading && !error && (
            <p className="mt-1 text-stone-500">
              {hasFilters
                ? `${visibleApplications.length} sur ${applications.length}`
                : `${applications.length} candidature${applications.length > 1 ? 's' : ''}`}
            </p>
          )}
        </div>
        <Button onClick={() => setEditing('new')}>+ Nouvelle candidature</Button>
      </div>

      {!loading && !error && applications.length > 0 && (
        <Filters
          status={status}
          search={search}
          counts={countByStatus(applications)}
          total={applications.length}
          onStatusChange={(value) => updateFilter('statut', value)}
          onSearchChange={(value) => updateFilter('q', value)}
        />
      )}

      {/* Un seul de ces états est affiché à la fois */}
      {loading ? (
        <ApplicationListSkeleton />
      ) : error ? (
        <div className="space-y-3">
          <Alert>{error}</Alert>
          <Button variant="secondary" onClick={reload}>
            Réessayer
          </Button>
        </div>
      ) : applications.length === 0 ? (
        <EmptyState icon="📭" title="Aucune candidature pour l’instant">
          Cliquez sur « Nouvelle candidature » pour commencer le suivi.
        </EmptyState>
      ) : visibleApplications.length === 0 ? (
        <EmptyState icon="🔍" title="Aucun résultat">
          <p>Aucune candidature ne correspond à ces filtres.</p>
          <Button variant="secondary" className="mt-4" onClick={() => setSearchParams({}, { replace: true })}>
            Effacer les filtres
          </Button>
        </EmptyState>
      ) : (
        <ApplicationList applications={visibleApplications} onEdit={setEditing} />
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={isNew ? 'Nouvelle candidature' : 'Modifier la candidature'}
      >
        <ApplicationForm
          application={isNew ? null : editing}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onCancel={() => setEditing(null)}
        />
      </Modal>
    </section>
  )
}
