import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserContext } from '../../../context/auth'
import { ChatDocument, Message } from '../../../types'
import Avatar from '../../Avatar/Avatar'
import './ChatEntry.css'

interface ChatEntryProps {
  isExpanded: boolean
  chatDocument: ChatDocument
}

const ChatEntry = ({ isExpanded, chatDocument }: ChatEntryProps) => {
  const [lastMessageTime, setLastMessageTime] = useState('')
  const [currentUser] = useUserContext()
  const { id, members, lastMessage } = chatDocument

  const chatUserMemo = useMemo(() => {
    return Object.values(members).find((member) => {
      return member.id !== currentUser.uid && member
    })
  }, [currentUser.uid, members])

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
      if (lastMessage.createdAt) calculateLastMessageTime(lastMessage)
      const interval = setInterval(
        () => calculateLastMessageTime(lastMessage),
        3600000
      )
      return () => clearInterval(interval)
    }
  }, [lastMessage])

  return (
    <NavLink className="chat-entry" to={id}>
      <Avatar imagePath={chatUserMemo!.photoURL} />
      {isExpanded && (
        <div className="chat-entry-expanded">
          <div className="chat-name">{chatUserMemo!.username}</div>
          {lastMessage && (
            <div className="last-message-container">
              <div className="last-message">
                {lastMessage.senderId === currentUser.uid
                  ? `You: ${lastMessage.content}`
                  : lastMessage.content}
              </div>
              <div className="last-message-time">- {lastMessageTime}</div>
            </div>
          )}
        </div>
      )}
    </NavLink>
  )
}

export default ChatEntry
