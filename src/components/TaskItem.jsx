import { getDeadlineInfo, getDeadlineLabel } from '../utils/deadline'

function TaskItem({ task, today, isSelected, onSelect, onToggleComplete }) {
  const deadlineInfo = getDeadlineInfo(task, today)

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

      {deadlineInfo && (
        <span
          className="task-item__deadline"
          data-deadline-state={deadlineInfo.state}
        >
          {getDeadlineLabel(deadlineInfo, task.deadline)}
        </span>
      )}
    </li>
  )
}

export default TaskItem
