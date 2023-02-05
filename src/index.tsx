import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth'
import { ChatProvider } from './context/chat'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>
)
