import { useCallback, useEffect, useState } from 'react'
import { useUserContext } from '../../context/auth'
import { ChatDocument, MessageDocument } from '../../types'
import { createMessage, fetchMessagesByChatId } from '../../firebase'
import MessagesSection from './MessagesSection/MessagesSection'
import MessageInput from './MessageInput/MessageInput'
import ChatWindowHeader from './ChatWindowHeader/ChatWindowHeader'
import './ChatWindow.css'

interface ChatWindowProps {
  chat: ChatDocument
}

const ChatWindow = ({ chat }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageDocument[]>([])
  const [currentUser] = useUserContext()

  const handleMessageFetch = useCallback(
    async (lastMessage: MessageDocument) => {
      console.log('fetch run')
      const fetchedMessages = await fetchMessagesByChatId(
        chat.id,
        15,
        lastMessage
      )
      setMessages((messages) => [...messages, ...fetchedMessages])
    },
    [chat.id]
  )

  useEffect(() => {
    fetchMessagesByChatId(chat.id, 15).then((fetchedMessages) =>
      setMessages(fetchedMessages)
    )
  }, [chat])

  const sendMessage = async (messageInput: string) => {
    await createMessage(chat.id, currentUser.uid, messageInput)
  }

  return (
    <div className="chat-window">
      <ChatWindowHeader />
      <MessagesSection
        chat={chat}
        messages={messages}
        onClick={() => handleMessageFetch(messages[messages.length - 1])}
      />
      <MessageInput sendMessage={sendMessage} />
    </div>
  )
}

export default ChatWindow
