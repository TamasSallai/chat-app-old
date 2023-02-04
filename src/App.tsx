import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ChatPage from './pages/ChatPage/ChatPage'
import ProtectedRoute from './ProtectRoute'

function App() {
  return (
    <div>
      <Navigation />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
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
