import { describe, expect, it } from 'vitest'
import { DEFAULT_STATUS, STATUSES, getStatus } from './status'

describe('STATUSES', () => {
  it('contient les 6 statuts autorisés par la base, dans l’ordre du parcours', () => {
    expect(STATUSES.map((status) => status.value)).toEqual([
      'to_send',
      'sent',
      'followed_up',
      'interview',
      'rejected',
      'accepted',
    ])
  })

  it('a un statut par défaut qui existe', () => {
    expect(getStatus(DEFAULT_STATUS)).not.toBeNull()
  })
})

describe('getStatus', () => {
  it('renvoie le libellé français d’un statut', () => {
    expect(getStatus('followed_up').label).toBe('Relancée')
  })

  it('renvoie null pour un statut inconnu', () => {
    expect(getStatus('inconnu')).toBeNull()
  })
})
