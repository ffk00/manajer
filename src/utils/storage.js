import { parseDateParts } from './date.js'

export const TASK_STORAGE_KEY = 'j-manager.tasks'
export const DEADLINE_NOTIFICATION_STORAGE_KEY =
  'j-manager.deadlineNotifications'

const MAX_STORED_NOTIFICATION_KEYS = 500

const VALID_STATUSES = new Set([
  'todo',
  'in_progress',
  'completed',
  'canceled',
])

function getBrowserStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidTimestamp(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isValidSubtask(subtask) {
  return (
    isRecord(subtask) &&
    typeof subtask.id === 'string' &&
    subtask.id.length > 0 &&
    typeof subtask.title === 'string' &&
    subtask.title.trim().length > 0 &&
    typeof subtask.completed === 'boolean'
  )
}

function normalizeSubtasks(subtasks) {
  const seenIds = new Set()

  return subtasks.flatMap((subtask) => {
    if (!isValidSubtask(subtask) || seenIds.has(subtask.id)) {
      return []
    }

    seenIds.add(subtask.id)

    return [
      {
        id: subtask.id,
        title: subtask.title,
        completed: subtask.completed,
      },
    ]
  })
}

function isValidTask(task) {
  return (
    isRecord(task) &&
    typeof task.id === 'string' &&
    task.id.length > 0 &&
    typeof task.title === 'string' &&
    task.title.trim().length > 0 &&
    typeof task.description === 'string' &&
    VALID_STATUSES.has(task.status) &&
    (task.deadline === null || parseDateParts(task.deadline) !== null) &&
    Array.isArray(task.subtasks) &&
    isValidTimestamp(task.createdAt) &&
    isValidTimestamp(task.updatedAt)
  )
}

function normalizeTasks(tasks) {
  const seenIds = new Set()

  return tasks.flatMap((task) => {
    if (!isValidTask(task) || seenIds.has(task.id)) {
      return []
    }

    seenIds.add(task.id)

    return [
      {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        deadline: task.deadline,
        subtasks: normalizeSubtasks(task.subtasks),
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    ]
  })
}

export function loadTasks(storage = getBrowserStorage()) {
  if (!storage) {
    return []
  }

  try {
    const serializedTasks = storage.getItem(TASK_STORAGE_KEY)

    if (!serializedTasks) {
      return []
    }

    const storedTasks = JSON.parse(serializedTasks)

    return Array.isArray(storedTasks) ? normalizeTasks(storedTasks) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks, storage = getBrowserStorage()) {
  if (!storage) {
    return false
  }

  try {
    storage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch {
    return false
  }
}

function normalizeNotificationKeys(keys) {
  if (!Array.isArray(keys)) {
    return []
  }

  const uniqueKeys = new Set(
    keys.filter((key) => typeof key === 'string' && key.length > 0),
  )

  return [...uniqueKeys].slice(-MAX_STORED_NOTIFICATION_KEYS)
}

export function loadDeadlineNotificationKeys(storage = getBrowserStorage()) {
  if (!storage) {
    return []
  }

  try {
    const serializedKeys = storage.getItem(
      DEADLINE_NOTIFICATION_STORAGE_KEY,
    )

    if (!serializedKeys) {
      return []
    }

    return normalizeNotificationKeys(JSON.parse(serializedKeys))
  } catch {
    return []
  }
}

export function saveDeadlineNotificationKeys(
  keys,
  storage = getBrowserStorage(),
) {
  if (!storage) {
    return false
  }

  try {
    storage.setItem(
      DEADLINE_NOTIFICATION_STORAGE_KEY,
      JSON.stringify(normalizeNotificationKeys(keys)),
    )
    return true
  } catch {
    return false
  }
}
