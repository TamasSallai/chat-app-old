import { useEffect, useMemo } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ChatPage from './pages/ChatPage/ChatPage'
import ProtectedRoute from './ProtectRoute'
import { useChatContext } from './context/chat'

function App() {
  const match = useMatch('/chat/:id')
  const matchMemo = useMemo(() => match?.params.id, [match])
  const [, dispatch] = useChatContext()

  useEffect(() => {
    if (matchMemo) {
      dispatch({ type: 'SELECT_CHAT', payload: matchMemo })
    }
  }, [matchMemo, dispatch])

  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat/*"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
