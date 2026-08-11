function Toast({ toast, onClose }) {
  if (!toast) {
    return null
  }

  return (
    <aside className="toast" role="status" aria-atomic="true">
      <span className="toast__icon" aria-hidden="true">
        <Bell size={18} strokeWidth={2} />
      </span>

      <div className="toast__content">
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>

      <button className="toast__dismiss" type="button" onClick={onClose} aria-label="Dismiss notification">
        <X aria-hidden="true" size={18} />
      </button>
    </aside>
  )
}

export default Toast
import { Bell, X } from 'lucide-react'
