import { configureStore } from '@reduxjs/toolkit'
import { loadTasks, saveTasks } from '../utils/storage'
import tasksReducer, { initialTaskState } from './tasksSlice'

export const store = configureStore({
  reducer: {
    taskManager: tasksReducer,
  },
  preloadedState: {
    taskManager: {
      ...initialTaskState,
      tasks: loadTasks(),
    },
  },
})

let previousTasks = store.getState().taskManager.tasks

store.subscribe(() => {
  const tasks = store.getState().taskManager.tasks

  if (tasks !== previousTasks) {
    previousTasks = tasks
    saveTasks(tasks)
  }
})
