import { useState } from 'react'
import Numbers from './components/Numbers'
import NewPersonForm from './components/NewPersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const addPerson = (personObj) => {
    setPersons(persons.concat(personObj))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm callback={addPerson}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App