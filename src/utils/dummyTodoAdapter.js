export function toTask(dummyTodo, timestamp = new Date().toISOString()) {
  if (!dummyTodo || typeof dummyTodo.todo !== 'string') {
    return null
  }

  const { id, todo, completed, userId } = dummyTodo
  const title = todo.trim()

  if (
    !Number.isInteger(id) ||
    !title ||
    typeof completed !== 'boolean' ||
    !Number.isInteger(userId)
  ) {
    return null
  }

  return {
    id: crypto.randomUUID(),
    title,
    description: `Imported from DummyJSON todo ${id}, user ${userId}`,
    status: completed ? 'completed' : 'todo',
    deadline: null,
    subtasks: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

export function toTasks(response) {
  if (!Array.isArray(response?.todos)) {
    return []
  }

  const timestamp = new Date().toISOString()

  return response.todos
    .map((todo) => toTask(todo, timestamp))
    .filter((task) => task !== null)
}
