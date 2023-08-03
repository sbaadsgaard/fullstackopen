import Person from "./Person"

const Numbers = ({ persons, handleRemoveClicked}) => {
    return <div>
        {persons.map(p =>
            <Person key={p.name} person={p} handleRemoveClicked={handleRemoveClicked}/>)}
    </div>
}

export default Numbers