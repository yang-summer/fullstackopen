const Person = ({ person }) => {
  return (
      <p>
        {person.name} {person.number}
      </p>
  )
}

const ButtonDel = ({id, onDeletePerson}) => {
  return (
    <button onClick={() => onDeletePerson(id)}>
      delete
    </button>
  )
}

const Persons = ({ persons, onDeletePerson}) => {
  return (
    <div>
      {persons.map(person => (       
          <div key={person.id} style={{display: 'flex'}}>
            <Person person={person} />          
            <ButtonDel 
              id={person.id}
              onDeletePerson={onDeletePerson}
            />
          </div>
        )
      )}
    </div>
  )
}

export default Persons