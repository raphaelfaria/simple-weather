import weatherActions from '../actions/weather-actions';

const apiUrl = 'http://simple-weather-api.herokuapp.com/weather';

function getWeather(query) {
  return fetch(`${apiUrl}?${query}`)
    .then((response) => response.json())
    .then((data) => weatherActions.receiveWeatherInfo(data));
}

module.exports = {
  getWeatherByCity(city, country) {
    return getWeather(`city=${city},${country}`);
  },
  getWeatherByCoord(lat, lon) {
    return getWeather(`lat=${lat}&lon=${lon}`);
  },
};
