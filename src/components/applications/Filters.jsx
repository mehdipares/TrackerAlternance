import { STATUSES } from '../../utils/status'
import { FIELD_CLASS } from '../ui/fieldStyles'

// Composant d'affichage uniquement : il reçoit les valeurs des filtres et prévient le parent quand elles changent.
export default function Filters({ status, search, counts, total, onStatusChange, onSearchChange }) {
  const options = [{ value: 'all', label: 'Toutes', count: total }].concat(
    STATUSES.map((item) => ({ value: item.value, label: item.label, count: counts[item.value] })),
  )

  return (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Rechercher une entreprise
        </label>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="search"
          type="search"
          placeholder="Rechercher une entreprise…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className={`${FIELD_CLASS} pl-10`}
        />
      </div>

      {/* Sur mobile, les filtres défilent horizontalement au lieu de passer sur plusieurs lignes */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrer par statut">
        {options.map((option) => {
          const active = option.value === status
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onStatusChange(option.value)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                active
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                  : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50'
              }`}
            >
              {option.label}
              <span className={`ml-1.5 ${active ? 'text-brand-100' : 'text-stone-400'}`}>{option.count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
