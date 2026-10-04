import { Link } from 'react-router-dom'
import { STATUSES } from '../../utils/status'

// Une tuile par statut. Chaque tuile est un lien vers la liste déjà filtrée (?statut=...).
export default function StatsGrid({ counts, total }) {
  return (
    <div>
      {/* Barre de répartition : la largeur de chaque segment est proportionnelle à son nombre */}
      {total > 0 && (
        <div className="mb-4 flex h-2.5 overflow-hidden rounded-full bg-stone-100" aria-hidden="true">
          {STATUSES.map((status) => (
            <div
              key={status.value}
              className={status.dot}
              style={{ width: `${(counts[status.value] / total) * 100}%` }}
            />
          ))}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STATUSES.map((status) => (
          <li key={status.value}>
            <Link
              to={`/candidatures?statut=${status.value}`}
              className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-stone-500">
                <span className={`size-2 rounded-full ${status.dot}`} aria-hidden="true" />
                {status.label}
              </span>
              <span className="mt-2 block text-3xl font-extrabold tracking-tight text-stone-900">
                {counts[status.value]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
