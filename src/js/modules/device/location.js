/**
 * Returns a promise which resolves with an instance of the Position interface
 *
 * @function
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Position}
 *
 * @param {Object} window - The Window object of the browser
 *
 * @returns {Promise} - The promise
 */
const getGeolocation = (window) => new Promise((resolve, reject) => {

  if (window.navigator && window.navigator.geolocation)
  {
    window.navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(new Error(`error during geolocation process: ${err.message}`)));
  }
  else
  {
    reject(new Error("geolocation is not supported in this browser"));
  }
});


/*
 * Exports
 */
export {
  getGeolocation
};
