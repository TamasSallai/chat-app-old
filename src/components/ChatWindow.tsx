import MessageEntry from './MessageEntry'

export const ChatWindow = () => {
  return (
    <div>
      {/* Chat header */}
      <div>
        <h3>Chat title</h3>
      </div>

      {/* Messages */}
      <div>
        <MessageEntry />
        <MessageEntry />
        <MessageEntry />
      </div>

      {/* Message input */}
      <div>
        <input type="text" />
      </div>
    </div>
  )
}
