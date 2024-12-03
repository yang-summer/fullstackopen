import CountryList from './CountryList';
import CountryData from './CountryData';

const CountryBoard = ({ countryInfo, onCountryShow }) => {
  if (countryInfo.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  
  if ((countryInfo.length > 1) || (countryInfo.length === 0)) {
    return (
    <CountryList countryInfo={countryInfo} onCountryShow={onCountryShow}/>
    )
  }

  if (countryInfo.length === 1) {
    return (<CountryData countryData={countryInfo[0]} toHidden={false}/>)
  }

  return null;
}

export default CountryBoard;