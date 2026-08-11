import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import EmptyState from './EmptyState'
import TaskItem from './TaskItem'

function TaskList({
  tasks,
  selectedTaskId,
  onSelect,
  onToggleComplete,
  onReorder,
  canReorder = true,
  isFiltered = false,
  onClearFilters,
}) {
  if (tasks.length === 0) {
    return <EmptyState isFiltered={isFiltered} onClearFilters={onClearFilters} />
  }

  const today = new Date()

  function handleDragEnd(event) {
    if (event.canceled || !canReorder) {
      return
    }

    const { source } = event.operation

    if (isSortable(source) && source.initialIndex !== source.index) {
      onReorder(source.initialIndex, source.index)
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            today={today}
            isSelected={task.id === selectedTaskId}
            canReorder={canReorder}
            onSelect={onSelect}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default TaskList
