import { useState } from 'react'
import { useAuthContext } from '../context/auth'
import { loginUser } from '../firebase'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [, dispatch] = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await loginUser(email, password)
      dispatch({ type: 'LOGIN', payload: user })
    } catch (e) {
      if (e instanceof Error) setError(e.message)
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
