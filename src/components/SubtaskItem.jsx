import { useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'

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
              <button className="button--primary" type="submit" aria-label="Save subtask">
                <Check aria-hidden="true" size={16} />
                Save
              </button>
              <button type="button" onClick={handleCancel}>
                <X aria-hidden="true" size={16} />
                Cancel
              </button>
              <button className="button--danger" type="button" onClick={() => onDelete(subtask.id)}>
                <Trash2 aria-hidden="true" size={16} />
                Delete
              </button>
            </div>
          </form>
        ) : (
          <div className="subtask-summary">
            <span>{subtask.title}</span>

            <div className="subtask-actions">
              <button type="button" onClick={() => setIsEditing(true)}>
                <Pencil aria-hidden="true" size={16} />
                Edit
              </button>
              <button className="button--danger" type="button" onClick={() => onDelete(subtask.id)}>
                <Trash2 aria-hidden="true" size={16} />
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
