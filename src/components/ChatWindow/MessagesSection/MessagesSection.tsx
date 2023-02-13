import {
  ChatDocument,
  convertMessageType,
  MessageDocument,
} from '../../../types'
import MessageEntry from './MessageEntry/MessageEntry'
import './MessagesSection.css'

interface MessagesSectionProps {
  chat: ChatDocument
  messages: MessageDocument[]
  onClick: () => void
}

const MessagesSection = ({ chat, messages, onClick }: MessagesSectionProps) => {
  return (
    <div className="messages-section">
      <div className="messages-container">
        {messages.map((message) => (
          <MessageEntry
            key={message.id}
            message={convertMessageType(message, chat)}
          />
        ))}
        <button onClick={onClick}>fetch older messages</button>
      </div>
    </div>
  )
}

export default MessagesSection
