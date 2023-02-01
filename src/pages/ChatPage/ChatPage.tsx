import { ChatWindow } from '../../components/ChatWindow/ChatWindow'
import Sidebar from '../../components/Sidebar/Sidebar'
import './ChatPage.css'

const ChatPage = () => {
  return (
    <div className="chat-page">
      <Sidebar />
      <ChatWindow />
    </div>
  )
}

export default ChatPage
