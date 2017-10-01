/**
 * Initializes Google Analytics library and returns the instance. This function is impure.
 *
 * @function
 *
 * @param {Object}    options           - The initialization options
 * @param {Window}    options.window    - The window object
 * @param {Document}  options.document  - The document object
 *
 * @returns {Object} the Google Analytics object
 */
const init = (options) => {

  const { window, document, trackingId } = options;

  /* eslint-disable */

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  /* eslint-enable */

  window.ga('create', trackingId, 'auto');

  return window.ga;
};


/**
 * Sends an event hit. This function is impure.
 *
 * @function
 *
 * @param {Object}            ga                - the Google Analytics object
 * @param {Object}            options           - a set of options
 * @param {string}            options.category  - the event's category
 * @param {string}            options.action    - the event's action
 * @param {string}            options.label     - the event's label
 * @param {string|undefined}  options.value     - the event's value
 *
 * @returns {Object} the Google Analytics object
 */
const sendEvent = (ga, options) => {

  const { category, action, label, value } = options;

  ga('send', 'event', category, action, label, value, { nonInteraction: true });
  return ga;
};


/**
 * Sends a page view hit. This function is impure.
 *
 * @param {Object}  ga            - the Google Analytics object
 * @param {Object}  options       - a set of options
 * @param {string}  options.page  - the name of the page
 * @param {string}  options.title - the title of the page
 *
 * @returns {Object} the Google Analytics object
 */
const sendPageView = (ga, options) => {

  const trackerParams = {};
  const { page, title } = options;

  if (typeof page === 'string')
  {
    trackerParams.page = page;
  }
  if (typeof title === 'string')
  {
    trackerParams.title = title;
  }
  ga('send', 'pageview', trackerParams);
  return ga;
};


/*
 * Exports
 */
export {
  init,
  sendEvent,
  sendPageView
};
