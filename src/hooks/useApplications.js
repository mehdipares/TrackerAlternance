import { useCallback, useEffect, useState } from 'react'
import { fetchApplications } from '../api/applications'

// Gère l'état des candidatures : la liste, le chargement et l'erreur.
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

  return { applications, loading, error, reload: load }
}
