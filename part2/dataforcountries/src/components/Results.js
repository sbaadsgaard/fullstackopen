const Suggestion = ({ name }) => <p>{name}</p>

const Match = ({ country }) => {
    const flagStyle = {border: '1px solid black'}
    return <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map(lang => 
                <li key={lang}>{lang}</li>)}
        </ul>
        <img
            src={country.flags.png}
            alt={country.flags.alt}
            style={flagStyle}
        />
    </>
}

const Results = ({ matches }) => {
    if (matches === null) {
        return <p>Enter name of a country</p>
    }

    if (matches.length === 1) {
        return <Match country={matches[0]} />
    }


    if (matches.length === 0) {
        return <p>No country matched your search</p>

    } else if (matches.length <= 10) {
        return <>
            {matches.map(m => <Suggestion key={m.name.common} name={m.name.common} />)}
        </>
    } else {
        return <p>Too many matches. Please specify.</p>
    }
}

export default Results