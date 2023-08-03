const Person = ({ person, handleRemoveClicked }) => {
    const removeClicked = () => {
        if (window.confirm(`Remove ${person.name}?`)) {
            handleRemoveClicked(person.id)
        }
    }
    return <div>
        {person.name} {person.number} <button onClick={removeClicked}>Delete</button>
    </div>
}

export default Person