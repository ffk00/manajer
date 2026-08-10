import { useState } from 'react'
import { fetchDummyTodos } from '../api/dummyJson'
import { toTasks } from '../utils/dummyTodoAdapter'

const initialImportState = {
  status: 'idle',
  message: '',
}

export function useTaskImport(onTasksImported) {
  const [importState, setImportState] = useState(initialImportState)

  async function importSampleTasks() {
    setImportState({
      status: 'loading',
      message: '',
    })

    try {
      const response = await fetchDummyTodos()
      const importedTasks = toTasks(response)

      if (importedTasks.length === 0) {
        throw new Error('DummyJSON did not return any valid tasks.')
      }

      onTasksImported(importedTasks)

      setImportState({
        status: 'success',
        message: `${importedTasks.length} sample tasks imported.`,
      })
    } catch (error) {
      setImportState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Could not import sample tasks.',
      })
    }
  }

  return {
    ...importState,
    importSampleTasks,
  }
}
