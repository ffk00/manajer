import { useState } from 'react'
import { Plus } from 'lucide-react'
import { createSubtask } from '../utils/createSubtask'
import SubtaskItem from './SubtaskItem'

function SubtaskList({ subtasks, onAdd, onUpdate, onToggle, onDelete }) {
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const subtask = createSubtask(title)

    if (!subtask) {
      setTitle('')
      return
    }

    onAdd(subtask)
    setTitle('')
  }

  return (
    <section className="subtask-list" aria-labelledby="subtasks-heading">
      <h3 id="subtasks-heading">Subtasks</h3>

      <form onSubmit={handleSubmit}>
        <input
          id="new-subtask"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What is the next subtask?"
        />
        <button className="button--primary" type="submit">
          <Plus aria-hidden="true" size={17} />
          Add
        </button>
      </form>

      {subtasks.length === 0 ? (
        <p>No subtasks yet.</p>
      ) : (
        <ul>
          {subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onUpdate={onUpdate}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default SubtaskList
