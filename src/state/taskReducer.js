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

    case 'task/deleted':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        selectedTaskId:
          state.selectedTaskId === action.payload
            ? null
            : state.selectedTaskId,
      }

    default:
      return state
  }
}
