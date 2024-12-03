import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('Message')
  const [messageClass, setMessageClass] = useState('common')
  const [messageTimerID, setMessageTimerID] = useState(undefined)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(
    item => 
      item.name.toLowerCase().includes(
        String(newFilter).toLowerCase()
      )
  )

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newNameObject = {
      name: String(newName),
      number: String(newNumber),
      id: String(Math.max(...persons.map(person => person.id), 0) + 1),
    }
    
    const indexExist = persons.findIndex(
      item => item.name === newNameObject.name
    )

    if(indexExist != -1) {
      const oldPerson = persons[indexExist]
      handleReplacePerson(oldPerson, newNameObject)
    } else handleCreatePerson(newNameObject)
  }

  const handleCreatePerson = (newPerson) => {
    personService
    .create(newPerson)
    .then(returnedPerson => {
      if (messageTimerID) {
        clearTimeout(messageTimerID)
        setMessageClass('common')
        setMessage(`Added ${returnedPerson.name}`)
        setMessageTimerID(setTimeout(() => {setMessage(null)}, 5000))
      } else {
        setMessageClass('common')
        setMessage(`Added ${returnedPerson.name}`)
        setMessageTimerID(setTimeout(() => {setMessage(null)}, 5000))
      }
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleReplacePerson = (oldPerson, newPerson) => {
    const whetherToReplace = window.confirm(
      `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`
    )
    if (!whetherToReplace) return;

    personService
      .update(oldPerson.id, {...newPerson, id:oldPerson.id})
      .then(returnedPerson => {
        if (messageTimerID) {
          clearTimeout(messageTimerID)
          setMessageClass('common')
          setMessage(`Updated ${returnedPerson.name}`)
          setMessageTimerID(setTimeout(() => {setMessage(null)}, 5000))
        } else {
          setMessageClass('common')
          setMessage(`Updated ${returnedPerson.name}`)
          setMessageTimerID(setTimeout(() => {setMessage(null)}, 5000))
        }
        setPersons(persons.map(person => 
          person.id === oldPerson.id ? returnedPerson : person
        ))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDeletePerson = (id) => {
    const whetherToDelete = window.confirm(
      `Delete ${persons.find((value => value.id === id)).name} ?`
    )
    if (!whetherToDelete) return;

    personService
      .deletePerson(id)
      .then(response => {
          const personsAfterDel = persons.filter(
            (person) => person.id != id
          )
          setPersons(personsAfterDel)
        }
      )
      .catch(error => {
        const personBeenDel = persons.find((value => value.id === id))
        if (messageTimerID) {
          clearTimeout(messageTimerID)
          setMessageClass('error')
          setMessage(`Information of  '${personBeenDel.name}' has already been removed from server`)
          setMessageTimerID(setTimeout(() => {setMessage(null)}, 5000))
        } else {
          setMessageClass('error')
          setMessage(`Information of  '${personBeenDel.name}' has already been removed from server`)
          setMessageTimerID(setTimeout(() => {setMessage(null)}, 5000))
        }

        const personsAfterDel = persons.filter(
          (person) => person.id != id
        )
        setPersons(personsAfterDel)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass={messageClass}/>
      <Filter 
        valueOfFilter={newFilter} 
        onFilterChange={handleFilterChange} 
      />
      <h3>Add a new</h3>
      <PersonForm 
        valueOfNewName={newName} 
        valueOfNewNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPerson={handleAddPerson} 
      />
      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow} 
        onDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
