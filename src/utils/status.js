// Source unique des statuts : l'ordre du tableau sert partout
// (liste déroulante, tableau de bord, colonnes du kanban).
// `value` correspond à la valeur stockée en base (voir le check dans supabase/schema.sql).
// Les classes Tailwind sont écrites en entier : Tailwind ne détecte pas les classes construites dynamiquement.
export const STATUSES = [
  { value: 'to_send', label: 'À envoyer', badge: 'bg-stone-100 text-stone-700', dot: 'bg-stone-400' },
  { value: 'sent', label: 'Envoyée', badge: 'bg-sky-100 text-sky-800', dot: 'bg-sky-500' },
  { value: 'followed_up', label: 'Relancée', badge: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  { value: 'interview', label: 'Entretien', badge: 'bg-violet-100 text-violet-800', dot: 'bg-violet-500' },
  { value: 'rejected', label: 'Refusée', badge: 'bg-rose-100 text-rose-800', dot: 'bg-rose-500' },
  { value: 'accepted', label: 'Acceptée', badge: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
]

export const DEFAULT_STATUS = 'to_send'

export function getStatus(value) {
  return STATUSES.find((status) => status.value === value) ?? null
}
