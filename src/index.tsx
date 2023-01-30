import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth'
import { ChatsProvider } from './context/chats'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatsProvider>
        <App />
      </ChatsProvider>
    </AuthProvider>
  </React.StrictMode>
)
