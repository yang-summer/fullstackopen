import axios from 'axios'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY

const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'en',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export default fetchWeatherData