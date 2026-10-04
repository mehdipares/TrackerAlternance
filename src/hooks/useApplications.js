import { useCallback, useEffect, useState } from 'react'
import {
  createApplication,
  deleteApplication,
  fetchApplications,
  updateApplication,
} from '../api/applications'

// Gère l'état des candidatures : la liste, le chargement et l'erreur, ainsi que les actions.
// Les pages n'ont plus qu'à afficher ce que le hook leur donne.
export function useApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useCallback garde la même fonction entre deux rendus,
  // pour pouvoir la mettre dans les dépendances du useEffect sans boucle infinie.
  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setApplications(await fetchApplications())
    } catch {
      setError('Impossible de charger vos candidatures. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Chargement initial, au premier affichage du composant.
  useEffect(() => {
    load()
  }, [load])

  // Les actions attendent la réponse de la base, puis mettent à jour la liste locale
  // avec la ligne renvoyée : pas besoin de tout recharger.
  // En cas d'erreur, elles la laissent remonter au formulaire qui l'affiche.
  async function addApplication(values) {
    const created = await createApplication(values)
    setApplications((current) => [created, ...current])
  }

  async function editApplication(id, values) {
    const updated = await updateApplication(id, values)
    setApplications((current) =>
      current.map((application) => (application.id === id ? updated : application)),
    )
  }

  async function removeApplication(id) {
    await deleteApplication(id)
    setApplications((current) => current.filter((application) => application.id !== id))
  }

  return {
    applications,
    loading,
    error,
    reload: load,
    addApplication,
    editApplication,
    removeApplication,
  }
}
