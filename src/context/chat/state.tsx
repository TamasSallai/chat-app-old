import { createContext, useContext, useEffect, useReducer } from 'react'
import { useAuthContext } from '../auth'
import { Action, reducer } from './reducer'
import { Chat, ChatDocument, convertChat, UserDocument } from '../../types'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

export interface ChatContextType {
  currentChat: Chat | null
  chatList: { [id: string]: Chat }
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
  const [currentUser] = useAuthContext()

  useEffect(() => {
    const getChatsOnUserChange = (currentUserId: string) => {
      const unsub = onSnapshot(
        doc(db, 'users', currentUserId),
        async (userSnap) => {
          const userDoc = userSnap.data() as UserDocument
          const chatRefs = userDoc.chatRefs
          const chatSnaps = await Promise.all(
            chatRefs.map((chatRef) => getDoc(chatRef))
          )

          const chats = chatSnaps
            .filter((chatSnap) => chatSnap.exists())
            .map((chatSnap) => {
              const chatDoc = chatSnap.data() as ChatDocument
              return convertChat(currentUserId, chatDoc)
            })

          dispatch({ type: 'GET_CHATS', payload: chats })
        }
      )

      return () => unsub()
    }
    currentUser && getChatsOnUserChange(currentUser.uid)
  }, [currentUser])

  return (
    <ChatContext.Provider value={[chats, dispatch]}>
      {children}
    </ChatContext.Provider>
  )
}
