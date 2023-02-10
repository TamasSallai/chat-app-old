import { useState } from 'react'
import './MessageInput.css'

interface MessageInputProps {
  sendMessage: (messageInput: string) => Promise<void>
}

const MessageInput = ({ sendMessage }: MessageInputProps) => {
  const [messageInput, setMessageInput] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      sendMessage(messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="message-input-container">
      <input
        className="message-input"
        type="text"
        placeholder="Write a message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  )
}

export default MessageInput
