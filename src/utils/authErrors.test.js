import { describe, expect, it } from 'vitest'
import { getAuthErrorMessage } from './authErrors'

describe('getAuthErrorMessage', () => {
  it('traduit une erreur connue', () => {
    expect(getAuthErrorMessage({ code: 'invalid_credentials' })).toBe('Email ou mot de passe incorrect.')
  })

  it('renvoie un message générique pour une erreur inconnue', () => {
    expect(getAuthErrorMessage({ code: 'autre_chose' })).toBe('Une erreur est survenue. Réessayez.')
  })

  it('renvoie null sans erreur', () => {
    expect(getAuthErrorMessage(null)).toBeNull()
  })
})
