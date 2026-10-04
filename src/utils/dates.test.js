import { describe, expect, it } from 'vitest'
import { daysSince, formatDate, needsFollowUp, todayIsoDate } from './dates'

// Date fixe : les tests donnent le même résultat quel que soit le jour où on les lance.
const TODAY = new Date(2026, 9, 10, 15, 30) // 10 octobre 2026, 15h30 (les mois commencent à 0)

describe('daysSince', () => {
  it('renvoie 0 pour aujourd’hui, quelle que soit l’heure', () => {
    expect(daysSince('2026-10-10', TODAY)).toBe(0)
  })

  it('compte les jours écoulés', () => {
    expect(daysSince('2026-10-03', TODAY)).toBe(7)
  })

  it('gère le passage d’un mois à l’autre', () => {
    expect(daysSince('2026-09-30', TODAY)).toBe(10)
  })

  it('n’est pas faussé par le passage à l’heure d’hiver (25 octobre)', () => {
    expect(daysSince('2026-10-20', new Date(2026, 9, 27))).toBe(7)
  })
})

describe('needsFollowUp', () => {
  it('est vrai pour une candidature envoyée il y a 7 jours', () => {
    expect(needsFollowUp({ status: 'sent', sent_at: '2026-10-03' }, TODAY)).toBe(true)
  })

  it('est faux pour une candidature envoyée il y a 6 jours', () => {
    expect(needsFollowUp({ status: 'sent', sent_at: '2026-10-04' }, TODAY)).toBe(false)
  })

  it('est faux si la candidature a déjà un autre statut', () => {
    expect(needsFollowUp({ status: 'interview', sent_at: '2026-09-01' }, TODAY)).toBe(false)
    expect(needsFollowUp({ status: 'followed_up', sent_at: '2026-09-01' }, TODAY)).toBe(false)
  })

  it('est faux sans date d’envoi', () => {
    expect(needsFollowUp({ status: 'sent', sent_at: null }, TODAY)).toBe(false)
  })
})

describe('formatDate', () => {
  it('formate une date en français', () => {
    expect(formatDate('2026-10-04')).toBe('4 oct. 2026')
  })

  it('renvoie une chaîne vide sans date', () => {
    expect(formatDate(null)).toBe('')
  })
})

describe('todayIsoDate', () => {
  it('renvoie la date au format YYYY-MM-DD', () => {
    expect(todayIsoDate(TODAY)).toBe('2026-10-10')
  })
})
