import brandLogo from '../assets/brand_logo.png'

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To-do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'canceled', label: 'Canceled' },
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
          {statusFilters.map((filter) => (
            <li key={filter.value}>
              <button
                type="button"
                onClick={() => onFilterChange(filter.value)}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
