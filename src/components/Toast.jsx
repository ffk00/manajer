function Toast({ toast, onClose }) {
  if (!toast) {
    return null
  }

  return (
    <aside className="toast" role="status" aria-atomic="true">
      <div className="toast__content">
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>

      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        Close
      </button>
    </aside>
  )
}

export default Toast
