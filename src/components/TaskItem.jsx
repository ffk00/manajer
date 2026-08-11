import { useSortable } from '@dnd-kit/react/sortable'
import { CalendarDays } from 'lucide-react'
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
  const isUntitled = task.title.trim().length === 0
  const taskTitle = isUntitled ? 'Untitled' : task.title
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
        aria-label={`Reorder ${taskTitle}`}
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
        aria-label={`Mark ${taskTitle} as ${
          task.status === 'completed' ? 'to-do' : 'completed'
        }`}
      />

      <button
        className={`task-item__title${
          isUntitled ? ' task-item__title--untitled' : ''
        }`}
        type="button"
        onClick={() => onSelect(task.id)}
        aria-pressed={isSelected}
      >
        {taskTitle}
      </button>

      <span className={`task-item__status task-item__status--${task.status}`}>
        {task.status.replace('_', ' ')}
      </span>

      {deadlineInfo && (
        <span
          className="task-item__deadline"
          data-deadline-state={deadlineInfo.state}
        >
          <CalendarDays aria-hidden="true" size={14} />
          {getDeadlineLabel(deadlineInfo, task.deadline)}
        </span>
      )}
    </li>
  )
}

export default TaskItem
