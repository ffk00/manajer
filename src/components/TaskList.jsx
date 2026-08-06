import TaskItem from './TaskItem'

function TaskList({ tasks, selectedTaskId, onSelect, onToggleComplete }) {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={task.id === selectedTaskId}
          onSelect={onSelect}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  )
}

export default TaskList
