import { DEFAULT_STATUS } from './status'

// Les champs d'un formulaire React contiennent toujours des chaînes ('' si vide),
// alors que la base attend null pour une valeur absente. Ces deux fonctions font la conversion.

export const EMPTY_FORM = {
  company: '',
  position: '',
  job_url: '',
  sent_at: '',
  status: DEFAULT_STATUS,
  notes: '',
}

// Ligne de la base -> valeurs du formulaire (null devient '').
export function toFormValues(application) {
  if (!application) return EMPTY_FORM
  return {
    company: application.company,
    position: application.position,
    job_url: application.job_url ?? '',
    sent_at: application.sent_at ?? '',
    status: application.status,
    notes: application.notes ?? '',
  }
}

// Valeurs du formulaire -> données à envoyer à la base (espaces retirés, '' devient null).
// On ne renvoie que les colonnes modifiables : id, user_id et les dates techniques sont gérés par la base.
export function toApplicationPayload(values) {
  const emptyToNull = (text) => (text.trim() === '' ? null : text.trim())

  return {
    company: values.company.trim(),
    position: values.position.trim(),
    job_url: emptyToNull(values.job_url),
    sent_at: values.sent_at || null,
    status: values.status,
    notes: emptyToNull(values.notes),
  }
}
