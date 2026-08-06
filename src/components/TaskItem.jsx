function TaskItem({ task, isSelected, onSelect, onToggleComplete }) {
  return (
    <li className={isSelected ? 'task-item task-item--selected' : 'task-item'}>
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggleComplete(task)}
        aria-label={`Mark ${task.title} as ${
          task.status === 'completed' ? 'to-do' : 'completed'
        }`}
      />

      <button
        className="task-item__title"
        type="button"
        onClick={() => onSelect(task.id)}
        aria-pressed={isSelected}
      >
        {task.title}
      </button>

      <span className="task-item__status">{task.status}</span>
    </li>
  )
}

export default TaskItem
