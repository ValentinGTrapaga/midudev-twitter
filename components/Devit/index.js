import React from 'react'
import Avatar from '../Avatar'
import styles from './styles.module.css'
import { useTimeago } from '../../hooks/useTimeago'

export const Devit = ({ avatar, username, message, id, createdAt }) => {
  const timeago = useTimeago(createdAt)

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
          {username} <span className={styles.dateSpan}> - {timeago}</span>
        </strong>
        <p className={styles.devitMessage}>{message}</p>
      </section>
    </article>
  )
}
