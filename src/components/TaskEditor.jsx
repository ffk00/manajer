import SubtaskList from './SubtaskList'

function EmptyEditorPanel() {
  return (
    <aside className="task-editor task-editor--empty">
      <p>Select a task to view its details.</p>
    </aside>
  )
}

function TaskEditor({
  task,
  onSave,
  onDelete,
  onAddSubtask,
  onUpdateSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}) {
  if (!task) {
    return <EmptyEditorPanel />
  }

  function updateField(event) {
    const { name, value } = event.target

    onSave(task.id, {
      [name]: name === 'deadline' ? value || null : value,
    })
  }

  function trimTitle() {
    const title = task.title.trim()

    if (title !== task.title) {
      onSave(task.id, { title })
    }
  }

  return (
    <aside className="task-editor" aria-label="Task details">
      <h2>Task details</h2>

      <div className="task-editor__fields">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={task.title}
          placeholder="Untitled"
          onChange={updateField}
          onBlur={trimTitle}
        />

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          value={task.description}
          onChange={updateField}
        />

        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          name="status"
          value={task.status}
          onChange={updateField}
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
          value={task.deadline ?? ''}
          onChange={updateField}
        />

        <div className="editor-actions">
          <button
            className="danger-button"
            type="button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>

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
