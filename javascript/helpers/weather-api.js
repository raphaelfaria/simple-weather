import weatherActions from '../actions/weather-actions';

const apiUrl = '';
const appId = '';

module.exports = {
  getWeather(city, country) {
    return fetch(`${apiUrl}${city},${country}&appid=${appId}`)
      .then((response) => response.json())
      .then((data) => weatherActions.receiveWeatherInfo(data));
  },
};
