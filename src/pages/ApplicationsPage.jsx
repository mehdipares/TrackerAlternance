import { useState } from 'react'
import ApplicationForm from '../components/applications/ApplicationForm'
import ApplicationList from '../components/applications/ApplicationList'
import ApplicationListSkeleton from '../components/applications/ApplicationListSkeleton'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import { useApplications } from '../hooks/useApplications'

export default function ApplicationsPage() {
  const { applications, loading, error, reload, addApplication, editApplication } = useApplications()

  // null = fenêtre fermée ; 'new' = ajout ; un objet candidature = modification de celle-ci.
  const [editing, setEditing] = useState(null)
  const isNew = editing === 'new'

  async function handleSubmit(values) {
    if (isNew) {
      await addApplication(values)
    } else {
      await editApplication(editing.id, values)
    }
    setEditing(null) // n'est atteint que si l'enregistrement a réussi
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Mes candidatures</h1>
          {!loading && !error && (
            <p className="mt-1 text-stone-500">
              {applications.length} candidature{applications.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
        <Button onClick={() => setEditing('new')}>+ Nouvelle candidature</Button>
      </div>

      {/* Un seul de ces quatre états est affiché à la fois */}
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
      ) : (
        <ApplicationList applications={applications} onEdit={setEditing} />
      )}

      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={isNew ? 'Nouvelle candidature' : 'Modifier la candidature'}
      >
        <ApplicationForm
          application={isNew ? null : editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      </Modal>
    </section>
  )
}
