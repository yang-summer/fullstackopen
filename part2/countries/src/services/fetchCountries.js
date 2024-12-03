import axios from 'axios';

const fetchCountriesData = async (query) => {
  try {
    const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return response.data.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export default fetchCountriesData