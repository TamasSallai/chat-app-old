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

export interface Chat {
  id: string
  chatName: string
  chatImageURL: string
  participants: UserInfo[]
  lastMessage?: Message
  messages: Message[]
}

export const convertChat = (
  currentUserId: string,
  chatDoc: ChatDocument
): Chat => {
  const { id, participants, lastMessage } = chatDoc
  const userInfo = participants.find((user) => user.id !== currentUserId)

  return {
    id: id,
    chatName: userInfo!.username,
    chatImageURL: userInfo!.photoURL,
    participants: participants,
    lastMessage: lastMessage,
    messages: [],
  }
}
