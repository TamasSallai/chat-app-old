import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react'
import { User } from 'firebase/auth'
import { Action, reducer } from './reducer'

const localStorageUser = localStorage.getItem('user')
const initialState = localStorageUser ? JSON.parse(localStorageUser) : null

const AuthContext = createContext<[User | null, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

export const useAuthContext = () => useContext(AuthContext)

type UserProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: UserProviderProps) => {
  const [currentUser, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
    setIsLoading(false)
  }, [currentUser])

  return (
    <AuthContext.Provider value={[currentUser, dispatch]}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
