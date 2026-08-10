import { createSlice } from '@reduxjs/toolkit'

export const initialTaskState = {
  tasks: [],
  selectedTaskId: null,
}

const tasksSlice = createSlice({
  name: 'taskManager',
  initialState: initialTaskState,
  reducers: {
    taskAdded(state, action) {
      state.tasks.push(action.payload)
      state.selectedTaskId = action.payload.id
    },

    tasksImported(state, action) {
      const existingTaskIds = new Set(state.tasks.map((task) => task.id))

      for (const task of action.payload) {
        if (!existingTaskIds.has(task.id)) {
          state.tasks.push(task)
          existingTaskIds.add(task.id)
        }
      }
    },

    taskSelected(state, action) {
      state.selectedTaskId = action.payload
    },

    taskUpdated(state, action) {
      const task = state.tasks.find(
        (candidate) => candidate.id === action.payload.id,
      )

      if (task) {
        Object.assign(task, action.payload.changes)
      }
    },

    taskReordered(state, action) {
      const { fromIndex, toIndex } = action.payload
      const lastTaskIndex = state.tasks.length - 1

      if (
        !Number.isInteger(fromIndex) ||
        !Number.isInteger(toIndex) ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex > lastTaskIndex ||
        toIndex > lastTaskIndex ||
        fromIndex === toIndex
      ) {
        return
      }

      const [movedTask] = state.tasks.splice(fromIndex, 1)
      state.tasks.splice(toIndex, 0, movedTask)
    },

    taskDeleted(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)

      if (state.selectedTaskId === action.payload) {
        state.selectedTaskId = null
      }
    },

    subtaskAdded(state, action) {
      const task = state.tasks.find(
        (candidate) => candidate.id === action.payload.taskId,
      )

      if (task) {
        task.subtasks.push(action.payload.subtask)
        task.updatedAt = action.payload.updatedAt
      }
    },

    subtaskUpdated(state, action) {
      const task = state.tasks.find(
        (candidate) => candidate.id === action.payload.taskId,
      )
      const subtask = task?.subtasks.find(
        (candidate) => candidate.id === action.payload.subtaskId,
      )

      if (task && subtask) {
        Object.assign(subtask, action.payload.changes)
        task.updatedAt = action.payload.updatedAt
      }
    },

    subtaskDeleted(state, action) {
      const task = state.tasks.find(
        (candidate) => candidate.id === action.payload.taskId,
      )

      if (task) {
        task.subtasks = task.subtasks.filter(
          (subtask) => subtask.id !== action.payload.subtaskId,
        )
        task.updatedAt = action.payload.updatedAt
      }
    },
  },
})

export const {
  taskAdded,
  tasksImported,
  taskSelected,
  taskUpdated,
  taskReordered,
  taskDeleted,
  subtaskAdded,
  subtaskUpdated,
  subtaskDeleted,
} = tasksSlice.actions

export const selectTasks = (state) => state.taskManager.tasks
export const selectSelectedTaskId = (state) =>
  state.taskManager.selectedTaskId

export default tasksSlice.reducer
