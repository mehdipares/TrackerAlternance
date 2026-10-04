import { describe, expect, it } from 'vitest'
import { EMPTY_FORM, toApplicationPayload, toFormValues } from './applicationForm'

describe('toFormValues', () => {
  it('renvoie un formulaire vide pour une nouvelle candidature', () => {
    expect(toFormValues(null)).toEqual(EMPTY_FORM)
  })

  it('remplace les valeurs null de la base par des chaînes vides', () => {
    const values = toFormValues({
      id: 'abc',
      company: 'Doctolib',
      position: 'Développeur React',
      job_url: null,
      sent_at: null,
      status: 'to_send',
      notes: null,
    })
    expect(values).toEqual({
      company: 'Doctolib',
      position: 'Développeur React',
      job_url: '',
      sent_at: '',
      status: 'to_send',
      notes: '',
    })
  })
})

describe('toApplicationPayload', () => {
  it('retire les espaces et transforme les champs vides en null', () => {
    const payload = toApplicationPayload({
      company: '  Doctolib ',
      position: 'Développeur React',
      job_url: '   ',
      sent_at: '',
      status: 'sent',
      notes: '',
    })
    expect(payload).toEqual({
      company: 'Doctolib',
      position: 'Développeur React',
      job_url: null,
      sent_at: null,
      status: 'sent',
      notes: null,
    })
  })

  it('n’envoie pas les colonnes gérées par la base (id, user_id, dates techniques)', () => {
    const payload = toApplicationPayload({ ...EMPTY_FORM, company: 'A', position: 'B', id: 'abc', user_id: 'xyz' })
    expect(Object.keys(payload)).toEqual(['company', 'position', 'job_url', 'sent_at', 'status', 'notes'])
  })
})
