import { useEffect, useReducer, useState } from 'react'
import { fetchDummyTodos } from './api/dummyJson'
import QuickAdd from './components/QuickAdd'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import TaskEditor from './components/TaskEditor'
import TaskImport from './components/TaskImport'
import TaskList from './components/TaskList'
import Toast from './components/Toast'
import { useDeadlineNotifications } from './hooks/useDeadlineNotifications'
import { initialTaskState, taskReducer } from './state/taskReducer'
import { toTasks } from './utils/dummyTodoAdapter'
import { filterTasks } from './utils/taskFilters'
import { loadTasks, saveTasks } from './utils/storage'
import './App.css'

function initializeTaskState(initialState) {
  return {
    ...initialState,
    tasks: loadTasks(),
  }
}

function App() {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    initializeTaskState,
  )
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [taskImport, setTaskImport] = useState({
    isImporting: false,
    message: '',
    messageType: 'success',
  })
  const { toast, dismissToast } = useDeadlineNotifications(state.tasks)

  useEffect(() => {
    saveTasks(state.tasks)
  }, [state.tasks])

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

  function handleReorderTask(fromIndex, toIndex) {
    dispatch({
      type: 'task/reordered',
      payload: { fromIndex, toIndex },
    })
  }

  async function handleImportTasks() {
    setTaskImport({
      isImporting: true,
      message: '',
      messageType: 'success',
    })

    try {
      const response = await fetchDummyTodos()
      const importedTasks = toTasks(response)

      if (importedTasks.length === 0) {
        throw new Error('DummyJSON did not return any valid tasks.')
      }

      dispatch({
        type: 'tasks/imported',
        payload: importedTasks,
      })

      setTaskImport({
        isImporting: false,
        message: `${importedTasks.length} sample tasks imported.`,
        messageType: 'success',
      })
    } catch (error) {
      setTaskImport({
        isImporting: false,
        message:
          error instanceof Error
            ? error.message
            : 'Could not import sample tasks.',
        messageType: 'error',
      })
    }
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
    <>
      <main className="app-shell">
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <section className="task-workspace" aria-label="Task workspace">
          <header className="workspace-toolbar">
            <QuickAdd onAddTask={handleAddTask} />
            <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          </header>

          <TaskImport
            isImporting={taskImport.isImporting}
            message={taskImport.message}
            messageType={taskImport.messageType}
            onImport={handleImportTasks}
          />

          <TaskList
            tasks={visibleTasks}
            selectedTaskId={state.selectedTaskId}
            onSelect={handleSelectTask}
            onToggleComplete={handleToggleComplete}
            onReorder={handleReorderTask}
            canReorder={!hasActiveSearchOrFilter}
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
          <aside className="task-editor task-editor--empty">
            <p>Select a task to view its details.</p>
          </aside>
        )}
      </main>

      <Toast toast={toast} onClose={dismissToast} />
    </>
  )
}

export default App
