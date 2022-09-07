import React from 'react'
import Avatar from '../Avatar'
import styles from './styles.module.css'

export const Devit = ({ avatar, username, message, id, createdAt }) => {
  console.log(createdAt)
  return (
    <article
      key={id}
      className={styles.devitArticle}>
      <div className={styles.avatarDiv}>
        <Avatar
          alt={username}
          src={avatar}
        />
      </div>
      <section>
        <strong>
          {username} <span className={styles.dateSpan}> - {createdAt}</span>
        </strong>
        <p className={styles.devitMessage}>{message}</p>
      </section>
    </article>
  )
}
