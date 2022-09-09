import React, { useState, useEffect } from 'react'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import styles from './styles.module.css'
import useUser from '../../../hooks/useUser'
import Head from 'next/head'
import { addDevit, uploadImage } from '../../../firebase/client'
import { useRouter } from 'next/router'
import {
  onProgress,
  onError,
  onSuccess
} from '../../../firebase/handlingUploadImage'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

const ComposeTweet = () => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const user = useUser()
  const router = useRouter()

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      task.on(
        'state_changed',
        (snapshot) => onProgress(snapshot, setStatus),
        (err) => onError(err),
        onSuccess(task, setImgURL, setStatus)
      )
    }
  }, [task])

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

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <div className={styles.container}>
      <AppLayout>
        <Head>
          <title>Crear un Jedweet</title>
        </Head>
        <form
          onSubmit={handleSubmit}
          className={styles.formDiv}>
          <textarea
            style={{
              border:
                drag === DRAG_IMAGE_STATES.DRAG_OVER
                  ? '2px dashed #09f'
                  : '2px dashed transparent'
            }}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            autoFocus
            placeholder='Que esta pasando?'
            className={styles.textareaDiv}
            value={message}></textarea>
          {status === 2 && <h4>Loading image...</h4>}
          {imgURL && (
            <div className={styles.uploadedImgDiv}>
              <img
                src={imgURL}
                className={styles.uploadedImg}
              />
              <button
                className={styles.uploadedImgBtn}
                onClick={() => {
                  setImgURL(null)
                  setStatus(0)
                }}>
                X
              </button>
            </div>
          )}
          <div className={styles.buttonDiv}>
            <Button disabled={isButtonDisabled}>Jedweet</Button>
          </div>
        </form>
      </AppLayout>
    </div>
  )
}

export default ComposeTweet
