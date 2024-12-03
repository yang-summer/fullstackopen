const WeatherCard = ({ capital, weather }) => {
  if (!weather) return null;

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weatherIconUrl && <img src={weatherIconUrl} alt="weather icon" />}
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;