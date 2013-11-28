$(function() {

  windowHeight = $(window).height();
  windowWidth = $(window).width();
  wrapper = $('#content-wrapper');
  bodyElem = $('body');
  tempWrapper = $('.temp');
  humidityWrapper = $('.humidity');
  wrapper.css('margin-top', (windowHeight - wrapper.height())/2);

  $(window).resize(function() {
    wrapper.css('margin-top', ($(window).height() - wrapper.height())/2);
  });

  var dayBg = '#F7F7F7',
      nightBg = '#2D3038',
      dayCirc = '#D9D9D9',
      nightCirc = '#474C57';

  var pi = Math.PI,
      elem = document.getElementById('circle-app'),
      ctx = elem.getContext('2d');

  var midHor = elem.width/2,
      midVer = elem.height/2;

  var bg, bgc;



  var geoLocal = true,
      cityName = 'Belo Horizonte',
      lang     = 'en',
      DEG      = 'c',
      tempStore;

  if (geoLocal == true) {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
     }
     else {
         alert('Error in localization');
     }
  }
  else {
     var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&callback=?&lang=' + lang;

     var forecastAPI = 'http://api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&callback=?&lang=' + lang;

     getWeatherInfo(weatherAPI, forecastAPI, formatter);
  }

  function locationSuccess(position) {
    var crd = position.coords;

    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat='+crd.latitude+'&lon='+crd.longitude+'&callback=?&lang=' + lang;

    var forecastAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat='+crd.latitude+'&lon='+crd.longitude+'&callback=?&lang=' + lang;

    getWeatherInfo(weatherAPI, forecastAPI, formatter);
  }

  function getWeatherInfo(weatherAPI, forecastAPI, formatter) {
    $.getJSON(weatherAPI, function(response){
      localStorage.weather= JSON.stringify({
        timestamp:(new Date()).getTime(),
        data: response
      });
      formatter(response);
    });
  }


  function formatter(data) {

    var d = new Date(),
        offset    = d.getTimezoneOffset(),
        localtime = d.getTime();

    var sunrise       = data.sys.sunrise * 1000,
        sunset        = data.sys.sunset * 1000,
        city          = data.name,
        temp          = data.main.temp,
        hum           = data.main.humidity,
        conditionId   = data.weather[0].id,
        mainCondition = data.weather[0].main,
        condition     = data.weather[0].description,
        minMax        = [data.main.temp_min, data.main.temp_max];

    tempStore = temp; //store for later

    var day;

    if (localtime < sunrise || localtime > sunset)
      day = false;
    else
      day = true;

    colorize(day);


    writeTemperature(temp);

    humidityWrapper.html(hum + '%');

    var hours = 1.5; //7.5 or 4.5
    // var hours = d.getHours() - 12 + ((d.getMinutes() * 5/3) / 100);
    console.log(hours);

    //clock holder draw
    drawStroke(midHor, midVer, 240, 0, 2 * pi, 20, bgc); //circle

    var clockAngleFixer = 0.5 * pi;

    //clock draw
    var clockColour =  '#' + getColour(temp);

    if (hours == 1.5 || 4.5 || 7.5 || 10.5)
      drawStroke(midHor, midVer, 240, -0.50001 * pi, (hours/6 - 0.5) * pi, 20, clockColour);
    else
      drawStroke(midHor, midVer, 240, -0.5 * pi, (hours/6 - 0.5) * pi, 20, clockColour);

    //hum holder draw
    var humInd = (100 - hum) / 100 * 0.25;
    drawStroke(midHor, midVer, 218, (0.25 + humInd) * pi, (0.75 - humInd) * pi, 4, "#00D9D9");
    // drawStroke(midHor, midVer, 220, 0.25 * pi, 0.75 * pi, 1, "#00D9D9")

    //hum indicator draw

    // var humInd = (100 - hum) / 100 * 0.25;

    // drawFill(220, (0.25 + humInd) * pi, (0.75 - humInd) * pi, 1, "#00D9D9");

  }

  function locationError(error){
      switch(error.code) {
          case error.TIMEOUT:
              showError("A timeout occured! Please try again!");
              break;
          case error.POSITION_UNAVAILABLE:
              showError('We can\'t detect your location. Sorry!');
              break;
          case error.PERMISSION_DENIED:
              showError('Please allow geolocation access for this to work.');
              break;
          case error.UNKNOWN_ERROR:
              showError('An unknown error occured!');
              break;
      }
  }

  $('.temp').click(function() {
    if(DEG === 'c') {
      DEG = 'f';
    }
    else if(DEG === 'f') {
      DEG = 'c';
    }
    writeTemperature(tempStore);
  });

  function writeTemperature(temp) {
    var markup = tempConverter(temp) + 'º' + (DEG === 'c' ? 'C' : 'F');
    tempWrapper.html(markup);
  }

  function drawStroke(midh, midv, radius, begin, end, width, colour) {
    ctx.beginPath();
    ctx.arc(midh, midv, radius, begin, end);
    ctx.lineWidth = width;
    ctx.strokeStyle = colour;
    ctx.stroke();
  }

  function drawFill(midh, midv, radius, begin, end, width, colour) {
    ctx.beginPath();
    ctx.arc(midh, midv, radius, begin, end);
    ctx.lineWidth = width;
    ctx.fillStyle = colour;
    ctx.fill();
  }

  function colorize(day) {
    if (day) {
      bg = dayBg;
      bgc = dayCirc;
      tempWrapper.css('color', nightBg);
    }
    else {
      bg = nightBg;
      bgc = nightCirc;
      tempWrapper.css('color', 'white');
    }

    bodyElem.css('background-color', bg);
  }

  function tempConverter(temperature) {
      return Math.round(DEG == 'c' ? (temperature - 273.15) : (temperature*9/5 - 459.67));
  }

  function getColour(temp) {

    var hue, h, s, l;
    var kelvin = 273.15;
    var minTemp = -10 + kelvin;
    var maxTemp = 30 + kelvin;

    hue = 240 * (maxTemp - temp)/(maxTemp - minTemp);

    if (hue < 0)
      hue = 0;
    else if (hue > 240)
      hue = 240;


    h = hue / 3.6 / 100;

    s = 90 / 100;
    l = 40 / 100;

    var r, g, b;

    function hue2rgb(p, q, t) {
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    if (s === 0) {
        r = g = b = l;
      }
    else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    r *= 255;
    g *= 255;
    b *= 255;

    //rgb to hex

    var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
    ];

    return hex.join("");
  }

  function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
  }
})