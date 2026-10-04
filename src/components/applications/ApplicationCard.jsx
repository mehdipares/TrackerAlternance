import { formatDate, needsFollowUp } from '../../utils/dates'
import StatusBadge from './StatusBadge'

export default function ApplicationCard({ application, onEdit }) {
  const { company, position, job_url, sent_at, status, notes } = application
  const toFollowUp = needsFollowUp(application)

  return (
    <article
      className={`flex h-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 sm:p-5
        ${toFollowUp ? 'ring-2 ring-amber-300' : 'ring-stone-200/70'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-stone-900">{company}</h3>
          <p className="truncate text-sm text-stone-500">{position}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {toFollowUp && (
        <p className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
          ⏰ À relancer : envoyée il y a plus d’une semaine
        </p>
      )}

      {notes && <p className="line-clamp-2 text-sm text-stone-600">{notes}</p>}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-stone-100 pt-3 text-xs text-stone-500">
        <span>{sent_at ? `Envoyée le ${formatDate(sent_at)}` : 'Pas encore envoyée'}</span>
        <div className="flex items-center gap-1">
          {job_url && (
            // rel="noopener noreferrer" : la page ouverte ne peut pas accéder à notre onglet (sécurité).
            <a
              href={job_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2.5 font-semibold text-brand-600 hover:bg-brand-50 sm:px-2 sm:py-1.5"
            >
              Voir l’offre ↗
            </a>
          )}
          <button
            type="button"
            onClick={() => onEdit(application)}
            className="rounded-lg px-3 py-2.5 font-semibold text-stone-600 hover:bg-stone-100 sm:px-2 sm:py-1.5"
            aria-label={`Modifier la candidature ${company}`}
          >
            Modifier
          </button>
        </div>
      </div>
    </article>
  )
}
