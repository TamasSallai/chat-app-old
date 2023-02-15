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
  isEndOfMessages: boolean
  handleMessageFetch: () => Promise<void>
}

const MessagesSection = ({
  chat,
  messages,
  isEndOfMessages,
  handleMessageFetch,
}: MessagesSectionProps) => {
  return (
    <div className="messages-section">
      <div className="messages-container">
        {messages.map((message) => (
          <MessageEntry
            key={message.id}
            message={convertMessageType(message, chat)}
          />
        ))}
        {isEndOfMessages ? (
          <div>No more messages</div>
        ) : (
          <button onClick={handleMessageFetch}>fetch older messages</button>
        )}
      </div>
    </div>
  )
}

export default MessagesSection
