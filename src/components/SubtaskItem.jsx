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
    <li className="subtask-item">
      <input
        type="checkbox"
        checked={subtask.completed}
        onChange={() => onToggle(subtask)}
        aria-label={`Mark ${subtask.title} as ${
          subtask.completed ? 'incomplete' : 'complete'
        }`}
      />

      <div className="subtask-item__content">
        {isEditing ? (
          <form className="subtask-edit-form" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor={`subtask-${subtask.id}`}>
              Subtask title
            </label>
            <input
              id={`subtask-${subtask.id}`}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <div className="subtask-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" onClick={() => onDelete(subtask.id)}>
                Delete
              </button>
            </div>
          </form>
        ) : (
          <div className="subtask-summary">
            <span>{subtask.title}</span>

            <div className="subtask-actions">
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(subtask.id)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}

export default SubtaskItem
