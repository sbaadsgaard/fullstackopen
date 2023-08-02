const Person = ({ name, number = '-1' }) => {
    return <p>{name}</p>
}

const Numbers = ({ persons }) => {
  console.log("rerender")
  return <div>
    {persons.map(p =>
      <Person key={p.name} name={p.name} />)}
  </div>
}

export default Numbers