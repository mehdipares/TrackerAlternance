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
// Il ne connaît pas Supabase : il appelle onSubmit(données) et laisse le parent enregistrer.
export default function ApplicationForm({ application, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(application))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert>{error}</Alert>}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Entreprise *"
          id="company"
          name="company"
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

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={saving}>
          {application ? 'Enregistrer' : 'Ajouter la candidature'}
        </Button>
      </div>
    </form>
  )
}
