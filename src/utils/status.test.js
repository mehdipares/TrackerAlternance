import { describe, expect, it } from 'vitest'
import { DEFAULT_STATUS, STATUSES, buildStatusUpdate, getStatus } from './status'

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

describe('buildStatusUpdate', () => {
  const today = new Date(2026, 9, 10) // 10 octobre 2026

  it('remplit la date du jour quand on passe à « Envoyée » sans date', () => {
    expect(buildStatusUpdate({ sent_at: null }, 'sent', today)).toEqual({ status: 'sent', sent_at: '2026-10-10' })
  })

  it('fonctionne aussi avec une date vide venant du formulaire', () => {
    expect(buildStatusUpdate({ sent_at: '' }, 'sent', today)).toEqual({ status: 'sent', sent_at: '2026-10-10' })
  })

  it('garde la date existante', () => {
    expect(buildStatusUpdate({ sent_at: '2026-09-01' }, 'sent', today)).toEqual({ status: 'sent' })
  })

  it('ne touche pas à la date pour les autres statuts', () => {
    expect(buildStatusUpdate({ sent_at: null }, 'interview', today)).toEqual({ status: 'interview' })
  })
})
