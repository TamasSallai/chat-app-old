import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth'
import { ChatsProvider } from './context/chats'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatsProvider>
          <App />
        </ChatsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
