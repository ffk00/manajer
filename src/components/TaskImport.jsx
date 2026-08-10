function TaskImport({ status, message, onImport }) {
  const isImporting = status === 'loading'

  return (
    <section className="task-import" aria-label="Import sample tasks">
      <button type="button" disabled={isImporting} onClick={onImport}>
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
