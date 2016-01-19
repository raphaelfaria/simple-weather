import React from 'react';
import ReactDOM from 'react-dom';

class WeatherCircle extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'WeatherCircle';
  }

  _drawStroke(midh, midv, radius, begin, end, width, colour) {
    this.canvas.context.beginPath();
    this.canvas.context.arc(midh, midv, radius, begin, end);
    this.canvas.context.lineWidth = width;
    this.canvas.context.strokeStyle = colour;
    this.canvas.context.stroke();
  }

  _getColourByTemp(temp) {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    function padHex(c) {
      return ('00' + c).slice(-2);
    }

    let hue;
    let h;
    let s;
    let l;

    const kelvin = 273.15;
    const minTemp = -10 + kelvin;
    const maxTemp = 30 + kelvin;

    hue = 240 * (maxTemp - temp) / (maxTemp - minTemp);

    if (hue < 0) {
      hue = 0;
    } else if (hue > 240) {
      hue = 240;
    }


    h = hue / 3.6 / 100;

    s = 53.51 / 100;
    l = 55.29 / 100;

    let r;
    let g;
    let b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    r *= 255;
    g *= 255;
    b *= 255;

    // rgb to hex
    const hex = [
      padHex(Math.round(r).toString(16)),
      padHex(Math.round(g).toString(16)),
      padHex(Math.round(b).toString(16)),
    ];

    return '#' + hex.join('');
  }

  _hoursByCoordinate(lon) {
    const time = new Date();
    const offset = Math.round(lon / 15);
    const UTCHours = time.getUTCHours();
    const UTCMinutes = time.getUTCMinutes();

    const hours =
      (UTCHours > 12 ? UTCHours - 12 : UTCHours) +
      (UTCMinutes * 5 / 3 / 100) +
      offset;

    return hours >= 12 ? hours - 12 : hours;
  }

  _drawCircle() {
    const hours = this._hoursByCoordinate(this.props.lon);
    const midHor = this.canvas.elem.width / 2;
    const midVer = this.canvas.elem.height / 2;
    const dayCirc = '#FFFFFF';
    const nightCirc = '#474C57';
    const humColour = '#00D9D9';
    const PI = Math.PI;

    // Draw main circle
    this._drawStroke(midHor, midVer, 240, 0, 2 * PI, 20, this.props.day ? dayCirc : nightCirc);

    // Temperature + Time indicator
    this._drawStroke(
      midHor,
      midVer,
      240,
      -0.50001 * PI,
      (hours / 6 - 0.5) * PI,
      20,
      this._getColourByTemp(this.props.temp)
    );

    // Humidity holder draw
    const humInd = (100 - this.props.hum) / 100 * 0.25;
    this._drawStroke(midHor, midVer, 218, (0.25 + humInd) * PI, (0.75 - humInd) * PI, 4, humColour);
  }

  render() {
    return (
      <canvas className="weather-circle" width="500px" height="500px"></canvas>
    );
  }

  _updateCircle() {
    const elem = ReactDOM.findDOMNode(this);
    const context = elem.getContext('2d');

    this.canvas = {
      elem, context,
    };

    context.clearRect(0, 0, elem.width, elem.height);

    this._drawCircle();
  }

  componentDidUpdate() {
    this._updateCircle();
  }

  componentDidMount() {
    this._updateCircle();
  }
}

export default WeatherCircle;
