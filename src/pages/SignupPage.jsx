import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { getAuthErrorMessage } from '../utils/authErrors'

export default function SignupPage() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error } = await signUp(email, password)

    setLoading(false)
    if (error) {
      setError(getAuthErrorMessage(error))
      return
    }
    // Si la confirmation d'email est activée dans Supabase, aucune session n'est créée :
    // l'utilisateur doit d'abord cliquer sur le lien reçu par email.
    if (!data.session) setNeedsConfirmation(true)
  }

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Gratuit, et vos données ne sont visibles que par vous."
      footer={
        <>
          Déjà inscrit ?{' '}
          <Link to="/login" className="inline-block py-2 font-semibold text-brand-600 hover:text-brand-700">
            Se connecter
          </Link>
        </>
      }
    >
      {needsConfirmation ? (
        <Alert type="success">
          Compte créé ! Un email de confirmation a été envoyé à <strong>{email}</strong>.
          Cliquez sur le lien qu’il contient, puis connectez-vous.
        </Alert>
      ) : (
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
            autoComplete="new-password"
            minLength={6}
            required
            placeholder="6 caractères minimum"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" loading={loading} className="w-full">
            Créer mon compte
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
