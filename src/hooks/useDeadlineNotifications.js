import { useEffect, useRef, useState } from 'react'
import {
  createDeadlineToast,
  getPendingDeadlineNotifications,
} from '../utils/deadlineNotification.js'
import {
  loadDeadlineNotificationKeys,
  saveDeadlineNotificationKeys,
} from '../utils/storage.js'

const DEADLINE_CHECK_INTERVAL = 60 * 60 * 1000
const TOAST_DURATION = 5000

export function useDeadlineNotifications(tasks) {
  const notifiedKeysRef = useRef(null)

  if (notifiedKeysRef.current === null) {
    notifiedKeysRef.current = new Set(loadDeadlineNotificationKeys())
  }

  const [toast, setToast] = useState(null)

  useEffect(() => {
    function checkDeadlines() {
      const notifications = getPendingDeadlineNotifications(
        tasks,
        notifiedKeysRef.current,
      )

      if (notifications.length === 0) {
        return
      }

      notifications.forEach(({ key }) => {
        notifiedKeysRef.current.add(key)
      })
      saveDeadlineNotificationKeys([...notifiedKeysRef.current])
      setToast(createDeadlineToast(notifications))
    }

    checkDeadlines()

    const intervalId = window.setInterval(
      checkDeadlines,
      DEADLINE_CHECK_INTERVAL,
    )

    return () => window.clearInterval(intervalId)
  }, [tasks])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null)
    }, TOAST_DURATION)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  return {
    toast,
    dismissToast: () => setToast(null),
  }
}
