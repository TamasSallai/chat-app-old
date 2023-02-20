import { useState } from 'react'
import './HamburgerButton.css'

interface HamburgerButtonProps {
  onClick: () => void
}

const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
    onClick()
    console.log('Hello')
  }

  return (
    <button
      className={isOpen ? 'hamburger open' : 'hamburger'}
      onClick={handleClick}
    >
      <span className="hamburger-bar"></span>
      <span className="hamburger-bar"></span>
      <span className="hamburger-bar"></span>
    </button>
  )
}

export default HamburgerButton
