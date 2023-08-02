import { useState } from 'react'


//placed form in seperate component to avoid rerendering list of numbers every keystroke.
//Using callback from parent component(App) to add the new person object to list of persons
//solution found by following https://react.dev/reference/react-dom/components/input#optimizing-re-rendering-on-every-keystroke
const NewPersonForm = ({ callback }) => {
    const [newName, setNewName] = useState('')
    const handleNameChange = e => setNewName(e.target.value)
    const handleAddClicked = e => {
      e.preventDefault()
      const newPersonObj = {
        name: newName
      }
      callback(newPersonObj)
    }
  
    return <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAddClicked}>add</button>
      </div>
    </form>
}
  
export default NewPersonForm