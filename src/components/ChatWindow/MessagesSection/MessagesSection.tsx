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
}

const MessagesSection = ({ chat, messages }: MessagesSectionProps) => {
  return (
    <div className="messages-section">
      <div className="messages-container">
        {messages.map((message) => (
          <MessageEntry
            key={message.id}
            message={convertMessageType(message, chat)}
          />
        ))}
      </div>
    </div>
  )
}

export default MessagesSection
