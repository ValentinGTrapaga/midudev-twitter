import styles from '../styles/Home.module.css'
import devterLogo from '../public/devter-logo.png'

import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import Image from 'next/image'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import { useRouter } from 'next/router'

import { loginWithGitHub } from '../firebase/client'
import { useEffect } from 'react'
import useUser, { USER_STATES } from '../hooks/useUser'

export default function Home() {
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
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
              <Avatar
                text={user.username}
                alt={user.username}
                src={user.avatar}
              />
            )}
            {user === undefined && <span>Loading...</span>}
          </div>
        </section>
      </AppLayout>
    </div>
  )
}
