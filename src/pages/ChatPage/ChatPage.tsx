import { Route, Routes, useMatch } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useChatContext } from '../../context/chat'
import ChatWindow from '../../components/ChatWindow/ChatWindow'
import { useEffect, useMemo } from 'react'
import './ChatPage.css'
import NoChatWindow from '../../components/NoChatWindow/NoChatWindow'

const ChatPage = () => {
  const [{ currentChat }, dispatch] = useChatContext()
  const match = useMatch('/chat/:id')
  const matchMemo = useMemo(() => match?.params.id, [match])

  useEffect(() => {
    if (matchMemo) {
      dispatch({ type: 'SELECT_CHAT', payload: matchMemo })
    }
  }, [matchMemo, dispatch])

  return (
    <div className="chat-page">
      <Sidebar />
      <Routes>
        <Route
          path="/:id"
          element={
            currentChat ? <ChatWindow chat={currentChat} /> : <NoChatWindow />
          }
        />
      </Routes>
    </div>
  )
}

export default ChatPage
