import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const fieldClass =
  'w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primarysoft'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('budi_kandang')
  const [password, setPassword] = useState('telur123')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(username, password)
      const redirectTo = location.state?.from?.pathname ?? '/seller'
      navigate(redirectTo, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-xl2 border border-line bg-surface p-8 shadow-soft">
        <h1 className="text-2xl font-extrabold">Masuk ke akun</h1>
        <p className="mt-2 text-sm text-inksoft">
          Akun dicocokkan dengan sheet <code>users</code> di file Excel. Kredensial demo seller sudah
          terisi; akun seller lain: <code>siti_farm</code>, <code>agus_puyuh</code>,{' '}
          <code>dewi_organik</code> (password <code>telur123</code>).
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className={fieldClass}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={fieldClass}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Memproses…' : 'Masuk'}
          </Button>
        </form>
      </div>
    </Container>
  )
}
