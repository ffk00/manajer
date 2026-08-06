import { useState } from 'react'
import SubtaskList from './SubtaskList'

function createDraft(task) {
  return {
    title: task.title,
    description: task.description,
    deadline: task.deadline ?? '',
  }
}

function TaskEditor({
  task,
  onSave,
  onDelete,
  onStatusChange,
  onAddSubtask,
  onUpdateSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) {
  const [draft, setDraft] = useState(() => createDraft(task))

  function updateField(event) {
    const { name, value } = event.target

    setDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = draft.title.trim()

    if (!trimmedTitle) {
      return
    }

    onSave(task.id, {
      ...draft,
      title: trimmedTitle,
      deadline: draft.deadline || null,
    })
  }

  function handleCancel() {
    setDraft(createDraft(task))
  }

  return (
    <aside className="task-editor" aria-label="Task details">
      <h2>Task details</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={draft.title}
          onChange={updateField}
        />

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={draft.description}
          onChange={updateField}
        />

        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          name="status"
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
        >
          <option value="todo">To-do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>

        <label htmlFor="task-deadline">Deadline</label>
        <input
          id="task-deadline"
          name="deadline"
          type="date"
          value={draft.deadline}
          onChange={updateField}
        />

        <div className="editor-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="danger-button"
            type="button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </form>

      <SubtaskList
        subtasks={task.subtasks}
        onAdd={(subtask) => onAddSubtask(task.id, subtask)}
        onUpdate={(subtaskId, changes) =>
          onUpdateSubtask(task.id, subtaskId, changes)
        }
        onToggle={(subtask) => onToggleSubtask(task.id, subtask)}
        onDelete={(subtaskId) => onDeleteSubtask(task.id, subtaskId)}
      />
    </aside>
  )
}

export default TaskEditor
