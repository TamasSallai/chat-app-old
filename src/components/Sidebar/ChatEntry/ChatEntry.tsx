import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/auth'
import { Chat, Message } from '../../../types'
import Avatar from '../../Avatar/Avatar'
import './ChatEntry.css'

interface ChatEntryProps {
  isExpanded: boolean
  chat: Chat
}

const ChatEntry = ({ isExpanded, chat }: ChatEntryProps) => {
  const { chatName, chatImageURL, lastMessage } = chat
  const [currentUser] = useAuthContext()
  const [lastMessageTime, setLastMessageTime] = useState('')

  const calculateLastMessageTime = ({ createdAt }: Message) => {
    const lastMessageMillis = createdAt.toMillis()
    const differenceInMillis = Date.now() - lastMessageMillis

    if (differenceInMillis <= 1200000) {
      setLastMessageTime('now')
    } else {
      setLastMessageTime(`${Math.round(differenceInMillis / 3600000)} hour`)
    }
  }

  useEffect(() => {
    if (lastMessage) {
      calculateLastMessageTime(lastMessage)
      const interval = setInterval(
        () => calculateLastMessageTime(lastMessage),
        3600000
      )
      return () => clearInterval(interval)
    }
  }, [lastMessage])

  return (
    <div className="chat-entry">
      <Avatar imagePath={chatImageURL} />
      {isExpanded && (
        <div className="chat-entry-expanded">
          <div className="chat-name">{chatName}</div>
          {lastMessage && (
            <div className="last-message-container">
              <div className="last-message">
                {lastMessage.senderId === currentUser!.uid
                  ? `You: ${lastMessage.content}`
                  : lastMessage.content}
              </div>
              <div className="last-message-time">- {lastMessageTime}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatEntry
