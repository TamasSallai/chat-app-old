import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ChatPage from './pages/ChatPage/ChatPage'
import ProtectedRoute from './ProtectRoute'
import { useAuthContext } from './context/auth'
import './App.css'
import { ChatProvider } from './context/chat'

function App() {
  const [currentUser] = useAuthContext()
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
                <ChatProvider>
                  <ChatPage />
                </ChatProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
