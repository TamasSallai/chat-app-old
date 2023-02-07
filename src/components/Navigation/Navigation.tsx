import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../../context/auth'
import Avatar from '../Avatar/Avatar'
import './Navigation.css'

const Navigation = () => {
  const [currentUser, dispatch] = useAuthContext()

  return (
    <header className="nav-container">
      <nav className="nav-bar">
        <Link className="logo" to="/">
          Chat-app
        </Link>
        <ul className="nav-menu">
          {currentUser && (
            <li>
              <NavLink className="nav-link" to="./chat">
                Chat
              </NavLink>
            </li>
          )}

          {!currentUser && (
            <li className="push-to-right">
              <NavLink className="nav-link" to="./login">
                Login
              </NavLink>
            </li>
          )}

          {!currentUser && (
            <li>
              <NavLink className="nav-link" to="./register">
                Register
              </NavLink>
            </li>
          )}
        </ul>
        {currentUser && (
          <div className="user-badge">
            <div>{currentUser.displayName}</div>
            <Avatar imagePath={currentUser.photoURL!} />
            <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navigation
