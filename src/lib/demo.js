// Compte de démo partagé, pour que les recruteurs puissent tester sans s'inscrire.
// Ces identifiants sont publics (affichés dans le README) : le compte ne contient que des données fictives.
// Si les variables ne sont pas définies, le bouton de démo n'apparaît pas.
export const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL
export const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD

export const isDemoEnabled = Boolean(DEMO_EMAIL && DEMO_PASSWORD)

export function isDemoUser(user) {
  return isDemoEnabled && user?.email === DEMO_EMAIL
}
