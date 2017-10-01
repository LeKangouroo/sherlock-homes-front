import Rlite from 'rlite-router';
import RouterException from './router-exception';
import URI from 'urijs';

/**
 * Provides client-side routing system and utility methods related to the URLs
 */
class Router
{
  ///////////////////////////////////////////////////////////////////////
  // CONSTRUCTOR
  ///////////////////////////////////////////////////////////////////////

  /**
   * Constructor
   * @param {Object[]} routes - a list of routes to use
   * @param {String} routes[].name - the name of the route
   * @param {String} routes[].uri - the URI of the route. You can define URI variables by prefixing with ":" like this /path/:variableName
   * @param {Location} location - an object implementing the Location interface
   */
  constructor(routes, location)
  {
    this._validateLocation(location);
    this._validateRoutes(routes);

    this.callback = null;
    this.defaultRoute = "";
    this.location = location;
    this.rlite = null;
    this.routes = routes;
  }

  ///////////////////////////////////////////////////////////////////////
  // PUBLIC STATIC METHODS
  ///////////////////////////////////////////////////////////////////////

  /**
   * Parses query string parameters from a string and returns an object containing those parameters
   * @param {String} queryString - the query string
   * @returns {Object} - an object containing the query params
   */
  static parseQueryParams(queryString)
  {
    const uri = new URI();

    uri.search(queryString);
    return uri.search(true);
  }

  /**
   * Converts an object of query parameters into a query string
   * @param {Object} queryParams - an object containing the query params
   * @returns {String} the query string
   */
  static serializeQueryParams(queryParams)
  {
    const uri = new URI();

    uri.search(queryParams);
    return uri.search();
  }

  ///////////////////////////////////////////////////////////////////////
  // PUBLIC INSTANCE METHODS
  ///////////////////////////////////////////////////////////////////////

  /**
   * Changes the current route
   * @param {String} route - a URI representing the route
   */
  changeRoute(route)
  {
    this.location.hash = '#' + route;
  }

  /**
   * Returns the query params of the current route
   * @returns {Object} the query params
   */
  getQueryParams()
  {
    return Router.parseQueryParams(this.location.search);
  }

  /**
   * Initializes the router
   */
  init()
  {
    this.rlite = new Rlite();
    for (let item of this.routes)
    {
      this.rlite.add(item.uri.substr(1), (r) => {

        this.callback({
          name:   item.name,
          params: r.params,
          query:  this.getQueryParams(),
          uri:    item.uri
        });
      });
    }

    // Hash-based routing
    function processHash(self)
    {
      var hash;

      hash = window.location.hash || "#";
      if (!self.rlite.run(hash.slice(2)))
      {
        window.location.hash = "#" + self.defaultRoute.uri;
      }
    }
    window.addEventListener("hashchange", processHash.bind(null, this));
    processHash.call(null, this);
  }

  /**
   * Sets a callback function called on route change
   * @param {Function} cb - the callback function
   */
  onRouteChange(cb)
  {
    this._validateCallback(cb);
    this.callback = cb;
  }

  /**
   * Sets the default route to use when the current route doesn't match any registered route pattern
   * @param {String} name - the name of the default route
   */
  setDefaultRoute(name)
  {
    for (let item of this.routes)
    {
      if (item.name === name)
      {
        this.defaultRoute = item;
        return;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////
  // PRIVATE METHODS
  ///////////////////////////////////////////////////////////////////////

  _validateCallback(callback)
  {
    if (typeof callback === "undefined")
    {
      throw new RouterException('Callback function missing');
    }
    else if (typeof callback !== "function")
    {
      throw new RouterException('Invalid callback function');
    }
  }
  _validateLocation(location)
  {
    if (typeof location.constructor === "undefined" || location.constructor !== Location)
    {
      throw new RouterException("an instance of the Location class is expected");
    }
  }
  _validateRoutes(routes)
  {
    if (routes === null || typeof routes === "undefined" || routes.constructor !== Array)
    {
      throw new RouterException('Invalid "routes" constructor argument');
    }
    for (let item of routes)
    {
      if (item === null || typeof item === "undefined" || item.constructor !== Object)
      {
        throw new RouterException("Invalid route. See console for more details");
      }
      else if (typeof item.name === "undefined" || typeof item.uri === "undefined")
      {
        throw new RouterException('"name" or "uri" field missing in the route. See console for more details');
      }
    }
  }
}

export default Router;
