import React from 'react';
import ReactDOM from 'react-dom';
import CitySelector from './components/city-selector';
import Weather from './components/weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = JSON.parse('{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"cmc stations","main":{"temp":271.21,"pressure":1015,"humidity":87,"temp_min":270.05,"temp_max":273.15},"wind":{"speed":1.5,"deg":60},"clouds":{"all":56},"dt":1453159642,"sys":{"type":1,"id":5091,"message":0.0148,"country":"GB","sunrise":1453103779,"sunset":1453134377},"id":2643743,"name":"London","cod":200}');

    setTimeout(() => {
      this.setState(JSON.parse('{"coord":{"lon":144.96,"lat":-37.81},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01d"}],"base":"cmc stations","main":{"temp":296.48,"pressure":1013,"humidity":64,"temp_min":294.15,"temp_max":298.75},"wind":{"speed":2.6,"deg":170},"clouds":{"all":0},"dt":1453162052,"sys":{"type":1,"id":8201,"message":0.0031,"country":"AU","sunrise":1453144692,"sunset":1453196551},"id":2158177,"name":"Melbourne","cod":200}'));
    }, 15000);
  }

  render() {
    if (!this.state) {
      return <div>Loading</div>;
    }

    return (
      <div className="app">
        <CitySelector current={this.state.name} />
        <Weather
          main={this.state.main}
          coord={this.state.coord}
          sun={{ sunrise: this.state.sys.sunrise, sunset: this.state.sys.sunset }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));
