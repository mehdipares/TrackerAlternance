import { useState } from 'react'
import { toApplicationPayload, toFormValues } from '../../utils/applicationForm'
import { STATUSES, buildStatusUpdate } from '../../utils/status'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'

// Formulaire partagé entre l'ajout (application = null) et la modification.
// Il ne connaît pas Supabase : il appelle onSubmit(données) / onDelete() et laisse le parent agir.
export default function ApplicationForm({ application, onSubmit, onDelete, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(application))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  // Suppression en deux temps : un premier clic demande confirmation.
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Un seul gestionnaire pour tous les champs, grâce à l'attribut name.
  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => {
      // Changement de statut : même règle que le kanban (date du jour si « Envoyée » sans date).
      if (name === 'status') return { ...current, ...buildStatusUpdate(current, value) }
      return { ...current, [name]: value }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await onSubmit(toApplicationPayload(values))
    } catch {
      setError('L’enregistrement a échoué. Vérifiez votre connexion et réessayez.')
      setSaving(false)
    }
    // En cas de succès, le parent ferme la fenêtre : pas besoin de remettre saving à false.
  }

  async function handleDelete() {
    setDeleting(true)
    setError(null)
    try {
      await onDelete()
    } catch {
      setError('La suppression a échoué. Vérifiez votre connexion et réessayez.')
      setDeleting(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert>{error}</Alert>}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Entreprise *"
          id="company"
          name="company"
          autoFocus={!application} // en ajout, le curseur est placé directement dans ce champ
          required
          maxLength={100}
          value={values.company}
          onChange={handleChange}
        />
        <Input
          label="Poste *"
          id="position"
          name="position"
          required
          maxLength={100}
          value={values.position}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Statut"
          id="status"
          name="status"
          options={STATUSES}
          value={values.status}
          onChange={handleChange}
        />
        <Input
          label="Date d’envoi"
          id="sent_at"
          name="sent_at"
          type="date"
          value={values.sent_at}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Lien de l’offre"
        id="job_url"
        name="job_url"
        type="url"
        placeholder="https://…"
        value={values.job_url}
        onChange={handleChange}
      />

      <Textarea
        label="Notes"
        id="notes"
        name="notes"
        placeholder="Contact, étapes, points à préparer…"
        value={values.notes}
        onChange={handleChange}
      />

      {/* Sur mobile, les actions restent collées en bas de la fenêtre (sticky) :
          pas besoin de faire défiler tout le formulaire pour enregistrer.
          env(safe-area-inset-bottom) : marge pour la barre d'accueil des iPhone. */}
      <div className="sticky bottom-0 -mx-5 border-t border-stone-100 bg-white px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:border-0 sm:p-0 sm:pt-2">
        {confirmingDelete ? (
          <div className="rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-200" role="alert">
            <p className="text-sm font-semibold text-rose-800">
              Supprimer définitivement la candidature chez {application.company} ?
            </p>
            <p className="mt-0.5 text-sm text-rose-700">Cette action est irréversible.</p>
            <div className="mt-3 flex gap-2 sm:justify-end">
              <Button type="button" variant="secondary" className="flex-1 sm:flex-none" onClick={() => setConfirmingDelete(false)}>
                Non, garder
              </Button>
              <Button type="button" variant="danger" loading={deleting} className="flex-1 sm:flex-none" onClick={handleDelete}>
                Oui, supprimer
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Le bouton Supprimer n'existe qu'en modification */}
            {application && (
              <Button type="button" variant="danger-ghost" className="mr-auto" onClick={() => setConfirmingDelete(true)}>
                Supprimer
              </Button>
            )}
            <Button type="button" variant="secondary" className="sm:ml-auto" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" loading={saving} className="flex-1 sm:flex-none">
              {application ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
