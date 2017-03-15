import BrowserException from './browser-exception';
import Jump from 'jump.js';

const DEVICES = [
  {
    type:        "mobile",
    orientation: "portrait",
    variant:     null,
    mediaQuery:  "(min-width: 320px)"
  },
  {
    type:        "mobile",
    orientation: "landscape",
    variant:     null,
    mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
  },
  {
    type:        "tablet",
    orientation: "portrait",
    variant:     null,
    mediaQuery:  "(min-width: 768px)"
  },
  {
    type:        "tablet",
    orientation: "landscape",
    variant:     null,
    mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
  },
  {
    type:        "desktop",
    orientation: null,
    variant:     "normal",
    mediaQuery:  "(min-width: 1280px)"
  },
  {
    type:        "desktop",
    orientation: null,
    variant:     "large",
    mediaQuery:  "(min-width: 1600px)"
  }
];

/**
 * An class which provides an abstraction layer for interacting with the browser
 */
class Browser
{
  /**
   * Returns informations about the current device
   * @returns {?Object} - an object containing the informations about the device or null
   */
  static getCurrentDevice()
  {
    var device,
        i;

    device = null;
    for (i = 0; i < DEVICES.length; i++)
    {
      if (window.matchMedia(DEVICES[i].mediaQuery).matches)
      {
        device = DEVICES[i];
      }
    }
    return device;
  }

  /**
   * Returns a promise which resolves with an instance of the Position interface
   * @see: https://developer.mozilla.org/en-US/docs/Web/API/Position
   * @returns {Promise} - the promise
   */
  static getCurrentPosition()
  {
    return new Promise(function(resolve, reject) {

      if (window.navigator && window.navigator.geolocation)
      {
        window.navigator.geolocation.getCurrentPosition(
          function(position)
          {
            resolve(position);
          },
          function(err)
          {
            reject(new BrowserException("error during geolocation process"));
            console.error(err);
          }
        );
      }
      else
      {
        reject(new BrowserException("geolocation is not supported in this browser"));
      }
    });
  }

  /**
   * Scrolls the browser viewport to an element
   * @param {Element} element - an element of the DOM
   * @param {Number} [duration=1000] - the duration of the animation in milliseconds
   * @param {?Function} callback - the callback function called when the scrolling animation ends
   */
  static scrollToElement({ element, duration = 1000, callback = undefined })
  {
    Jump(element, { callback, duration });
  }
}

export default Browser;
