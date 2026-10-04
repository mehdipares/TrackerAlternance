import { STATUSES } from './status'

// Met en minuscules et retire les accents : "Société" et "societe" doivent correspondre.
export function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

// status : 'all' ou une valeur de statut. search : texte recherché dans le nom de l'entreprise.
export function filterApplications(applications, { status = 'all', search = '' } = {}) {
  const query = normalize(search)

  return applications.filter((application) => {
    const matchesStatus = status === 'all' || application.status === status
    const matchesSearch = query === '' || normalize(application.company).includes(query)
    return matchesStatus && matchesSearch
  })
}

// Renvoie { to_send: 2, sent: 5, ... } avec tous les statuts, même à 0.
export function countByStatus(applications) {
  const counts = {}
  for (const status of STATUSES) {
    counts[status.value] = 0
  }
  for (const application of applications) {
    if (application.status in counts) counts[application.status] += 1
  }
  return counts
}
