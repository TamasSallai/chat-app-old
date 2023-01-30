import { useAuthContext } from './context/auth'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [currentUser, dispatch] = useAuthContext()
  return (
    <div>
      {currentUser && (
        <div>
          User logged in: {currentUser.displayName}
          <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
        </div>
      )}
      <Login />
      <br />
      <Register />
    </div>
  )
}

export default App
