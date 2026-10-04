import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Les bibliothèques sont placées dans des fichiers séparés de notre code.
        // Elles changent rarement : le navigateur les garde en cache d'un déploiement à l'autre,
        // et seul notre code (petit) est retéléchargé après une mise à jour.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: 'supabase', test: /node_modules[\\/]@supabase[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    // Les utilitaires testés sont des fonctions pures : pas besoin de simuler un navigateur.
    environment: 'node',
  },
})
