import { useState } from 'react'
import QuickAdd from './components/QuickAdd'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import TaskEditor from './components/TaskEditor'
import TaskImport from './components/TaskImport'
import TaskList from './components/TaskList'
import Toast from './components/Toast'
import { useDeadlineNotifications } from './hooks/useDeadlineNotifications'
import { useTaskImport } from './hooks/useTaskImport'
import { useTaskManager } from './hooks/useTaskManager'
import { filterTasks } from './utils/taskFilters'
import './App.css'

function App() {
  const {
    tasks,
    selectedTask,
    selectedTaskId,
    addTask,
    importTasks,
    selectTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    reorderTask,
    addSubtask,
    updateSubtask,
    toggleSubtask,
    deleteSubtask,
  } = useTaskManager()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const {
    status: importStatus,
    message: importMessage,
    importSampleTasks,
  } = useTaskImport(importTasks)
  const { toast, dismissToast } = useDeadlineNotifications(tasks)

  const visibleTasks = filterTasks(tasks, activeFilter, searchQuery)
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
            <QuickAdd onAddTask={addTask} />
            <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          </header>

          <TaskImport
            status={importStatus}
            message={importMessage}
            onImport={importSampleTasks}
          />

          <TaskList
            tasks={visibleTasks}
            selectedTaskId={selectedTaskId}
            onSelect={selectTask}
            onToggleComplete={toggleTaskComplete}
            onReorder={reorderTask}
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
            onSave={updateTask}
            onDelete={deleteTask}
            onStatusChange={(taskId, status) =>
              updateTask(taskId, { status })
            }
            onAddSubtask={addSubtask}
            onUpdateSubtask={updateSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
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
