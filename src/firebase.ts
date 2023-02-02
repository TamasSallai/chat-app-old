import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { ChatDocument, UserDocument } from './types'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app)
const storage = getStorage(app)

export const loginUser = async (email: string, password: string) => {
  const userCreds = await signInWithEmailAndPassword(auth, email, password)
  const user = userCreds.user
  return user
}

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  profilePicture: File
) => {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCreds.user

  const profilePictureRef = ref(storage, email)
  await uploadBytes(profilePictureRef, profilePicture)
  const downloadProfilePictureURL = await getDownloadURL(profilePictureRef)

  await setDoc(doc(db, 'users', user.uid), {
    id: user.uid,
    username,
    email,
    photoURL: downloadProfilePictureURL,
    createdAt: serverTimestamp(),
    chatRefs: [],
  })

  await updateProfile(user, {
    displayName: username,
    photoURL: downloadProfilePictureURL,
  })

  return user
}

export const getUsers = async (currentUserId: string, username: string) => {
  const q = query(collection(db, 'users'), where('username', '==', username))

  try {
    const querySnapshot = await getDocs(q)
    const userDocuments = querySnapshot.docs
      .map((docSnap) => docSnap.data() as UserDocument)
      .filter((data) => data.uid !== currentUserId)

    return userDocuments
  } catch (e) {
    throw new Error()
  }
}

export const createChat = async (
  currentUser: User,
  searchedUser: UserDocument
) => {
  const batch = writeBatch(db)

  const chatId = uuid()
  const chatRef = doc(db, 'chats', chatId)

  batch.set(chatRef, {
    id: chatId,
    createdAt: serverTimestamp(),
    participants: [
      {
        id: currentUser.uid,
        username: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      {
        id: searchedUser.id,
        username: searchedUser.username,
        photoURL: searchedUser.photoURL,
      },
    ],
  })

  batch.update(doc(db, 'users', currentUser.uid), {
    chatRefs: arrayUnion(chatRef),
  })

  batch.update(doc(db, 'users', searchedUser.id), {
    chatRefs: arrayUnion(chatRef),
  })

  await batch.commit()
}

export const getAllChats = async (userId: string) => {
  const userSnap = await getDoc(doc(db, 'users', userId))
  const userDoc = userSnap.data() as UserDocument

  const chatRefs = userDoc.chatRefs
  const chatSnaps = await Promise.all(
    chatRefs.map((chatRef) => getDoc(chatRef))
  )
  const chatDocs = chatSnaps
    .map((chatSnap) => chatSnap.data())
    .filter((chatDoc) => chatDoc !== undefined) as ChatDocument[]

  return chatDocs
}
