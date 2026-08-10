import { useEffect, useReducer } from 'react'
import { initialTaskState, taskReducer } from '../state/taskReducer'
import { loadTasks, saveTasks } from '../utils/storage'

function initializeTaskState(initialState) {
  return {
    ...initialState,
    tasks: loadTasks(),
  }
}

export function useTaskManager() {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    initializeTaskState,
  )

  useEffect(() => {
    saveTasks(state.tasks)
  }, [state.tasks])

  function addTask(task) {
    dispatch({
      type: 'task/added',
      payload: task,
    })
  }

  function importTasks(tasks) {
    dispatch({
      type: 'tasks/imported',
      payload: tasks,
    })
  }

  function selectTask(taskId) {
    dispatch({
      type: 'task/selected',
      payload: taskId,
    })
  }

  function updateTask(taskId, changes) {
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

  function deleteTask(taskId) {
    dispatch({
      type: 'task/deleted',
      payload: taskId,
    })
  }

  function toggleTaskComplete(task) {
    updateTask(task.id, {
      status: task.status === 'completed' ? 'todo' : 'completed',
    })
  }

  function reorderTask(fromIndex, toIndex) {
    dispatch({
      type: 'task/reordered',
      payload: { fromIndex, toIndex },
    })
  }

  function addSubtask(taskId, subtask) {
    dispatch({
      type: 'subtask/added',
      payload: {
        taskId,
        subtask,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  function updateSubtask(taskId, subtaskId, changes) {
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

  function toggleSubtask(taskId, subtask) {
    updateSubtask(taskId, subtask.id, {
      completed: !subtask.completed,
    })
  }

  function deleteSubtask(taskId, subtaskId) {
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

  return {
    tasks: state.tasks,
    selectedTask,
    selectedTaskId: state.selectedTaskId,
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
  }
}
