import { useCallback, useEffect, useState } from 'react'
import { useUserContext } from '../../context/auth'
import { ChatDocument, MessageDocument } from '../../types'
import { db, createMessage, fetchMessagesByChatId } from '../../firebase'
import MessagesSection from './MessagesSection/MessagesSection'
import MessageInput from './MessageInput/MessageInput'
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader'
import './ChatWindow.css'
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'

interface ChatWindowProps {
  chat: ChatDocument
}

const ChatWindow = ({ chat }: ChatWindowProps) => {
  const [isEndOfMessages, setIsEndOfMessages] = useState(false)
  const [messages, setMessages] = useState<MessageDocument[]>([])
  const [currentUser] = useUserContext()

  const handleMessageFetch = useCallback(
    async (lastMessage: MessageDocument) => {
      const fetchedMessages = await fetchMessagesByChatId(
        chat.id,
        15,
        lastMessage
      )
      if (fetchedMessages.length > 0) {
        setMessages((messages) => [...messages, ...fetchedMessages])
      } else {
        setIsEndOfMessages(true)
      }
    },
    [chat.id]
  )

  const sendMessage = async (messageInput: string) => {
    await createMessage(chat.id, currentUser.uid, messageInput)
  }

  useEffect(() => {
    setIsEndOfMessages(false)

    fetchMessagesByChatId(chat.id, 15).then((fetchedMessages) => {
      setMessages(fetchedMessages)
    })

    const q = query(
      collection(doc(db, 'chats', chat.id), 'messages'),
      orderBy('createdAt', 'desc'),
      limit(1)
    )
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newMessage = change.doc.data() as MessageDocument
          setMessages((messages) => [newMessage, ...messages])
        }
      })
    })

    return () => {
      setMessages([])
      return unsub()
    }
  }, [chat.id])

  return (
    <div className="chat-window">
      <ChatWindowHeader />
      <MessagesSection
        chat={chat}
        messages={messages}
        isEndOfMessages={isEndOfMessages}
        handleMessageFetch={() =>
          handleMessageFetch(messages[messages.length - 1])
        }
      />
      <MessageInput sendMessage={sendMessage} />
    </div>
  )
}

export default ChatWindow
