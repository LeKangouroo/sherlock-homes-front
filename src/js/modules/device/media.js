/**
 * Returns informations about the current media, based on a list of medias
 *
 * @function
 *
 * @param {Object}  window                - The Window object of the browser
 * @param {Array}   medias                - A list of medias
 * @param {string}  medias[].type         - The type (ex : mobile, tablet, desktop)
 * @param {string}  medias[].orientation  - The orientation (ex : portrait, landscape)
 * @param {string}  medias[].variant      - The variant (ex : normal, large)
 * @param {string}  medias[].mediaQuery   - The media query
 *
 * @returns {(Object|undefined)} - An item of the list or undefined if no result found.
 */
export const findCurrentMedia = (window, medias) => medias.find(d => window.matchMedia(d.mediaQuery).matches);


/**
 * Returns the list of expected medias
 *
 * @function
 *
 * @returns {Array} - a list of medias
 */
export const getMediasList = () => ([
  {
    type:        "desktop",
    orientation: "",
    variant:     "large",
    mediaQuery:  "(min-width: 1600px)"
  },
  {
    type:        "desktop",
    orientation: "",
    variant:     "normal",
    mediaQuery:  "(min-width: 1280px)"
  },
  {
    type:        "tablet",
    orientation: "landscape",
    variant:     "",
    mediaQuery:  "(min-width: 1024px) and (orientation: landscape)"
  },
  {
    type:        "tablet",
    orientation: "portrait",
    variant:     "",
    mediaQuery:  "(min-width: 768px)"
  },
  {
    type:        "mobile",
    orientation: "landscape",
    variant:     "",
    mediaQuery:  "(min-width: 480px) and (orientation: landscape)"
  },
  {
    type:        "mobile",
    orientation: "portrait",
    variant:     "",
    mediaQuery:  "(min-width: 320px)"
  }
]);


/**
 * Returns informations about the current media
 *
 * @function
 *
 * @param {Object}  window - The Window object of the browser
 *
 * @returns {(Object|undefined)} - Informations about the current media or undefined if the media is unknown.
 */
export const getCurrentMedia = (window) => findCurrentMedia(window, getMediasList());


/*
 * Default exports
 */
export default {
  findCurrentMedia,
  getCurrentMedia,
  getMediasList
};
