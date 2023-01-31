import { DocumentData, DocumentReference } from 'firebase/firestore'

export interface UserDocument extends DocumentData {
  id: string
  username: string
  email: string
  photoURL: string
  createdAt: Date
  chatRefs: DocumentReference[]
}

interface UserInfo {
  id: string
  username: string
  photoURL: string
}

interface MessageInfo {
  id: string
  senderId: string
  content: string
  createdAt: Date
}

export interface ChatDocument extends DocumentData {
  id: string
  createdAt: Date
  participants: UserInfo[]
  lastMessage: MessageInfo
}
