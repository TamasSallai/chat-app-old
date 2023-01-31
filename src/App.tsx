import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import './App.css'

function App() {
  return (
    <div>
      <Navigation />
      <br />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
