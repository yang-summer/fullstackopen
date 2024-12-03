const Filter = ({ valueOfFilter, onFilterChange }) => {
  return (
    <div>
      filter shown with: 
      <input 
        value={valueOfFilter}
        onChange={onFilterChange}
      />
    </div>
  )
}

export default Filter