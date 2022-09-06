import React from 'react'
import styles from './styles.module.css'
import AppLayout from '../../components/AppLayout'

const HomePage = () => {
  return (
    <div className={styles.container}>
      <AppLayout>
        <header className={styles.headerDiv}>
          <h1>Inicio</h1>
        </header>
        <section className={styles.sectionDiv}></section>
        <nav className={styles.navDiv}></nav>
      </AppLayout>
    </div>
  )
}

export default HomePage
