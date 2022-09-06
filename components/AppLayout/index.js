import React from 'react'
import styles from './styles.module.css'

const AppLayout = ({ children }) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default AppLayout
