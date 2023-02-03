import { useEffect } from 'react'
import { useAuthContext } from '../../context/auth'
import { useChatContext } from '../../context/chat'
import { ChatDocument, convertChat, UserDocument } from '../../types'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../../components/Sidebar/Sidebar'
import ChatWindow from '../../components/ChatWindow/ChatWindow'
import './ChatPage.css'

const ChatPage = () => {
  const [currentUser] = useAuthContext()
  const [, dispatch] = useChatContext()

  useEffect(() => {
    const getChatsOnUserChange = (currentUserId: string) => {
      const unsub = onSnapshot(
        doc(db, 'users', currentUserId),
        async (userSnap) => {
          const userDoc = userSnap.data() as UserDocument
          const chatRefs = userDoc.chatRefs
          const chatSnaps = await Promise.all(
            chatRefs.map((chatRef) => getDoc(chatRef))
          )

          const chats = chatSnaps
            .filter((chatSnap) => chatSnap.exists())
            .map((chatSnap) => {
              const chatDoc = chatSnap.data() as ChatDocument
              return convertChat(currentUserId, chatDoc)
            })

          dispatch({ type: 'GET_CHATS', payload: chats })
        }
      )
      return () => unsub()
    }

    currentUser && getChatsOnUserChange(currentUser.uid)
  }, [currentUser, dispatch])

  return (
    <div className="chat-page">
      <Sidebar />
      <ChatWindow />
    </div>
  )
}

export default ChatPage
