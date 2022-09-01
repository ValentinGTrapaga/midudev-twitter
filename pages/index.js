import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import AppLayout from '../components/AppLayout'

export default function Home() {
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
        <h1>
          <a href='https://nextjs.org'>devter</a>
        </h1>
        <nav>
          <Link href='/timeline'>
            <a>timeline</a>
          </Link>
        </nav>
      </AppLayout>
    </div>
  )
}
