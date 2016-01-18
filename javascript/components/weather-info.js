import React from 'react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'WeatherInfo';
  }

  _getCelcius(temp) {
    return Math.round(temp - 273.15);
  }

  render() {
    return (
      <div className="weather-info">
        <span className="weather-info__temp">{this._getCelcius(this.props.temp)}</span>
        <span className="weather-info__humidity">{this.props.hum}</span>
      </div>
    );
  }
}

export default WeatherInfo;
