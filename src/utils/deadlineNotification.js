import { getDeadlineInfo, getDeadlineLabel } from './deadline.js'

const NOTIFIABLE_STATES = new Set(['approaching', 'today', 'overdue'])

export function createDeadlineNotificationKey(task, deadlineInfo) {
  return `${task.id}:${task.deadline}:${deadlineInfo.state}`
}

export function getPendingDeadlineNotifications(
  tasks,
  notifiedKeys,
  today = new Date(),
) {
  return tasks.flatMap((task) => {
    const deadlineInfo = getDeadlineInfo(task, today)

    if (!deadlineInfo || !NOTIFIABLE_STATES.has(deadlineInfo.state)) {
      return []
    }

    const key = createDeadlineNotificationKey(task, deadlineInfo)

    return notifiedKeys.has(key) ? [] : [{ key, task, deadlineInfo }]
  })
}

export function createDeadlineToast(notifications) {
  if (notifications.length === 0) {
    return null
  }

  if (notifications.length === 1) {
    const { task, deadlineInfo } = notifications[0]
    const deadlineLabel = getDeadlineLabel(deadlineInfo, task.deadline)

    return {
      title: 'Deadline reminder',
      message: `${task.title}: ${deadlineLabel}.`,
    }
  }

  const visibleTitles = notifications
    .slice(0, 2)
    .map(({ task }) => task.title)
    .join(', ')
  const remainingCount = notifications.length - 2
  const remainingMessage =
    remainingCount > 0 ? ` and ${remainingCount} more` : ''

  return {
    title: `${notifications.length} deadline reminders`,
    message: `${visibleTitles}${remainingMessage}.`,
  }
}
