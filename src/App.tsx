import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'
import './App.css'

function App() {
  return (
    <div>
      <Navigation />
      <br />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App
