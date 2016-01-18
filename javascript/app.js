import React from 'react';
import ReactDOM from 'react-dom';
import CitySelector from './components/city-selector';
import Weather from './components/weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = JSON.parse('{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"},{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09n"}],"base":"cmc stations","main":{"temp":276.4,"pressure":1021,"humidity":69,"temp_min":275.15,"temp_max":277.55},"wind":{"speed":4.1,"deg":120},"rain":{"1h":0.2},"clouds":{"all":88},"dt":1453070530,"sys":{"type":1,"id":5091,"message":0.015,"country":"GB","sunrise":1453017440,"sunset":1453047876},"id":2643743,"name":"London","cod":200}');

    setTimeout(() => {
      this.setState(JSON.parse('{"coord":{"lon":144.96,"lat":-37.81},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}],"base":"cmc stations","main":{"temp":302.69,"pressure":1016,"humidity":17,"temp_min":302.05,"temp_max":304.15},"wind":{"speed":11.3,"deg":10},"clouds":{"all":0},"dt":1453071562,"sys":{"type":1,"id":8201,"message":0.0038,"country":"AU","sunrise":1452971824,"sunset":1453023779},"id":2158177,"name":"Melbourne","cod":200}'));
    }, 15000);
  }

  render() {
    if (!this.state) {
      return <div>Loading</div>;
    }

    return (
      <div className="app">
        <CitySelector current={this.state.name} />
        <Weather main={this.state.main}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));
