import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary'
import { TextInput, TextInputProps } from '../../components/TextInput/TextInput'
import { useAuthContext } from '../../context/auth'
import { registerUser } from '../../firebase'
import './SignupPage.css'

const SignupPage = () => {
  const [, dispatch] = useAuthContext()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    file: null,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0]
      const fileSizeInKb = file.size / 1024
      if (fileSizeInKb <= 500) {
        setFormValues({
          ...formValues,
          [e.target.name]: e.currentTarget.files![0],
        })
      } else {
        setError(
          'The uploaded file is too big. The maximum size of the image is 500Kb.'
        )
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (formValues.file) {
        const user = await registerUser(
          formValues.username,
          formValues.email,
          formValues.password,
          formValues.file
        )
        dispatch({ type: 'LOGIN', payload: user })
        setIsLoading(false)
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError('An error occured. Please try again later.')
      }
      setIsLoading(false)
    }
  }

  const textInputProps: TextInputProps[] = [
    {
      type: 'text',
      id: 'username',
      name: 'username',
      label: 'Username',
      placeholder: 'Enter your username',
      required: true,
      pattern: '^[a-zA-Z0-9]{3,30}$',
      autoComplete: 'username',
      onChange: onChange,
    },
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
        'Password should minimum eight characters, at least one letter, one number and one special character:',
      onChange: onChange,
    },
  ]

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <h2 className="signup-title">Sign up</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="signup-form" onSubmit={handleSubmit}>
          {textInputProps.map((props) => (
            <TextInput key={props.id} {...props} />
          ))}

          <input
            id="file-upload"
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={(e) => onFileUpload(e)}
          />
          <label className="file-input-container" htmlFor="file-upload">
            <svg
              className="file-input-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              {/* <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
              <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
            </svg>
            <span className="file-upload-text">Upload profile picture</span>
          </label>
          <ButtonPrimary text="Sign up" type="submit" isLoading={isLoading} />
          <p className="auth-redirect">
            Already have an account? <Link to="/login">Log In.</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
