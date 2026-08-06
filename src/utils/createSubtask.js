export function createSubtask(title) {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return null
  }

  return {
    id: crypto.randomUUID(),
    title: trimmedTitle,
    completed: false,
  }
}
