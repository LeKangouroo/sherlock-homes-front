/**
 * An abstraction layer for Google Analytics JavaScript API
 * @see: https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */
class GoogleAnalytics
{
  /**
   * Initializes Google Analytics tracking
   * @param {object} options
   * @param {string} options.trackingID UA Tracking ID
   */
  static init(options)
  {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', options.trackingID, 'auto');
  }

  /**
   * Sends an event hit
   * @param {object} options
   * @param {string} options.category the event's category
   * @param {string} options.action the event's action
   * @param {string} options.label the event's label
   * @param {string|undefined} options.value the event's value
   */
  static sendEvent(options)
  {
    ga('send', 'event', options.category, options.action, options.label, options.value, {
      nonInteraction: true
    });
  }

  /**
   * Sends a page view hit
   * @param {object} options
   * @param {string} options.page the url of the page
   * @param {string} options.title the title of the page
   */
  static sendPageView(options)
  {
    const trackerParams = {};

    if (typeof options.page === 'string')
    {
      trackerParams.page = options.page;
    }
    if (typeof options.title === 'string')
    {
      trackerParams.title = options.title;
    }
    ga('send', 'pageview', trackerParams);
  }
}

export default GoogleAnalytics;
