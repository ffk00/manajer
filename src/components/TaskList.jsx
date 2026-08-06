import TaskItem from './TaskItem'

function TaskList({
  tasks,
  selectedTaskId,
  onSelect,
  onToggleComplete,
  emptyMessage = 'No tasks yet.',
}) {
  if (tasks.length === 0) {
    return <p>{emptyMessage}</p>
  }

  const today = new Date()

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          today={today}
          isSelected={task.id === selectedTaskId}
          onSelect={onSelect}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  )
}

export default TaskList
