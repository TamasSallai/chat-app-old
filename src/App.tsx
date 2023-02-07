import { useEffect, useMemo } from 'react'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ChatPage from './pages/ChatPage/ChatPage'
import ProtectedRoute from './ProtectRoute'
import { useChatContext } from './context/chat'
import './App.css'
import { useAuthContext } from './context/auth'

function App() {
  const match = useMatch('/chat/:id')
  const matchMemo = useMemo(() => match?.params.id, [match])
  const [, dispatch] = useChatContext()
  const [currentUser] = useAuthContext()

  useEffect(() => {
    if (matchMemo) {
      dispatch({ type: 'SELECT_CHAT', payload: matchMemo })
    }
  }, [matchMemo, dispatch])

  return (
    <div>
      <Navigation />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/chat" replace /> : <LoginPage />
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/chat" replace /> : <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? <Navigate to="/chat" replace /> : <RegisterPage />
            }
          />
          <Route
            path="/chat/*"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
