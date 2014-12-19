/** @flow */

var React               = require('react');
var assign              = require('react/lib/Object.assign');
var Router              = require('react-router');
var Promise             = require('bluebird');
var request             = require('superagent');
var co                  = require('co');
var Routes              = require('./components/Routes.jsx');
var getTitle            = require('./utils/getTitle');
var fetchData           = require('./utils/fetchData');
var docLoaded           = require('./utils/docLoaded');
var getSession          = require('./utils/getSession');
var AuthActionCreators  = require('./actions/AuthActionCreators');

var config = require('./config');

function getRoutedComponent(routes, history) {
  return new Promise(function(resolve, reject) {
    Router.run(routes, history, function(Handler, state) {
      resolve({Handler, state});
    });
  });
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
