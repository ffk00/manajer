function TaskImport({ isImporting, message, messageType, onImport }) {
  return (
    <section className="task-import" aria-label="Import sample tasks">
      <button type="button" disabled={isImporting} onClick={onImport}>
        {isImporting ? 'Importing…' : 'Import sample tasks'}
      </button>

      {message && (
        <p
          className={`task-import__message task-import__message--${messageType}`}
          role={messageType === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}
    </section>
  )
}

export default TaskImport
