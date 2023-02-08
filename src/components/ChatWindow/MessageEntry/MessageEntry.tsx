import React from 'react'
import { useUserContext } from '../../../context/auth'
import { Message, UserInfo } from '../../../types'
import Avatar from '../../Avatar/Avatar'
import './MessageEntry.css'

interface MessageEntryProps {
  chatUser: UserInfo
  message: Message
}

const MessageEntry = ({ chatUser, message }: MessageEntryProps) => {
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
            : chatUser.photoURL
        }
      />
      <div className="message-text-container">
        <p className="message-text">{message.content}</p>
      </div>
    </div>
  )
}

export default MessageEntry
