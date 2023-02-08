import { useEffect, useRef, useState, useMemo } from 'react'
import { useUserContext } from '../../context/auth'
import { ChatDocument, MessageDocument } from '../../types'
import { createMessage, db } from '../../firebase'
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import MessageEntry from './MessageEntry/MessageEntry'
import Avatar from '../Avatar/Avatar'
import './ChatWindow.css'

interface ChatWindowProps {
  chat: ChatDocument
}

const ChatWindow = ({ chat }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageDocument[]>([])
  const [input, setInput] = useState('')
  const messagesBottom = useRef<HTMLDivElement>(null)
  const [currentUser] = useUserContext()
  const { members } = chat

  const chatUserMemo = useMemo(() => {
    return Object.values(members).find((member) => {
      return member.id !== currentUser.uid && member
    })
  }, [currentUser.uid, members])

  useEffect(() => {
    console.log(
      `Subscribe to messages snapshot listener with chat id: ${chat.id}`
    )
    const fetchMessagesByChatId = async (
      chatId: string,
      queryLimit: number
    ) => {
      const q = query(
        collection(doc(db, 'chats', chatId), 'messages'),
        limit(queryLimit),
        orderBy('createdAt')
      )
      const unsub = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map(
          (messageSnap) => messageSnap.data() as MessageDocument
        )
        setMessages(messages)
        console.log(`Run messages snapshot listener with chat id: ${chat.id}`)
      })

      return () => {
        console.log(
          `Unsubscribe of messages snapshot listener of with chat id: ${chat.id}`
        )
        unsub()
      }
    }
    fetchMessagesByChatId(chat.id, 25)
  }, [chat.id])

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      await createMessage(chat.id, currentUser.uid, input)
      setInput('')
      messagesBottom.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="chat-window">
      {/* Chat header */}
      <div className="chat-window-header">
        <Avatar imagePath={chatUserMemo!.photoURL} />
        <h3>{chatUserMemo!.username}</h3>
      </div>

      {/* Messages */}
      <div className="message-entries">
        {messages.map((message) => (
          <MessageEntry
            key={message.id}
            message={message}
            chatUser={chatUserMemo!}
          />
        ))}
        <div ref={messagesBottom}></div>
      </div>

      {/* Message input */}
      <div className="message-input-container">
        <input
          className="message-input"
          type="text"
          placeholder="Write a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  )
}

export default ChatWindow
