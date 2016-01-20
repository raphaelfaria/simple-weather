import React from 'react';
import ReactDOM from 'react-dom';
import CitySelector from './components/city-selector';
import Weather from './components/weather';
import dispatcher from './dispatcher/dispatcher';
import weatherApi from './helpers/weather-api';

weatherApi.getWeather('Melbourne', 'AU');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = null;
  }

  _isDay() {
    let sunrise = this.state.sys.sunrise;
    let sunset = this.state.sys.sunset;

    const time = Date.now() / 1000;
    const daySeconds = 24 * 60 * 60;

    while (time > sunrise + daySeconds) {
      sunrise += daySeconds;
      sunset += daySeconds;
    }

    return time > sunrise && time < sunset;
  }

  componentDidMount() {
    dispatcher.register((payload) => {
      const action = payload.action;
      const data = payload.data;

      switch (action) {
        case 'UPDATE_WEATHER':
          this.setState(data);
          break;
        default:
          return true;
      }
    });
  }

  render() {
    if (!this.state) {
      return <div>Loading</div>;
    }

    const isDay = this._isDay();

    return (
      <div className={'app' + (isDay ? ' app--day' : '')}>
        <CitySelector current={this.state.name} />
        <Weather
          main={this.state.main}
          coord={this.state.coord}
          day={isDay}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));
