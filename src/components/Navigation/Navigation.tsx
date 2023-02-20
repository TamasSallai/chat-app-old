import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../context/auth'
import HamburgerButton from './HamburgerButton/HamburgerButton'
import UserBadge from './UserBadge/UserBadge'
import './Navigation.css'

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentUser, dispatch] = useAuthContext()

  const handleHamburgerClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <header className="nav-container">
      <nav className="nav-bar">
        <Link className="logo" to="/">
          Chat-app
        </Link>
        <ul className="nav-menu" data-visible={isVisible}>
          {currentUser && (
            <li>
              <NavLink
                className="nav-link"
                to="./chat"
                onClick={() => setIsVisible(false)}
              >
                Chat
              </NavLink>
            </li>
          )}

          {!currentUser && (
            <li className="push-to-right">
              <NavLink
                className="nav-link"
                to="./login"
                onClick={() => setIsVisible(false)}
              >
                Login
              </NavLink>
            </li>
          )}

          {!currentUser && (
            <li>
              <NavLink
                className="nav-link"
                to="./signup"
                onClick={() => setIsVisible(false)}
              >
                Sign up
              </NavLink>
            </li>
          )}

          {currentUser && (
            <li className="push-to-right">
              <button
                className="nav-link"
                onClick={() => {
                  dispatch({ type: 'LOGOUT' })
                  setIsVisible(false)
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <div className="push-to-right"></div>
        {currentUser && (
          <UserBadge
            photoURL={currentUser.photoURL!}
            displayName={currentUser.displayName!}
            onClick={handleHamburgerClick}
          />
        )}
        <HamburgerButton onClick={handleHamburgerClick} />
      </nav>
    </header>
  )
}

export default Navigation
