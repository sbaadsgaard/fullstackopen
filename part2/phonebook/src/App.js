import { useEffect, useState } from 'react'
import phonebookServices from './services/phonebookServices'
import Numbers from './components/Numbers'
import NewPersonForm from './components/NewPersonForm'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [searchString, setSearchString] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    phonebookServices
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }, [])



  const showNotification = (message, type) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 3000);
  }

  const addPerson = (personObject) => {
    const isValidPersonObject = (obj) => Object.hasOwn(obj, "name") //probably not the most bulletproof plan 
    if (!isValidPersonObject(personObject)) {
      console.log("not a valid person object")
      return
    }
    if (persons.some(p => p.name === personObject.name)) {
      if (window.confirm(`${personObject.name} is already added to phonebook. Replace the old number with a new one?`)) {

        const id = persons.find(p => p.name === personObject.name).id
        phonebookServices
          .update(id, personObject)
          .then(updatedperson => {
            showNotification(`Updated ${updatedperson.name}`, "info")
            setPersons(persons.map(p => p.id !== updatedperson.id ? p : updatedperson))
          })
          .catch(err => {
            showNotification(err.response.data.error, "error")
          })
      }
    } else {
      phonebookServices
        .create(personObject)
        .then(newPerson => {
          showNotification(`Added ${personObject.name}`, "info")
          setPersons(persons.concat(newPerson))
        })
        .catch(error => showNotification(error.response.data.error, "error"))
    }
  }

  const removePerson = (id, name) => {
    phonebookServices.remove(id)
      .then(() => {
        showNotification(`Removed ${name}`, "info")
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const filterPersons = () => persons.filter(p => p.name.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <SearchFilter searchString={searchString} setSearchString={setSearchString} />
      <h2>Add new</h2>
      <NewPersonForm callback={addPerson} />
      <h2>Numbers</h2>
      <Numbers persons={filterPersons()} handleRemoveClicked={removePerson} />
    </div>
  )
}

export default App