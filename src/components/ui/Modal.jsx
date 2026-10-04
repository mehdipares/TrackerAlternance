import { useEffect, useRef } from 'react'

// Utilise l'élément HTML natif <dialog> : le navigateur gère pour nous
// la touche Échap, le focus bloqué dans la fenêtre et le fond assombri.
export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)

  // Synchronise l'état React (open) avec le <dialog> du navigateur.
  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Un clic sur le fond (et pas sur le contenu) ferme la fenêtre.
  function handleClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby="modal-title"
      className="mx-auto mt-auto mb-0 max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-xl
        backdrop:bg-stone-900/40 backdrop:backdrop-blur-sm sm:my-auto sm:rounded-3xl"
    >
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-extrabold tracking-tight text-stone-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-stone-500 hover:bg-stone-100"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        {/* Le contenu n'est rendu que si la fenêtre est ouverte :
            le formulaire repart ainsi de zéro à chaque ouverture. */}
        {open && children}
      </div>
    </dialog>
  )
}
