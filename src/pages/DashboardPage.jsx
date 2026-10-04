import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton'
import FollowUpList from '../components/dashboard/FollowUpList'
import StatsGrid from '../components/dashboard/StatsGrid'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useApplications } from '../hooks/useApplications'
import { countByStatus, getApplicationsToFollowUp } from '../utils/filters'

export default function DashboardPage() {
  const { applications, loading, error, reload, editApplication } = useApplications()
  const [updatingId, setUpdatingId] = useState(null)
  const [actionError, setActionError] = useState(null)

  // Données dérivées, recalculées à chaque rendu.
  const counts = countByStatus(applications)
  const toFollowUp = getApplicationsToFollowUp(applications)

  async function handleMarkFollowedUp(application) {
    setUpdatingId(application.id)
    setActionError(null)
    try {
      // Mise à jour partielle : seul le statut change.
      // La candidature quitte alors la liste des relances, puisqu'elle n'est plus « Envoyée ».
      await editApplication(application.id, { status: 'followed_up' })
    } catch {
      setActionError(`Impossible de mettre à jour ${application.company}. Réessayez.`)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">Tableau de bord</h1>
        {!loading && !error && applications.length > 0 && (
          <p className="mt-1 text-stone-500">
            {applications.length} candidature{applications.length > 1 ? 's' : ''} au total
            {toFollowUp.length > 0 && (
              <>
                {' · '}
                <span className="font-semibold text-amber-700">{toFollowUp.length} à relancer</span>
              </>
            )}
          </p>
        )}
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <div className="space-y-3">
          <Alert>{error}</Alert>
          <Button variant="secondary" onClick={reload}>
            Réessayer
          </Button>
        </div>
      ) : applications.length === 0 ? (
        <EmptyState icon="🚀" title="Bienvenue !">
          <p>Ajoutez votre première candidature pour voir vos statistiques ici.</p>
          <Link
            to="/candidatures"
            className="mt-4 inline-block rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Ajouter une candidature
          </Link>
        </EmptyState>
      ) : (
        <div className="space-y-10">
          <div>
            <h2 className="mb-3 text-lg font-bold text-stone-900">Par statut</h2>
            <StatsGrid counts={counts} total={applications.length} />
          </div>

          <div>
            <h2 className="mb-1 text-lg font-bold text-stone-900">À relancer</h2>
            <p className="mb-3 text-sm text-stone-500">Envoyées depuis 7 jours ou plus, sans réponse.</p>
            {actionError && (
              <div className="mb-3">
                <Alert>{actionError}</Alert>
              </div>
            )}
            <FollowUpList
              applications={toFollowUp}
              updatingId={updatingId}
              onMarkFollowedUp={handleMarkFollowedUp}
            />
          </div>
        </div>
      )}
    </section>
  )
}
