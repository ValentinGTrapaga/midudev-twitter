import { useState, useEffect } from 'react'
const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export const useTimeago = (timestamp) => {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  const { value, unit } = timeago
  // Una forma:
  // console.log(value, unit)
  // return value === 1 ? `${value} ${unit} ago` : `${value} ${unit}s ago`
  // Usando la API del navegador RelativeTimeFormat
  useEffect(() => {
    let updateInterval = 600000 // 1 hora
    if (unit === 'second') {
      updateInterval = 10000 // 10s
    } else if (unit === 'minute') {
      updateInterval = 100000 // 1 minuto
    }
    const interval = setInterval(() => {
      const newTimeago = getDateDiffs(timestamp)
      setTimeago(newTimeago)
    }, updateInterval)
    return () => clearTimeout(interval)
  }, [timestamp])
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'narrow' })
  return rtf.format(value, unit)
}
