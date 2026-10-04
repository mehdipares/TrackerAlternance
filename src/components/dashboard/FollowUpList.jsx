import { daysSince } from '../../utils/dates'
import Button from '../ui/Button'

// updatingId : id de la candidature en cours d'enregistrement (pour afficher le spinner sur la bonne ligne).
export default function FollowUpList({ applications, updatingId, onMarkFollowedUp }) {
  if (applications.length === 0) {
    return (
      <p className="rounded-2xl bg-emerald-50 px-4 py-5 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
        🎉 Aucune relance en attente. Vous êtes à jour !
      </p>
    )
  }

  return (
    <ul className="divide-y divide-stone-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-amber-200">
      {applications.map((application) => (
        <li key={application.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate font-bold text-stone-900">{application.company}</p>
            <p className="truncate text-sm text-stone-500">{application.position}</p>
            <p className="mt-0.5 text-sm font-semibold text-amber-700">
              Envoyée il y a {daysSince(application.sent_at)} jours
            </p>
          </div>
          <Button
            variant="secondary"
            className="shrink-0"
            loading={updatingId === application.id}
            onClick={() => onMarkFollowedUp(application)}
          >
            Marquer comme relancée
          </Button>
        </li>
      ))}
    </ul>
  )
}
