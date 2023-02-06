import { useEffect, useRef, useState } from 'react'
import { Chat, MessageDocument } from '../../types'
import { doc, onSnapshot } from 'firebase/firestore'
import { createMessage, db, getMessages } from '../../firebase'
import MessageEntry from './MessageEntry/MessageEntry'
import Avatar from '../Avatar/Avatar'
import './ChatWindow.css'
import { useUserContext } from '../../context/auth'

interface ChatWindowProps {
  chat: Chat
}

const ChatWindow = ({ chat }: ChatWindowProps) => {
  const [currentUser] = useUserContext()
  const [messages, setMessages] = useState<MessageDocument[]>([])
  const [input, setInput] = useState('')
  const messagesBottom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('subscribing to new snapshot listener')
    const unsub = onSnapshot(doc(db, 'chats', chat.id), async () => {
      setMessages(await getMessages(chat.id, 25))
      console.log('onSnapshot run')
    })

    return () => {
      console.log('unsubscribe from snapshot listener')
      unsub()
    }
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
        <Avatar imagePath={chat.chatImageURL} />
        <h3>{chat.chatName}</h3>
      </div>

      {/* Messages */}
      <div className="message-entries">
        {messages.map((message) => (
          <MessageEntry key={message.id} message={message} chat={chat} />
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
