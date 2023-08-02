import { useState } from 'react'
import Numbers from './components/Numbers'
import NewPersonForm from './components/NewPersonForm'
import SearchFilter from './components/SearchFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [searchString, setSearchString] = useState("")

  const addPerson = (personObj) => {
    const isValidPersonObject = (obj) => Object.hasOwn(obj, "name") //probably not the most bulletproof plan 
    if (!isValidPersonObject(personObj)) {
      console.log("not a valid person object")
      return
    }
    if (persons.some(p => p.name === personObj.name)) {
      alert(`${personObj.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObj))
  }

  const filterPersons = () => persons.filter(p => p.name.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchString={searchString} setSearchString={setSearchString} />
      <h2>Add new</h2>
      <NewPersonForm callback={addPerson} />
      <h2>Numbers</h2>
      <Numbers persons={filterPersons()} />
    </div>
  )
}

export default App