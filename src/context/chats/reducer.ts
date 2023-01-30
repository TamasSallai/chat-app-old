import { Chat, Chats } from './state'

export type Action =
  | { type: 'GET_CHATS'; payload: Chat[] }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'SELECT_CHAT'; payload: Chat }

export const reducer = (state: Chats, action: Action) => {
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
        currentChat: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
