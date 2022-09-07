import React, { useState } from 'react'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import styles from './styles.module.css'
import useUser from '../../../hooks/useUser'
import { addDevit } from '../../../firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const ComposeTweet = () => {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        setStatus(COMPOSE_STATES.ERROR)
        console.error(err)
      })
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <div className={styles.container}>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder='Que esta pasando?'
            className={styles.textareaDiv}
            value={message}></textarea>
          <div className={styles.buttonDiv}>
            <Button disabled={isButtonDisabled}>Jedweet</Button>
          </div>
        </form>
      </AppLayout>
    </div>
  )
}

export default ComposeTweet
