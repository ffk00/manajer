function SearchBar({ query, onQueryChange }) {
  return (
    <div role="search">
      <label htmlFor="task-search">Search tasks</label>
      <input
        id="task-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search tasks and subtasks"
      />
    </div>
  )
}

export default SearchBar
