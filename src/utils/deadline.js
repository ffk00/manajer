import { parseDateParts } from './date.js'

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

// deadline indicator logic is:
// < 0 is past. ===0 today. ===1 tomorrow
// <== APPROACHING_DAYS is approaching
// >== APPROACHING_DAYS is upcoming
export const APPROACHING_DAYS = 3

function toDayNumber({ year, month, day }) {
  return Date.UTC(year, month - 1, day) / MILLISECONDS_PER_DAY
}

function getLocalDateParts(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

export function getDeadlineInfo(task, today = new Date()) {
  if (
    !task.deadline ||
    task.status === 'completed' ||
    task.status === 'canceled'
  ) {
    return null
  }

  const deadlineParts = parseDateParts(task.deadline)

  if (!deadlineParts) {
    return null
  }

  const deadlineDay = toDayNumber(deadlineParts)
  const todayDay = toDayNumber(getLocalDateParts(today))
  const daysUntil = deadlineDay - todayDay

  if (daysUntil < 0) {
    return { state: 'overdue', daysUntil }
  }

  if (daysUntil === 0) {
    return { state: 'today', daysUntil }
  }

  if (daysUntil <= APPROACHING_DAYS) {
    return { state: 'approaching', daysUntil }
  }

  return { state: 'upcoming', daysUntil }
}

export function getDeadlineLabel(info, deadline) {
  if (info.state === 'overdue') {
    const daysOverdue = Math.abs(info.daysUntil)

    return daysOverdue === 1
      ? 'Overdue by 1 day'
      : `Overdue by ${daysOverdue} days`
  }

  if (info.state === 'today') {
    return 'Due today'
  }

  if (info.state === 'approaching') {
    return info.daysUntil === 1
      ? 'Due tomorrow'
      : `Due in ${info.daysUntil} days`
  }

  const dateParts = parseDateParts(deadline)

  if (!dateParts) {
    return ''
  }

  const localDate = new Date(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
  )

  return localDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
