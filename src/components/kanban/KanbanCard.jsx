import { useDraggable } from '@dnd-kit/core'
import { formatDate, needsFollowUp } from '../../utils/dates'

// Apparence d'une carte : utilisée dans la colonne et pour la copie qui suit le curseur pendant le glissement.
export function KanbanCardContent({ application, dragging = false }) {
  const { company, position, sent_at } = application

  return (
    <div
      className={`relative rounded-xl bg-white p-3 ring-1 ring-stone-200/70 ${
        dragging ? 'rotate-2 shadow-xl ring-brand-300' : 'shadow-sm'
      }`}
    >
      {/* pr-9 : laisse la place à la poignée, en haut à droite */}
      <p className="truncate pr-9 text-sm font-bold text-stone-900">{company}</p>
      <p className="truncate pr-9 text-xs text-stone-500">{position}</p>
      {needsFollowUp(application) && (
        <p className="mt-2 inline-block rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
          ⏰ À relancer
        </p>
      )}
      {sent_at && <p className="mt-2 text-xs text-stone-400">Envoyée le {formatDate(sent_at)}</p>}

      {/* Poignée de déplacement (6 points) */}
      <span
        className="absolute top-1 right-1 grid size-11 cursor-grab touch-none place-items-center rounded-lg text-stone-400"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <circle cx="9" cy="6" r="1.6" />
          <circle cx="15" cy="6" r="1.6" />
          <circle cx="9" cy="12" r="1.6" />
          <circle cx="15" cy="12" r="1.6" />
          <circle cx="9" cy="18" r="1.6" />
          <circle cx="15" cy="18" r="1.6" />
        </svg>
      </span>
    </div>
  )
}

// Carte déplaçable. useDraggable fournit :
// - setNodeRef : l'élément HTML à déplacer,
// - listeners : les événements (pointeur, clavier) qui démarrent le glissement,
// - attributes : les attributs d'accessibilité (role, tabIndex, aria-*).
//
// Sur téléphone : la poignée a touch-action: none, donc le navigateur ne fait jamais défiler la page
// depuis cette zone et le glissement démarre tout de suite. Toucher le reste de la carte fait défiler
// normalement (le navigateur annule alors le glissement).
// select-none et touch-callout: none évitent la sélection de texte et le menu « copier » d'un appui long.
export default function KanbanCard({ application }) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: application.id,
    data: { application },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      aria-label={`${application.company}, ${application.position}`}
      // L'original reste en place, estompé, pendant que sa copie suit le curseur.
      className={`cursor-grab rounded-xl select-none [-webkit-touch-callout:none] active:cursor-grabbing ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <KanbanCardContent application={application} />
    </div>
  )
}
