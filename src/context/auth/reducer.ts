import { User } from 'firebase/auth'

export type Action = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' }

export const reducer = (state: User | null, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload }
    case 'LOGOUT':
      return null
    default:
      return state
  }
}
