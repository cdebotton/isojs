/** @flow */

var React   = require('react');
var assign  = require('react/lib/Object.assign');
var Router  = require('react-router');
var Promise = require('bluebird');
var request = require('superagent');
var co      = require('co');
var Routes  = require('./components/Routes.jsx');
var AuthActionCreators = require('./actions/AuthActionCreators');

var config = require('./config');

function docLoaded() {
  return new Promise(function(resolve, reject) {
    var timer = setTimeout(reject, 10000);
    document.addEventListener('DOMContentLoaded', resolve);
    clearTimeout(timer);
  });
}

function getRoutedComponent(routes, history) {
  return new Promise(function(resolve, reject) {
    Router.run(routes, history, function(Handler, state) {
      resolve({Handler, state});
    });
  });
}

function getSession() {
  return new Promise(function(resolve, reject) {
    request.get('http://localhost:3000/api/v1/request-token')
      .end(function(err, res) {
        if (res.status == 200) {
          resolve(res.body.key);
        }
        else {
          resolve(false);
        }
      });
  });
};

function fetchData(routes, params, query) {
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

function getTitle(routes, params, query) {
  return routes.reduce(function(memo, route) {
    var handler = route.handler;

    if ('function' === typeof handler.getPageTitle) {
      memo = handler.getPageTitle(params, query);
    }
    return memo;
  }, false);
}

if ('undefined' !== typeof window) {
  var initialLoad = false;
  co(function *() {
    yield docLoaded();
    var token = yield getSession();

    require('./stores/AuthStore').setSession(token || null);
    Router.run(Routes, Router.HistoryLocation, function(Handler, state) {
      co(function *() {
        if (! initialLoad) {
          yield fetchData(state.routes, state.params, state.query);
          initialLoad = true;
        }
        else {
          fetchData(state.routes, state.params, state.query);
        }

        var title = getTitle(state.routes, state.params, state.query);

        React.render(
          <Handler
            title={title}
            session={token}
            params={state.params}
            query={state.query}
            env={process.env.NODE_ENV} />,
          document
        );
      });
    });
  });
}
