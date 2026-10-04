import { useState } from 'react'
import { toApplicationPayload, toFormValues } from '../../utils/applicationForm'
import { todayIsoDate } from '../../utils/dates'
import { STATUSES } from '../../utils/status'
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
      const next = { ...current, [name]: value }
      // Passage à « Envoyée » sans date : on propose la date du jour.
      if (name === 'status' && value === 'sent' && !current.sent_at) {
        next.sent_at = todayIsoDate()
      }
      return next
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

      {confirmingDelete ? (
        <div className="rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-200" role="alert">
          <p className="text-sm font-semibold text-rose-800">
            Supprimer définitivement la candidature chez {application.company} ?
          </p>
          <p className="mt-0.5 text-sm text-rose-700">Cette action est irréversible.</p>
          <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setConfirmingDelete(false)}>
              Non, garder
            </Button>
            <Button type="button" variant="danger" loading={deleting} onClick={handleDelete}>
              Oui, supprimer
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center">
          {/* Le bouton Supprimer n'existe qu'en modification */}
          {application && (
            <Button
              type="button"
              variant="danger-ghost"
              className="sm:mr-auto"
              onClick={() => setConfirmingDelete(true)}
            >
              Supprimer
            </Button>
          )}
          <Button type="button" variant="secondary" className="sm:ml-auto" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" loading={saving}>
            {application ? 'Enregistrer' : 'Ajouter la candidature'}
          </Button>
        </div>
      )}
    </form>
  )
}
