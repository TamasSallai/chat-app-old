import { Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import ChatPage from './pages/ChatPage/ChatPage'
import ProtectedRoute from './ProtectRoute'
import { useAuthContext } from './context/auth'
import { ChatProvider } from './context/chat'
import './App.css'

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
              currentUser ? (
                <Navigate to="/chat" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/chat" replace /> : <LoginPage />
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? <Navigate to="/chat" replace /> : <SignupPage />
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
