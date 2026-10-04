// Supabase renvoie des erreurs en anglais avec un code technique.
// On les traduit en messages compréhensibles pour l'utilisateur.
const MESSAGES = {
  invalid_credentials: 'Email ou mot de passe incorrect.',
  user_already_exists: 'Un compte existe déjà avec cet email.',
  email_exists: 'Un compte existe déjà avec cet email.',
  weak_password: 'Mot de passe trop faible : 6 caractères minimum.',
  email_not_confirmed: 'Confirmez votre email avant de vous connecter.',
  over_email_send_rate_limit: 'Trop de tentatives. Réessayez dans quelques minutes.',
  over_request_rate_limit: 'Trop de tentatives. Réessayez dans quelques minutes.',
}

export function getAuthErrorMessage(error) {
  if (!error) return null
  return MESSAGES[error.code] ?? 'Une erreur est survenue. Réessayez.'
}
