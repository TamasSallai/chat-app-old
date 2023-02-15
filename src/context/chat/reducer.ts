import { ChatDocument } from '../../types'
import { ChatContextType } from './state'

export type Action =
  | { type: 'GET_CHATS'; payload: ChatDocument[] }
  | { type: 'ADD_CHAT'; payload: ChatDocument }
  | { type: 'SELECT_CHAT'; payload: string }

export const reducer = (state: ChatContextType, action: Action) => {
  switch (action.type) {
    case 'GET_CHATS': {
      return {
        ...state,
        chatList: action.payload.reduce(
          (memo, chat) => ({ ...memo, [chat.id]: chat }),
          {}
        ),
      }
    }
    case 'ADD_CHAT': {
      return {
        ...state,
        chatList: {
          ...state.chatList,
          [action.payload.id]: action.payload,
        },
      }
    }
    case 'SELECT_CHAT': {
      return {
        ...state,
        currentChat: state.chatList[action.payload],
      }
    }
    default: {
      return state
    }
  }
}
