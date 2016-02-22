module.exports = {
  getLocation() {
    return new Promise((resolve, reject) => {
      const isFirefox = /firefox/i.test(navigator.userAgent);
      let timedOut = false;

      if (!navigator.geolocation) {
        reject();
      }

      if (isFirefox) {
        setTimeout(() => {
          timedOut = true;
          reject();
        }, 10000);
      }

      navigator
        .geolocation
        .getCurrentPosition(
          (position) => {
            if (timedOut) return false;

            return resolve(position.coords);
          },
          () => {
            if (timedOut) return false;

            return reject();
          },
          { timeout: 10000 });
    });
  },
};
