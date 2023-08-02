import Person from "./Person"

const Numbers = ({ persons }) => {
    return <div>
        {persons.map(p =>
            <Person key={p.name} person={p} />)}
    </div>
}

export default Numbers