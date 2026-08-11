import brandLogo from '../assets/brand_logo.png'
import { CheckCircle2, Circle, Clock3, Inbox, XCircle } from 'lucide-react'

const statusFilters = [
  { value: 'all', label: 'All', icon: Inbox },
  { value: 'todo', label: 'To-do', icon: Circle },
  { value: 'in_progress', label: 'In Progress', icon: Clock3 },
  { value: 'completed', label: 'Completed', icon: CheckCircle2 },
  { value: 'canceled', label: 'Canceled', icon: XCircle },
]

function Sidebar({ activeFilter, onFilterChange }) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__brand">
        <img src={brandLogo} alt="J Manager" />
      </h1>

      <nav aria-label="Task status filters">
        <h2>Tasks</h2>

        <ul>
          {statusFilters.map(({ value, label, icon: Icon }) => (
            <li key={value}>
              <button
                className={`sidebar__filter sidebar__filter--${value}`}
                type="button"
                onClick={() => onFilterChange(value)}
                aria-pressed={activeFilter === value}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={2} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
