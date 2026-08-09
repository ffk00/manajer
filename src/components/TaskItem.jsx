import { useSortable } from '@dnd-kit/react/sortable'
import { getDeadlineInfo, getDeadlineLabel } from '../utils/deadline'

function TaskItem({
  task,
  index,
  today,
  isSelected,
  canReorder,
  onSelect,
  onToggleComplete,
}) {
  const deadlineInfo = getDeadlineInfo(task, today)
  const { ref, handleRef, isDragging } = useSortable({
    id: task.id,
    index,
    disabled: !canReorder,
  })
  const classNames = ['task-item']

  if (isSelected) {
    classNames.push('task-item--selected')
  }

  if (isDragging) {
    classNames.push('task-item--dragging')
  }

  return (
    <li ref={ref} className={classNames.join(' ')}>
      <button
        ref={handleRef}
        className="task-item__drag-handle"
        type="button"
        disabled={!canReorder}
        aria-label={`Reorder ${task.title}`}
        title={
          canReorder
            ? 'Drag to reorder'
            : 'Clear the search and select All to reorder tasks'
        }
      >
        <span aria-hidden="true">⠿</span>
      </button>

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
