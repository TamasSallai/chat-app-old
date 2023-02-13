import { useState } from 'react'
import { useAuthContext } from '../../context/auth'
import { registerUser } from '../../firebase'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<string | null>(null)

  const [, dispatch] = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (file) {
        const user = await registerUser(username, email, password, file)
        dispatch({ type: 'LOGIN', payload: user })
      }
    } catch (e) {
      if (e instanceof Error) setError(e.message)
    }
  }

  const handleFileChange = (file: File) => {
    const fileSizeInKb = file.size / 1024
    if (fileSizeInKb <= 500) {
      setFile(file)
    } else {
      setError(
        'The uploaded file is too big. The maximum size of the image is 500Kb.'
      )
    }
  }

  return (
    <div className="register-page">
      {error && <div>{error}</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div>
          <label>Photo</label>
          <input
            type="file"
            required
            onChange={(e) => handleFileChange(e.currentTarget.files![0])}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default RegisterPage
