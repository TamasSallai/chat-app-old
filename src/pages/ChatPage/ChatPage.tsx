import { Route, Routes, useMatch } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useChatContext } from '../../context/chat'
import ChatWindow from '../../components/ChatWindow/ChatWindow'
import './ChatPage.css'
import { useEffect, useMemo } from 'react'

const ChatPage = () => {
  const [{ currentChat }] = useChatContext()

  const match = useMatch('/chat/:id')
  const matchMemo = useMemo(() => match?.params.id, [match])
  const [, dispatch] = useChatContext()

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
          element={currentChat && <ChatWindow chat={currentChat} />}
        />
      </Routes>
    </div>
  )
}

export default ChatPage
