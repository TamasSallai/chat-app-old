import React from 'react'
import { useUserContext } from '../../../context/auth'
import { Chat, Message } from '../../../types'
import Avatar from '../../Avatar/Avatar'
import './MessageEntry.css'

interface MessageEntryProps {
  chat: Chat
  message: Message
}

const MessageEntry = ({ chat, message }: MessageEntryProps) => {
  const [currentUser] = useUserContext()
  return (
    <div
      className={
        currentUser.uid === message.senderId
          ? 'message-entry owner'
          : 'message-entry'
      }
    >
      <Avatar
        imagePath={
          currentUser.uid === message.senderId
            ? currentUser.photoURL!
            : chat.chatImageURL
        }
      />
      <div className="message-text-container">
        <p className="message-text">{message.content}</p>
      </div>
    </div>
  )
}

export default MessageEntry
