import { useDroppable } from '@dnd-kit/core'
import KanbanCard from './KanbanCard'

// Une colonne = une zone où l'on peut déposer une carte. Son id est la valeur du statut.
export default function KanbanColumn({ status, applications }) {
  const { setNodeRef, isOver } = useDroppable({ id: status.value })

  return (
    <section
      ref={setNodeRef}
      aria-label={`Colonne ${status.label}`}
      className={`flex w-full flex-col rounded-2xl p-3 transition md:w-72 md:shrink-0 md:snap-start xl:w-auto ${
        isOver ? 'bg-brand-50 ring-2 ring-brand-300' : 'bg-stone-100/80'
      }`}
    >
      <h2 className="mb-3 flex items-center gap-2 px-1 text-sm font-bold text-stone-700">
        <span className={`size-2 rounded-full ${status.dot}`} aria-hidden="true" />
        {status.label}
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-stone-500">
          {applications.length}
        </span>
      </h2>

      <div className="flex flex-1 flex-col gap-2 md:min-h-28">
        {applications.map((application) => (
          <KanbanCard key={application.id} application={application} />
        ))}
        {applications.length === 0 && (
          <p className="rounded-xl border-2 border-dashed border-stone-200 px-3 py-4 text-center text-xs text-stone-400 md:py-6">
            Déposez une carte ici
          </p>
        )}
      </div>
    </section>
  )
}
