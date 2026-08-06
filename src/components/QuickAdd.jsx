import { useState } from 'react'
import { createTask } from '../utils/createTask'

function QuickAdd({ onAddTask }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const task = createTask(title)

    if (!task) {
      return
    }

    onAddTask(task)
    setTitle('')
  }

  return (
    <form className="quick-add" onSubmit={handleSubmit}>
      <label htmlFor="quick-add">Add a task</label>

      <input
        id="quick-add"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
      />

      <button type="submit">Add</button>
    </form>
  )
}

export default QuickAdd
