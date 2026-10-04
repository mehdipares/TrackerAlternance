import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Les utilitaires testés sont des fonctions pures : pas besoin de simuler un navigateur.
    environment: 'node',
  },
})
