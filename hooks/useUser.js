import { onAuthStateChange } from '../firebase/client'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser() {
  const router = useRouter()
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])

  return user
}
