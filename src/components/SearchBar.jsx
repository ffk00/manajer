import { Search } from 'lucide-react'

function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-bar" role="search">
      <label htmlFor="task-search">Search tasks</label>
      <div className="search-bar__field">
        <Search aria-hidden="true" size={17} />
        <input
          id="task-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search tasks and subtasks"
        />
      </div>
    </div>
  )
}

export default SearchBar
