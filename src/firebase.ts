import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

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
const db = getFirestore(app)
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
    uid: user.uid,
    username,
    email,
    photoURL: downloadProfilePictureURL,
    createdAt: serverTimestamp(),
  })

  await updateProfile(user, {
    displayName: username,
    photoURL: downloadProfilePictureURL,
  })

  return user
}
