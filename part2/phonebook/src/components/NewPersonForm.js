import { useState } from 'react'


//placed form in seperate component to avoid rerendering list of numbers every keystroke.
//Using callback from parent component(App) to add the new person object to list of persons
//solution found by following https://react.dev/reference/react-dom/components/input#optimizing-re-rendering-on-every-keystroke
const NewPersonForm = ({ callback }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleAddClicked = e => {
        e.preventDefault()

        if (newNumber === '' || newName === '') {
            alert("Please enter both a name and a number")
            return
        }

        const newPersonObj = {
            name: newName,
            number: newNumber
        }
        setNewName("")
        setNewNumber("")
        callback(newPersonObj)
    }

    return <form>
        <div>
            name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
            number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
        </div>
        <div>
            <button type="submit" onClick={handleAddClicked}>add</button>
        </div>
    </form>
}

export default NewPersonForm