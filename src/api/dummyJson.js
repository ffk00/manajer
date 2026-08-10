const DUMMY_JSON_TODOS_URL = 'https://dummyjson.com/todos/random/5'

export async function fetchDummyTodos() {
  const response = await fetch(DUMMY_JSON_TODOS_URL)

  if (!response.ok) {
    throw new Error(`DummyJSON request failed with status ${response.status}`)
  }

  const data = await response.json()
  // Random endpoints return an array directly; list endpoints wrap it in `todos`.
  const todos = Array.isArray(data) ? data : data?.todos

  if (!Array.isArray(todos)) {
    throw new Error('DummyJSON returned an invalid todos response')
  }

  return { todos }
}
