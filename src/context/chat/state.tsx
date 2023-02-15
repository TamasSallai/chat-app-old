import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { useUserContext } from '../auth'
import { Action, reducer } from './reducer'
import { ChatDocument } from '../../types'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

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
  const [currentUser] = useUserContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where(`members.${currentUser.uid}`, '!=', null)
    )
    const unsub = onSnapshot(q, (querySnapshot) => {
      const chats = querySnapshot.docs.map(
        (chatSnap) => chatSnap.data() as ChatDocument
      )
      dispatch({ type: 'GET_CHATS', payload: chats })
      setIsLoading(false)
    })

    return () => unsub()
  }, [currentUser.uid])

  return (
    <ChatContext.Provider value={[chats, dispatch]}>
      {!isLoading && children}
    </ChatContext.Provider>
  )
}
