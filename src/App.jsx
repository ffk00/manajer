import { useReducer, useState } from 'react'
import QuickAdd from './components/QuickAdd'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import TaskEditor from './components/TaskEditor'
import TaskList from './components/TaskList'
import { initialTaskState, taskReducer } from './state/taskReducer'
import { filterTasks } from './utils/taskFilters'
import './App.css'

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  function handleAddSubtask(taskId, subtask) {
    dispatch({
      type: 'subtask/added',
      payload: {
        taskId,
        subtask,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  function handleUpdateSubtask(taskId, subtaskId, changes) {
    dispatch({
      type: 'subtask/updated',
      payload: {
        taskId,
        subtaskId,
        changes,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  function handleToggleSubtask(taskId, subtask) {
    handleUpdateSubtask(taskId, subtask.id, {
      completed: !subtask.completed,
    })
  }

  function handleDeleteSubtask(taskId, subtaskId) {
    dispatch({
      type: 'subtask/deleted',
      payload: {
        taskId,
        subtaskId,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  const selectedTask =
    state.tasks.find((task) => task.id === state.selectedTaskId) ?? null
  const visibleTasks = filterTasks(state.tasks, activeFilter, searchQuery)
  const hasActiveSearchOrFilter =
    activeFilter !== 'all' || searchQuery.trim() !== ''

  return (
    <main>
      <h1>Task Manager</h1>

      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <section aria-label="Task workspace">
        <QuickAdd onAddTask={handleAddTask} />
        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

        <TaskList
          tasks={visibleTasks}
          selectedTaskId={state.selectedTaskId}
          onSelect={handleSelectTask}
          onToggleComplete={handleToggleComplete}
          emptyMessage={
            hasActiveSearchOrFilter ? 'No matching tasks.' : 'No tasks yet.'
          }
        />
      </section>

      {selectedTask ? (
        <TaskEditor
          key={selectedTask.id}
          task={selectedTask}
          onSave={handleUpdateTask}
          onDelete={handleDeleteTask}
          onStatusChange={(taskId, status) =>
            handleUpdateTask(taskId, { status })
          }
          onAddSubtask={handleAddSubtask}
          onUpdateSubtask={handleUpdateSubtask}
          onToggleSubtask={handleToggleSubtask}
          onDeleteSubtask={handleDeleteSubtask}
        />
      ) : (
        <p>Select a task to view its details.</p>
      )}
    </main>
  )
}

export default App
