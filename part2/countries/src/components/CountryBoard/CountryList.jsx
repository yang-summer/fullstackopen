import CountryData from './CountryData';

const CountryList = ({ countryInfo, onCountryShow }) => {
  return (
    <div>
      {countryInfo.map((value, index) => 
        <div key={index}>
          {value.name.common}
          <button onClick={onCountryShow}>show</button>
          <CountryData countryData={value} toHidden={true}/>
        </div>
      )}
    </div>
  )
}

export default CountryList;