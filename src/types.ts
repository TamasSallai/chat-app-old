import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'

export interface UserDocument extends DocumentData {
  id: string
  username: string
  email: string
  photoURL: string
  createdAt: Timestamp
  chatRefs: DocumentReference[]
}

export interface UserInfo {
  id: string
  username: string
  photoURL: string
}

export interface Message {
  id: string
  senderId: string
  content: string
  createdAt: Timestamp
}

export interface ChatDocument extends DocumentData {
  id: string
  createdAt: Timestamp
  participants: UserInfo[]
  lastMessage?: Message
}

export interface ChatDocumentWithMessages extends ChatDocument {
  messages: Message[]
}
