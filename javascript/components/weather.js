import React from 'react';
import WeatherCircle from './weather-circle';
import WeatherInfo from './weather-info';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Weather';
  }

  render() {
    return (
      <div className="weather">
        <div className="weather__wrapper">
          <div className="weather__container">
            <WeatherCircle
              day={this.props.day}
              lon={this.props.coord.lon}
              temp={this.props.main.temp}
              hum={this.props.main.humidity}
              localHours={this.props.localHours}
            />
            <WeatherInfo temp={this.props.main.temp} hum={this.props.main.humidity} />
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
