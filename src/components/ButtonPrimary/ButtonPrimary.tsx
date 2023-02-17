import './ButtonPrimary.css'

interface ButtonPrimaryProps {
  text: string
  type: 'button' | 'submit'
  isLoading?: boolean
  onClick?: () => void
}

const ButtonPrimary = ({
  text,
  type,
  isLoading,
  onClick,
}: ButtonPrimaryProps) => {
  return (
    <button
      className="btn-primary"
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ButtonPrimary
