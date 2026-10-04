import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'
import { STATUSES, getStatus } from '../../utils/status'
import { KanbanCardContent } from './KanbanCard'
import KanbanColumn from './KanbanColumn'

// Textes lus par les lecteurs d'écran pendant un glisser-déposer (dnd-kit les fournit en anglais par défaut).
const companyOf = (active) => active.data.current.application.company
const accessibility = {
  screenReaderInstructions: {
    draggable:
      'Pour déplacer une candidature : appuyez sur Espace, utilisez les flèches pour la déplacer, puis Espace pour la déposer ou Échap pour annuler.',
  },
  announcements: {
    onDragStart: ({ active }) => `Candidature ${companyOf(active)} saisie.`,
    onDragOver: ({ active, over }) =>
      over ? `${companyOf(active)} au-dessus de la colonne ${getStatus(over.id).label}.` : `${companyOf(active)} hors des colonnes.`,
    onDragEnd: ({ active, over }) =>
      over ? `${companyOf(active)} déposée dans la colonne ${getStatus(over.id).label}.` : `${companyOf(active)} remise à sa place.`,
    onDragCancel: ({ active }) => `Déplacement de ${companyOf(active)} annulé.`,
  },
}

export default function KanbanBoard({ applications, onMove }) {
  // La candidature en cours de déplacement (pour afficher sa copie sous le curseur).
  const [activeApplication, setActiveApplication] = useState(null)

  // Les « capteurs » décident quand un glissement commence :
  // - pointeur (souris et doigt) : après 5 px de mouvement, un simple clic ne déclenche rien.
  //   Au doigt, seule la poignée permet de glisser (voir KanbanCard) ;
  // - clavier : Espace pour saisir, flèches pour déplacer.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  )

  function handleDragStart({ active }) {
    setActiveApplication(active.data.current.application)
  }

  function handleDragEnd({ active, over }) {
    setActiveApplication(null)
    const application = active.data.current.application
    // over : la colonne sous la carte au moment du dépôt (null si en dehors).
    if (over && over.id !== application.status) {
      onMove(application, over.id)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      accessibility={accessibility}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveApplication(null)}
    >
      {/* Mise en page selon la largeur d'écran :
          - téléphone : colonnes empilées verticalement, chacune sur toute la largeur (rien ne sort de l'écran) ;
          - tablette (md) : colonnes côte à côte avec défilement horizontal ;
          - grand écran (xl) : les 6 colonnes tiennent côte à côte.
          overscroll-x-contain : le défilement horizontal ne déclenche pas le geste « page précédente ». */}
      <div className="flex flex-col gap-3 md:snap-x md:flex-row md:overflow-x-auto md:overscroll-x-contain md:pb-4 xl:grid xl:grid-cols-6 xl:overflow-visible">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status.value}
            status={status}
            applications={applications.filter((application) => application.status === status.value)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeApplication && <KanbanCardContent application={activeApplication} dragging />}
      </DragOverlay>
    </DndContext>
  )
}
