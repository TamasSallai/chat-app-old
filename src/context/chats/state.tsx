import { createContext, useContext, useReducer } from 'react'
import { Action, reducer } from './reducer'

export interface Chat {
  id: string
}

export interface Chats {
  currentChat: Chat | null
  chatList: { [id: string]: Chat }
}

const initialState = {
  currentChat: null,
  chatList: {},
}

const ChatsContext = createContext<[Chats, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
])

export const useChatsContext = () => useContext(ChatsContext)

interface ChatsProviderProps {
  children: React.ReactNode
}

export const ChatsProvider = ({ children }: ChatsProviderProps) => {
  const [chats, dispatch] = useReducer(reducer, initialState)

  return (
    <ChatsContext.Provider value={[chats, dispatch]}>
      {children}
    </ChatsContext.Provider>
  )
}
