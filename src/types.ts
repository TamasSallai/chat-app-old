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

export type MessageDocument = Message & DocumentData

export interface ChatDocument extends DocumentData {
  id: string
  createdAt: Timestamp
  members: Record<string, UserInfo>
  lastMessage?: Message
}

export interface MessageInfo {
  id: string
  sender: UserInfo
  content: string
  createdAt: Timestamp
}

export const convertMessageType = (
  messageDoc: MessageDocument,
  chatDoc: ChatDocument
): MessageInfo => {
  return {
    id: messageDoc.id,
    content: messageDoc.content,
    createdAt: messageDoc.createdAt,
    sender: chatDoc.members[messageDoc.senderId],
  }
}
