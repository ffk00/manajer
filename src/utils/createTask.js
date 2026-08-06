export function createTask(title) {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return null
  }

  const timestamp = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: trimmedTitle,
    description: '',
    status: 'todo',
    deadline: null,
    subtasks: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}
