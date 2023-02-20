import { useState } from 'react'
import './MessageInput.css'

interface MessageInputProps {
  sendMessage: (messageInput: string) => Promise<void>
}

const MessageInput = ({ sendMessage }: MessageInputProps) => {
  const [messageInput, setMessageInput] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (messageInput.length > 0) {
      sendMessage(messageInput)
      setMessageInput('')
    }
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        type="text"
        placeholder="Write a message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
    </form>
  )
}

export default MessageInput
