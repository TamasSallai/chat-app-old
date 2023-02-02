import { createContext, useContext, useReducer } from 'react'
import { ChatDocument } from '../../types'
import { Action, reducer } from './reducer'

export interface ChatContextType {
  currentChat: ChatDocument | null
  chatList: { [id: string]: ChatDocument }
}

const initialState = {
  currentChat: null,
  chatList: {},
}

const ChatContext = createContext<[ChatContextType, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

export const useChatContext = () => useContext(ChatContext)

interface ChatProviderProps {
  children: React.ReactNode
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chats, dispatch] = useReducer(reducer, initialState)

  return (
    <ChatContext.Provider value={[chats, dispatch]}>
      {children}
    </ChatContext.Provider>
  )
}
