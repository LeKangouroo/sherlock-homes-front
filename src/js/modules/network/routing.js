import Rlite from 'rlite-router';
import URI from 'urijs';


/**
 * Creates a simple router that can be used for single page applications
 *
 * @param {Window}    window            - the window object
 * @param {Object[]}  routes            - a list of routes
 * @param {string}    routes[].name     - the name of the route
 * @param {string}    routes[].uri      - the URI of the route
 * @param {*}         [routes[].data]   - (optional) some data associated to the route
 *
 * @returns {Object} the router
 */
const createRouter = (window, routes) => {

  const prototype = {

    changeRoute(route)
    {
      this.window.location.hash = '#' + route;
    },
    init()
    {
      const formatRoute = (route, rliteRoute) => ({
        data: route.data,
        name: route.name,
        params: rliteRoute.params,
        search: unserializeURISearch(this.window.location.search),
        uri: route.uri
      });

      const routes = this.routes.reduce((output, r) => {

        output[r.uri] = (params) => formatRoute(r, { params });
        return output;

      }, {});

      const routeNotFound = (params) => {

        if (!this.defaultRoute)
        {
          return undefined;
        }
        return formatRoute(this.defaultRoute, { params });
      };

      const rlite = Rlite(routeNotFound, routes);

      const processHash = () => {

        const hash = this.window.location.hash || "#";

        this.callback(rlite(hash.slice(1)));
      };

      this.window.addEventListener("hashchange", processHash);

      processHash();
    },
    onRouteChange(cb)
    {
      this.callback = cb;
    },
    setDefaultRoute(name)
    {
      this.defaultRoute = this.routes.find(r => r.name === name);
    }
  };

  return Object.create(prototype, {
    routes: {
      value: routes
    },
    window: {
      value: window
    }
  });
};


/**
 * Converts an object of search parameters into a search string
 *
 * @param {Object} search - an object containing the search params
 *
 * @returns {String} - the search string
 */
const serializeURISearch = (search) => URI().search(search).search();


/**
 * Parses search parameters from a string
 *
 * @param {string} search - a search string
 *
 * @returns {Object} - an object containing the search params
 */
const unserializeURISearch = (search) => URI().search(search).search(true);


/*
 * Exports
 */
export {
  createRouter,
  serializeURISearch,
  unserializeURISearch
};
