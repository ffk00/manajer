import { useReducer } from 'react'
import QuickAdd from './components/QuickAdd'
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

  return (
    <main>
      <h1>Task Manager</h1>

      <QuickAdd onAddTask={handleAddTask} />

      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
