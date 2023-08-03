import { useEffect, useState } from 'react';
import SearchField from './components/SearchField'
import Results from './components/Results'
import countryDataService from './services/countryDataService';

const App = () => {

  const [searchString, setSearchString] = useState("")
  const [searchMatches, setSearchMatches] = useState(null)
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    countryDataService
      .getCountryData()
      .then(result => setCountryData(result))
  }, [])

  const filterCountries = (string) => {
    //if no search string is entered, clear matches
    if (string === "") {
      setSearchMatches(null)
    } else {
      setSearchMatches(countryData.filter(country => country.name.common.toLowerCase().includes(string.toLowerCase())))
    }
    setSearchString(string)

  }

  const showChosenCountry = country => {
    setSearchMatches([country])
  }

  return (
    <>
      <h1>Data for countries</h1>
      <SearchField
        searchString={searchString}
        handleSearchChanged={filterCountries}
      />
      <Results matches={searchMatches} handleShow={showChosenCountry}/>
    </>
  )
}

export default App;
