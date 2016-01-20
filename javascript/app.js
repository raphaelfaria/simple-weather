import React from 'react';
import ReactDOM from 'react-dom';
import CitySelector from './components/city-selector';
import Weather from './components/weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = JSON.parse('{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"cmc stations","main":{"temp":271.21,"pressure":1015,"humidity":87,"temp_min":270.05,"temp_max":273.15},"wind":{"speed":1.5,"deg":60},"clouds":{"all":56},"dt":1453159642,"sys":{"type":1,"id":5091,"message":0.0148,"country":"GB","sunrise":1453103779,"sunset":1453134377},"id":2643743,"name":"London","cod":200}');
  }

  _isDay() {
    const time = Date.now() / 1000;
    const sunrise = this.state.sys.sunrise;
    const sunset = this.state.sys.sunset;

    return time > sunrise && time < sunset;
  }

    return false;
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
