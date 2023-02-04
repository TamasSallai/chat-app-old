import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatWindow from '../../components/ChatWindow/ChatWindow'
import './ChatPage.css'

const ChatPage = () => {
  return (
    <div className="chat-page">
      <Sidebar />
      <Routes>
        <Route path="/chat/:id" element={<ChatWindow />} />
      </Routes>
    </div>
  )
}

export default ChatPage
