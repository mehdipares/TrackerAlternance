import { describe, expect, it } from 'vitest'
import { countByStatus, filterApplications, normalize } from './filters'

const applications = [
  { id: 1, company: 'Société Générale', status: 'sent' },
  { id: 2, company: 'Decathlon', status: 'interview' },
  { id: 3, company: 'Doctolib', status: 'sent' },
]

describe('normalize', () => {
  it('retire les accents, les majuscules et les espaces autour', () => {
    expect(normalize('  Société  ')).toBe('societe')
  })
})

describe('filterApplications', () => {
  it('renvoie tout sans filtre', () => {
    expect(filterApplications(applications)).toHaveLength(3)
  })

  it('filtre par statut', () => {
    const result = filterApplications(applications, { status: 'sent' })
    expect(result.map((application) => application.id)).toEqual([1, 3])
  })

  it('recherche dans le nom de l’entreprise sans tenir compte des accents ni de la casse', () => {
    const result = filterApplications(applications, { search: 'societe' })
    expect(result.map((application) => application.id)).toEqual([1])
  })

  it('combine le statut et la recherche', () => {
    const result = filterApplications(applications, { status: 'sent', search: 'doc' })
    expect(result.map((application) => application.id)).toEqual([3])
  })

  it('ne modifie pas le tableau d’origine', () => {
    filterApplications(applications, { status: 'sent' })
    expect(applications).toHaveLength(3)
  })
})

describe('countByStatus', () => {
  it('compte les candidatures par statut, avec 0 pour les statuts absents', () => {
    expect(countByStatus(applications)).toEqual({
      to_send: 0,
      sent: 2,
      followed_up: 0,
      interview: 1,
      rejected: 0,
      accepted: 0,
    })
  })

  it('fonctionne avec une liste vide', () => {
    expect(countByStatus([]).sent).toBe(0)
  })
})
