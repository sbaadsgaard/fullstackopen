import { useState } from 'react'
import Numbers from './components/Numbers'
import NewPersonForm from './components/NewPersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])


  const addPerson = (personObj) => {
    const isValidPersonObject = (obj) => Object.hasOwn(obj, "name") //probably not the most bulletproof plan 
    if (!isValidPersonObject(personObj)) {
      console.log("not a valid person object")
      return
    }
    if (persons.some(p => p.name === personObj.name)) {
      alert(`${personObj.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObj))
    }
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