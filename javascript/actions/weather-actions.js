import dispatcher from '../dispatcher/dispatcher';

module.exports = {
  receiveWeatherInfo(data) {
    dispatcher.dispatch({
      action: 'UPDATE_WEATHER',
      data,
    });
  },
};
