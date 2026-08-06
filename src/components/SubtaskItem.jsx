import { useState } from 'react'

function SubtaskItem({ subtask, onUpdate, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(subtask.title)

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    onUpdate(subtask.id, { title: trimmedTitle })
    setIsEditing(false)
  }

  function handleCancel() {
    setTitle(subtask.title)
    setIsEditing(false)
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={subtask.completed}
        onChange={() => onToggle(subtask)}
        aria-label={`Mark ${subtask.title} as ${
          subtask.completed ? 'incomplete' : 'complete'
        }`}
      />

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor={`subtask-${subtask.id}`}>Subtask title</label>
          <input
            id={`subtask-${subtask.id}`}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span>{subtask.title}</span>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}

      <button type="button" onClick={() => onDelete(subtask.id)}>
        Delete
      </button>
    </li>
  )
}

export default SubtaskItem
