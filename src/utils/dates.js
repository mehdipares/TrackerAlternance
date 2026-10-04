export const FOLLOW_UP_DELAY_DAYS = 7

const MS_PER_DAY = 24 * 60 * 60 * 1000

// Convertit une date en nombre de millisecondes à minuit UTC du même jour calendaire.
// On compare ainsi des jours entiers, sans être gêné par l'heure, le fuseau horaire
// ou le changement d'heure été / hiver.
function toUtcDay(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
}

// "2026-10-01" (format renvoyé par une colonne `date` PostgreSQL) -> millisecondes UTC
function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

// Nombre de jours écoulés depuis isoDate.
// `today` est un paramètre (par défaut : maintenant) pour pouvoir tester avec une date fixe.
export function daysSince(isoDate, today = new Date()) {
  return Math.floor((toUtcDay(today) - parseIsoDate(isoDate)) / MS_PER_DAY)
}

// Une candidature est à relancer si elle est « envoyée » (pas encore relancée ni traitée)
// depuis au moins FOLLOW_UP_DELAY_DAYS jours.
export function needsFollowUp(application, today = new Date()) {
  if (application.status !== 'sent' || !application.sent_at) return false
  return daysSince(application.sent_at, today) >= FOLLOW_UP_DELAY_DAYS
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

// "2026-10-04" -> "4 oct. 2026"
export function formatDate(isoDate) {
  if (!isoDate) return ''
  return dateFormatter.format(parseIsoDate(isoDate))
}

// Date du jour au format "YYYY-MM-DD", attendu par <input type="date">.
export function todayIsoDate(today = new Date()) {
  return new Date(toUtcDay(today)).toISOString().slice(0, 10)
}
