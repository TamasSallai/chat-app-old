import { useState } from 'react'
import { useUserContext } from '../../../../context/auth'
import { MessageInfo } from '../../../../types'
import Avatar from '../../../Avatar/Avatar'
import './MessageEntry.css'

interface MessageEntryProps {
  message: MessageInfo
}

const MessageEntry = ({ message }: MessageEntryProps) => {
  const [currentUser] = useUserContext()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div
      style={{ display: isLoading ? 'none' : 'flex' }}
      className={
        currentUser.uid === message?.sender?.id
          ? 'message-entry owner'
          : 'message-entry'
      }
    >
      <Avatar
        imagePath={message.sender.photoURL}
        onLoad={() => setIsLoading(false)}
      />
      <div className="message-text-container">
        <p className="message-text">{message.content}</p>
      </div>
    </div>
  )
}

export default MessageEntry
