/** @flow */

module.exports = function getTitle(routes, params, query) {
  return routes.reduce(function(memo, route) {
    var handler = route.handler;
    if ('function' === typeof handler.getPageTitle) {
      memo = handler.getPageTitle(params, query);
    }
    return memo;
  }, false);
};
