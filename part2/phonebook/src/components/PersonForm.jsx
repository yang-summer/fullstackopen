const PersonForm = ({
  valueOfNewName, 
  valueOfNewNumber, 
  onNameChange, 
  onNumberChange, 
  onAddPerson,
}) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name: 
        <input 
          value={valueOfNewName} 
          onChange={onNameChange}
        />
      </div>
      <div>
        number: 
        <input 
          value={valueOfNewNumber} 
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm