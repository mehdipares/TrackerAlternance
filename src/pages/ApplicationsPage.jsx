import ApplicationList from '../components/applications/ApplicationList'
import ApplicationListSkeleton from '../components/applications/ApplicationListSkeleton'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useApplications } from '../hooks/useApplications'

export default function ApplicationsPage() {
  const { applications, loading, error, reload } = useApplications()

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Mes candidatures</h1>
        {!loading && !error && (
          <p className="mt-1 text-stone-500">
            {applications.length} candidature{applications.length > 1 ? 's' : ''}
          </p>
        )}
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
          Ajoutez votre première candidature pour commencer le suivi.
        </EmptyState>
      ) : (
        <ApplicationList applications={applications} />
      )}
    </section>
  )
}
