import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary'
import { TextInput, TextInputProps } from '../../components/TextInput/TextInput'
import { useAuthContext } from '../../context/auth'
import { loginUser } from '../../firebase'
import './LoginPage.css'

const LoginPage = () => {
  const [, dispatch] = useAuthContext()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const user = await loginUser(formValues.email, formValues.password)
      dispatch({ type: 'LOGIN', payload: user })
      setIsLoading(false)
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/user-not-found') {
          setError('Invalid username or password.')
        } else {
          setError('An error occured. Please try again later.')
        }
      }
      setIsLoading(false)
    }
  }

  const textInputProps: TextInputProps[] = [
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'Enter your email.',
      required: true,
      pattern:
        '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
      autoComplete: 'email',
      onChange: onChange,
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
      pattern: '(?=^.{8,}$)(?=.*[a-zA-Z])(?=.*[\\W_])(?=^.*[^\\s].*$).*$',
      autoComplete: 'current-password',
      infoMessage:
        'Minimum eight characters, at least one letter, one number and one special character:',
      onChange: onChange,
    },
  ]

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          {textInputProps.map((props) => (
            <TextInput key={props.id} {...props} />
          ))}
          <ButtonPrimary text="Login" type="submit" isLoading={isLoading} />
          <p className="auth-redirect">
            Don't have an account? <Link to="/signup">Sign up.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
