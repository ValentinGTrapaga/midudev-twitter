import React from 'react'
import styles from './styles.module.css'
import AppLayout from '../../components/AppLayout'
import { useState, useEffect } from 'react'
import { Devit } from '../../components/Devit'
import useUser from '../../hooks/useUser'
import { fetchLatestDevits } from '../../firebase/client'
import Link from 'next/link'
import Create from './../../components/Icons/Create'
import Home from './../../components/Icons/Home'
import Search from './../../components/Icons/Search'
import Head from 'next/head'

const HomePage = () => {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <div className={styles.container}>
      <AppLayout>
        <Head>
          <title>Inicio / Jedweet</title>
        </Head>
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
        <nav className={styles.navDiv}>
          <Link href='/home'>
            <Home
              className={styles.navLink}
              stroke='#09f'
              width={32}
              height={32}
            />
          </Link>
          <Link href='/compose/tweet'>
            <Search
              className={styles.navLink}
              stroke='#09f'
              width={32}
              height={32}
            />
          </Link>
          <Link href='/compose/tweet'>
            <Create
              className={styles.navLink}
              stroke='#09f'
              width={32}
              height={32}
            />
          </Link>
        </nav>
      </AppLayout>
    </div>
  )
}

export default HomePage
