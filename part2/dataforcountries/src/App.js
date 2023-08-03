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
      .getCountryNames()
      .then(result => setCountryData(result))
  }, [])

  const handleSearchChanged = (e) => {
    //if no search string is entered, clear matches
    if (e.target.value === "") {
      setSearchMatches(null)
    } else {
      setSearchMatches(countryData.filter(country => country.name.common.includes(e.target.value)))
    }
    setSearchString(e.target.value)

  }
  return (
    <>
      <h1>Data for countries</h1>
      <SearchField
        searchString={searchString}
        handleSearchChanged={handleSearchChanged}
      />
      <Results matches={searchMatches} />
    </>
  )
}

export default App;
