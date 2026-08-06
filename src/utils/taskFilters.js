export function filterTasks(tasks, statusFilter, searchQuery) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter

    if (!matchesStatus) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const matchesTask = [task.title, task.description].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    )

    const matchesSubtask = task.subtasks.some((subtask) =>
      subtask.title.toLowerCase().includes(normalizedQuery),
    )

    return matchesTask || matchesSubtask
  })
}
