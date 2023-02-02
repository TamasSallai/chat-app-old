import { useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../../../context/auth'
import { ChatDocument, Message, UserInfo } from '../../../types'
import Avatar from '../../Avatar/Avatar'
import './ChatEntry.css'

interface ChatEntryProps {
  isExpanded: boolean
  chat: ChatDocument
}

const ChatEntry = ({ isExpanded, chat }: ChatEntryProps) => {
  const { lastMessage } = chat
  const { participants } = chat
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

  const userInfoMemo = useMemo((): UserInfo | null => {
    if (!currentUser) {
      return null
    }
    return participants.find((user) => user.id !== currentUser.uid) as UserInfo
  }, [currentUser, participants])

  return (
    <div className="chat-entry">
      <Avatar imagePath={userInfoMemo ? userInfoMemo.photoURL : ''} />
      {isExpanded && (
        <div className="chat-entry-expanded">
          {userInfoMemo && (
            <div className="chat-name">{userInfoMemo.username}</div>
          )}
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
