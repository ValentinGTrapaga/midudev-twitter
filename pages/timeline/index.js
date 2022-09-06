import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import styles from '../../styles/Home.module.css'

export default function Timeline({ userName }) {
  return (
    <div className={styles.container}>
      <AppLayout>
        <h1>This is the timeline of {userName}</h1>
        <Link href='/'>Go home</Link>
      </AppLayout>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()
  const { userName } = data
  return {
    props: {
      userName
    }
  }
}
