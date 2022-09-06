import { initializeApp } from 'firebase/app'
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAzvm6SFgHubqazmhP_RisqI_2tOmzJTBs',
  authDomain: 'jedweet-d4285.firebaseapp.com',
  projectId: 'jedweet-d4285',
  storageBucket: 'jedweet-d4285.appspot.com',
  messagingSenderId: '741797357781',
  appId: '1:741797357781:web:879d18272a9e7096685a5c'
}

initializeApp(firebaseConfig)
export const auth = getAuth()

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
  const { photoURL, email, reloadUserInfo } = user
  const { screenName } = reloadUserInfo
  const blog = `https://www.github.com/${screenName}`
  return {
    avatar: photoURL,
    username: screenName,
    url: blog,
    email
  }
}
