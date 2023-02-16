import { useState } from 'react'
import { TextInput, TextInputProps } from '../../components/TextInput/TextInput'
import { useAuthContext } from '../../context/auth'
import { loginUser } from '../../firebase'
import './LoginPage.css'

const LoginPage = () => {
  const [, dispatch] = useAuthContext()
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await loginUser(formValues.email, formValues.password)
      dispatch({ type: 'LOGIN', payload: user })
    } catch (e) {
      console.log(e)
    }
  }

  const textInputProps: TextInputProps[] = [
    {
      id: 'email',
      name: 'email',
      label: 'E-mail',
      required: true,
      pattern:
        '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
      errorMessage: 'Please give a valid e-mail.',
      onChange: onChange,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      required: true,
      pattern: '(?=^.{8,}$)(?=.*[a-zA-Z])(?=.*[\\W_])(?=^.*[^\\s].*$).*$',
      errorMessage:
        'Minimum eight characters, at least one letter, one number and one special character:',
      onChange: onChange,
    },
  ]

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        {textInputProps.map((props) => (
          <TextInput key={props.id} {...props} />
        ))}
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
