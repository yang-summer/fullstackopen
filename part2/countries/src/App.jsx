import { useState, useEffect, useRef } from 'react';

import fetchCountriesData from './services/fetchCountries';
import CountryBoard from './components/CountryBoard/CountryBoard';

const App = () =>  {
  const [countryQuery, setCountryQuery] = useState('')
  const [countryInfo, setCountryInfo] = useState([])
  const [debouncedCountryQuery, setDebouncedCountryQuery] = useState('');
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debouncedCountryQuery) {
      fetchCountriesData(debouncedCountryQuery).then(setCountryInfo);
    } else {
      setCountryInfo([]);
    }
  }, [debouncedCountryQuery])

  const handleCountryQueryChange = (event) => {
    const newQuery = event.target.value;
    setCountryQuery(newQuery);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setDebouncedCountryQuery(newQuery);
    }, 500);
  }

  const handleCountryShowChange = (event) => {
    event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden
  }

  return (
    <div>
      <form>
        find countries <input value={countryQuery} onChange={handleCountryQueryChange}/>
      </form>
      <CountryBoard countryInfo={countryInfo} onCountryShow={handleCountryShowChange}/>
    </div>
  )
}

export default App
