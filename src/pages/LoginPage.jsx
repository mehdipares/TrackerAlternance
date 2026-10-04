import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { DEMO_EMAIL, DEMO_PASSWORD, isDemoEnabled } from '../lib/demo'
import { getAuthErrorMessage } from '../utils/authErrors'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  // 'form' ou 'demo' : indique quel bouton affiche le spinner.
  const [loadingButton, setLoadingButton] = useState(null)

  async function login(loginEmail, loginPassword, button) {
    setError(null)
    setLoadingButton(button)

    const { error } = await signIn(loginEmail, loginPassword)

    setLoadingButton(null)
    if (error) setError(getAuthErrorMessage(error))
    // En cas de succès, rien à faire : le Context reçoit la session
    // et PublicOnlyRoute redirige automatiquement vers l'app.
  }

  function handleSubmit(event) {
    event.preventDefault()
    login(email, password, 'form')
  }

  return (
    <AuthLayout
      title="Bon retour 👋"
      documentTitle="Connexion"
      subtitle="Connectez-vous pour suivre vos candidatures."
      footer={
        <>
          Pas encore de compte ?{' '}
          <Link to="/signup" className="inline-block py-2 font-semibold text-brand-600 hover:text-brand-700">
            Créer un compte
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert>{error}</Alert>}
        <Input
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Mot de passe"
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" loading={loadingButton === 'form'} className="w-full">
          Se connecter
        </Button>
      </form>

      {isDemoEnabled && (
        <div className="mt-6">
          <div className="flex items-center gap-3 text-xs font-medium text-stone-400">
            <span className="h-px flex-1 bg-stone-200" />
            ou
            <span className="h-px flex-1 bg-stone-200" />
          </div>
          <Button
            type="button"
            variant="secondary"
            loading={loadingButton === 'demo'}
            className="mt-6 w-full"
            onClick={() => login(DEMO_EMAIL, DEMO_PASSWORD, 'demo')}
          >
            Essayer avec le compte de démo
          </Button>
          <p className="mt-2 text-center text-xs text-stone-400">Données fictives, sans inscription.</p>
        </div>
      )}
    </AuthLayout>
  )
}
