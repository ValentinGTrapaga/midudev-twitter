import { initializeApp } from 'firebase/app'
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  addDoc,
  Timestamp,
  collection,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAzvm6SFgHubqazmhP_RisqI_2tOmzJTBs',
  authDomain: 'jedweet-d4285.firebaseapp.com',
  projectId: 'jedweet-d4285',
  storageBucket: 'jedweet-d4285.appspot.com',
  messagingSenderId: '741797357781',
  appId: '1:741797357781:web:879d18272a9e7096685a5c'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const db = getFirestore(app)

export const onAuthStateChange = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user && mapUserFromFirebaseAuth(user)
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(auth, githubProvider).catch((err) => {
    console.log(err)
  })
}

export const mapUserFromFirebaseAuth = (user) => {
  console.log(user)
  const { photoURL, email, reloadUserInfo, uid } = user
  const { screenName } = reloadUserInfo
  const blog = `https://www.github.com/${screenName}`
  return {
    avatar: photoURL,
    username: screenName,
    url: blog,
    email,
    uid
  }
}

export const addDevit = async ({ avatar, content, userId, username }) => {
  try {
    const docRef = await addDoc(collection(db, 'jedweets'), {
      avatar,
      username,
      content,
      userId,
      createdAt: Timestamp.now(),
      likesCount: 0,
      sharesCount: 0
    })
    return docRef
  } catch (e) {
    console.error(e)
  }
}

export const fetchLatestDevits = async () => {
  const querySnapshot = await getDocs(collection(db, 'jedweets'))
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    const id = doc.id
    const { createdAt } = data
    const intl = new Intl.DateTimeFormat('es-ES')
    const normalizedCreatedAt = intl
      .format(new Date(createdAt.seconds * 1000))
      .toString()
    return {
      ...data,
      id,
      createdAt: normalizedCreatedAt
    }
  })
}
