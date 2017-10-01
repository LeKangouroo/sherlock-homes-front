import Jump from 'jump.js';


/**
 * Scrolls the browser viewport to an element. This function is impure.
 *
 * @function
 *
 * @param {Element}   element         - an element of the DOM
 * @param {Number}    [duration=1000] - the duration of the animation in milliseconds
 * @param {?Function} callback        - the callback function called when the scrolling animation ends
 */
const scrollToElement = ({ element, duration = 1000, callback = undefined }) => Jump(element, { callback, duration });


/*
 * Exports
 */
export {
  scrollToElement
};
