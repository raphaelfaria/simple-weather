module.exports = {
  getLocation() {
    return new Promise(function (resolve, reject) {
      if (!navigator.geolocation) {
        reject();
      }

      navigator
        .geolocation
        .getCurrentPosition((position) => resolve(position.coords), reject);
    });
  },
};
