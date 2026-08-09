export const initialTaskState = {
  tasks: [],
  selectedTaskId: null,
}

export function taskReducer(state, action) {
  switch (action.type) {
    case 'task/added':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        selectedTaskId: action.payload.id,
      }

    case 'task/selected':
      return {
        ...state,
        selectedTaskId: action.payload,
      }

    case 'task/updated':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.changes }
            : task,
        ),
      }

    case 'task/reordered': {
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
        return state
      }

      const tasks = [...state.tasks]
      const [movedTask] = tasks.splice(fromIndex, 1)
      tasks.splice(toIndex, 0, movedTask)

      return {
        ...state,
        tasks,
      }
    }

    case 'task/deleted':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        selectedTaskId:
          state.selectedTaskId === action.payload
            ? null
            : state.selectedTaskId,
      }

    case 'subtask/added':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: [...task.subtasks, action.payload.subtask],
                updatedAt: action.payload.updatedAt,
              }
            : task,
        ),
      }

    case 'subtask/updated':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === action.payload.subtaskId
                    ? { ...subtask, ...action.payload.changes }
                    : subtask,
                ),
                updatedAt: action.payload.updatedAt,
              }
            : task,
        ),
      }

    case 'subtask/deleted':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.id !== action.payload.subtaskId,
                ),
                updatedAt: action.payload.updatedAt,
              }
            : task,
        ),
      }

    default:
      return state
  }
}
