/** @flow */

var React   = require('react');
var Router  = require('react-router');
var Routes  = require('./components/Routes.jsx');

var config = require('./config');

function fetchData(routes, params, query) {
  var calls: Array<Function> = routes.filter(route => route.handler.fetchData);
  var promiseArray: Array<any> = calls.map(route => {
    return new Promise((resolve, reject) => {
      route.handler.fetchData(routes, params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  });

  return Promise.all(promiseArray);
}


if ('undefined' !== typeof window) {
  document.addEventListener('DOMContentLoaded', function() {
    Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
      fetchData(state.routes, state.params, state.query)
        .then(function(data) {
          React.render(
            <Handler
              params={state.params}
              query={state.query}
              env={process.env.NODE_ENV} />,
            document
          );
        });
    });
  });
}
