import { Inbox, SearchX } from 'lucide-react'

function EmptyState({ isFiltered, onClearFilters }) {
  const Icon = isFiltered ? SearchX : Inbox

  return (
    <section className="empty-state" aria-live="polite">
      <Icon aria-hidden="true" size={28} strokeWidth={1.75} />
      <div>
        <h2>{isFiltered ? 'No matching tasks' : 'No tasks yet'}</h2>
        <p>
          {isFiltered
            ? 'Try a different search or filter.'
            : 'Create your first task above.'}
        </p>
      </div>
      {isFiltered && (
        <button type="button" onClick={onClearFilters}>
          Clear filters
        </button>
      )}
    </section>
  )
}

export default EmptyState
