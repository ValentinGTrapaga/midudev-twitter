import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AppLayout from '../components/AppLayout'
import Image from 'next/image'
import Button from '../components/Button'
import devterLogo from '../public/devter-logo.png'

import { loginWithGitHub, onAuthStateChange } from '../firebase/client'
import { useEffect, useState } from 'react'
import { mapUserFromFirebaseAuth } from './../utils/mapUserFromFirebase';

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (onAuthStateChange(setUser))
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        const { avatar, url, username } = mapUserFromFirebaseAuth(user)
        setUser(mapUserFromFirebaseAuth(user))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>devter 🐦</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      <AppLayout>
        <section className={styles.loginSection}>
          <Image
            src={devterLogo}
            alt='Logo'
            width={120}
            height={120}
            layout={'fixed'}
          />
          <h1 className={styles.title}>Jedweet</h1>
          <h2 className={styles.slogan}>
            Talk about development
            <br /> with developers 🧑‍💻
          </h2>

          <div className={styles.buttonDiv}>
            {user === null && (
              <Button onClick={handleClick}>Login with GitHub</Button>
            )}
            {user && user.avatar && (
              <div className={styles.profileDiv}>
                <Image
                  className={styles.profileImg}
                  src={user.avatar}
                  alt={user.username}
                  width={48}
                  height={48}
                layout={'fixed'}
                />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>
    </div>
  )
}
