import { Navigate } from 'react-router-dom'
import { useAuthContext } from './context/auth'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): React.ReactElement => {
  const [currentUser] = useAuthContext()
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
