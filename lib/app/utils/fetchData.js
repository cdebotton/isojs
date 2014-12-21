/** @flow */

var assign              = require('react/lib/Object.assign');

module.exports = function fetchData(routes, params, query) {
  var calls: Array<Function> = routes.filter(route => route.handler.fetchData);
  var promiseArray: Array<any> = calls.map(route => {
    return new Promise((resolve, reject) => {
      route.handler.fetchData(params, query)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  });

  return Promise.all(promiseArray)
    .then(data => data.reduce((memo, item) => {
      memo = assign({}, memo, item);
      return memo;
    }, {}));
}
