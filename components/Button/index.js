import React from 'react'
import styles from './styles.module.css'

const Button = ({ children, onClick, disabled }) => {
  return (
    <>
      <button
        disabled={disabled}
        className={styles.button}
        onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default Button
