function TaskItem({ task, isSelected, onSelect, onToggleComplete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggleComplete(task)}
        aria-label={`Mark ${task.title} as ${
          task.status === 'completed' ? 'to-do' : 'completed'
        }`}
      />

      <button
        type="button"
        onClick={() => onSelect(task.id)}
        aria-pressed={isSelected}
      >
        {task.title}
      </button>

      <span>{task.status}</span>
    </li>
  )
}

export default TaskItem
