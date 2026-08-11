function TaskImport({ status, message, onImport }) {
  const isImporting = status === 'loading'

  return (
    <section className="task-import" aria-label="Import sample tasks">
      <button className="button--primary" type="button" disabled={isImporting} onClick={onImport}>
        <Download aria-hidden="true" size={17} />
        {isImporting ? 'Importing…' : 'Import sample tasks'}
      </button>

      {message && (
        <p
          className={`task-import__message task-import__message--${status}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}
    </section>
  )
}

export default TaskImport
import { Download } from 'lucide-react'
