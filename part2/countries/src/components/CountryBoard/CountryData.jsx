import { useState, useEffect } from 'react';
import fetchWeatherData from '../../services/weatherService';
import WeatherCard from '../WeatherCard';

const CountryData = ({ countryData, toHidden }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countryData.capital) {
      fetchWeatherData(countryData.capital[0]).then((data) => {
        if (data) {
          setWeather(data);
        }
      });
    }
  }, [countryData]);

  return (
    <div hidden={toHidden}>
      <h2>{countryData.name.common}</h2>
      <p>capital {countryData.capital[0]}</p>
      <p>area {countryData.area}</p>
      <p>languages:</p>
      <ul>
        {Object.values(countryData.languages).map((v, i) => <li key={i}>{v}</li>)}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt}></img>
      <WeatherCard capital={countryData.capital[0]} weather={weather} />
    </div>
  )
}

export default CountryData;