import { useEffect, useState } from 'react'
import phonebookServices from './services/phonebookServices'
import Numbers from './components/Numbers'
import NewPersonForm from './components/NewPersonForm'
import SearchFilter from './components/SearchFilter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    phonebookServices
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }, [])

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
    phonebookServices
      .create(personObj)
      .then(newPerson => setPersons(persons.concat(newPerson)))
  }

  const removePerson = id => {
    phonebookServices.remove(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const filterPersons = () => persons.filter(p => p.name.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchString={searchString} setSearchString={setSearchString} />
      <h2>Add new</h2>
      <NewPersonForm callback={addPerson} />
      <h2>Numbers</h2>
      <Numbers persons={filterPersons()} handleRemoveClicked={removePerson} />
    </div>
  )
}

export default App