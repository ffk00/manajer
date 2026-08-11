import { useDispatch, useSelector } from 'react-redux'
import {
  selectSelectedTaskId,
  selectTasks,
  subtaskAdded,
  subtaskDeleted,
  subtaskUpdated,
  taskAdded,
  taskDeleted,
  taskReordered,
  taskSelected,
  taskUpdated,
  tasksImported,
} from '../state/tasksSlice'

export function useTaskManager() {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)
  const selectedTaskId = useSelector(selectSelectedTaskId)

  function addTask(task) {
    dispatch(taskAdded(task))
  }

  function importTasks(importedTasks) {
    dispatch(tasksImported(importedTasks))
  }

  function selectTask(taskId) {
    dispatch(taskSelected(taskId))
  }

  function updateTask(taskId, changes) {
    dispatch(
      taskUpdated({
        id: taskId,
        changes: {
          ...changes,
          updatedAt: new Date().toISOString(),
        },
      }),
    )
  }

  function deleteTask(taskId) {
    dispatch(taskDeleted(taskId))
  }

  function toggleTaskComplete(task) {
    updateTask(task.id, {
      status: task.status === 'completed' ? 'todo' : 'completed',
    })
  }

  function reorderTask(fromIndex, toIndex) {
    dispatch(taskReordered({ fromIndex, toIndex }))
  }

  function addSubtask(taskId, subtask) {
    dispatch(
      subtaskAdded({
        taskId,
        subtask,
        updatedAt: new Date().toISOString(),
      }),
    )
  }

  function updateSubtask(taskId, subtaskId, changes) {
    dispatch(
      subtaskUpdated({
        taskId,
        subtaskId,
        changes,
        updatedAt: new Date().toISOString(),
      }),
    )
  }

  function toggleSubtask(taskId, subtask) {
    updateSubtask(taskId, subtask.id, {
      completed: !subtask.completed,
    })
  }

  function deleteSubtask(taskId, subtaskId) {
    dispatch(
      subtaskDeleted({
        taskId,
        subtaskId,
        updatedAt: new Date().toISOString(),
      }),
    )
  }

  const selectedTask =
    tasks.find((task) => task.id === selectedTaskId) ?? null

  return {
    tasks,
    selectedTask,
    selectedTaskId,
    actions: {
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
    },
  }
}
