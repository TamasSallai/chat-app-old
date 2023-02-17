import './ButtonPrimary.css'

interface ButtonPrimaryProps {
  text: string
  type: 'button' | 'submit'
  isLoading: boolean
}

const ButtonPrimary = ({ text, type, isLoading }: ButtonPrimaryProps) => {
  return (
    <button className="btn-primary" type={type} disabled={isLoading}>
      {text}
    </button>
  )
}

export default ButtonPrimary
