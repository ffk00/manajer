import { useReducer } from 'react'
import QuickAdd from './components/QuickAdd'
import TaskEditor from './components/TaskEditor'
import TaskList from './components/TaskList'
import { initialTaskState, taskReducer } from './state/taskReducer'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)

  function handleAddTask(task) {
    dispatch({
      type: 'task/added',
      payload: task,
    })
  }

  function handleSelectTask(taskId) {
    dispatch({
      type: 'task/selected',
      payload: taskId,
    })
  }

  function handleUpdateTask(taskId, changes) {
    dispatch({
      type: 'task/updated',
      payload: {
        id: taskId,
        changes: {
          ...changes,
          updatedAt: new Date().toISOString(),
        },
      },
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'task/deleted',
      payload: taskId,
    })
  }

  function handleToggleComplete(task) {
    handleUpdateTask(task.id, {
      status: task.status === 'completed' ? 'todo' : 'completed',
    })
  }

  const selectedTask =
    state.tasks.find((task) => task.id === state.selectedTaskId) ?? null

  return (
    <main>
      <h1>Task Manager</h1>

      <QuickAdd onAddTask={handleAddTask} />

      <TaskList
        tasks={state.tasks}
        selectedTaskId={state.selectedTaskId}
        onSelect={handleSelectTask}
        onToggleComplete={handleToggleComplete}
      />

      {selectedTask ? (
        <TaskEditor
          key={selectedTask.id}
          task={selectedTask}
          onSave={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      ) : (
        <p>Select a task to view its details.</p>
      )}
    </main>
  )
}

export default App
