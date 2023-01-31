import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

const Navigation = () => {
  const [currentUser, dispatch] = useAuthContext()

  return (
    <nav>
      {currentUser && (
        <div>
          <div>{currentUser.displayName}</div>
          <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
        </div>
      )}
      <ul>
        <li>
          <Link to="./login">Login</Link>
        </li>
        <li>
          <Link to="./register">Register</Link>
        </li>
        <li>
          <Link to="./chat">Chat</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
