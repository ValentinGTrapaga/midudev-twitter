import React from 'react'
import styles from './styles.module.css'
import AppLayout from '../../components/AppLayout'
import { useState, useEffect } from 'react'
import { Devit } from '../../components/Devit'
import useUser from '../../hooks/useUser'
import { fetchLatestDevits } from '../../firebase/client'

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <div className={styles.container}>
      <AppLayout>
        <header className={styles.headerDiv}>
          <h1>Inicio</h1>
        </header>
        <section className={styles.devitsDiv}>
          {timeline.map(({ id, username, content, avatar, createdAt }) => (
            <Devit
              key={id}
              username={username}
              avatar={avatar}
              message={content}
              id={id}
              createdAt={createdAt}
            />
          ))}
        </section>
        <nav className={styles.navDiv}></nav>
      </AppLayout>
    </div>
  )
}

export default HomePage
