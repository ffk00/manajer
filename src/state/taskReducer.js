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

    default:
      return state
  }
}
