var React       = require('react');
var ReactRouter = require('react-router');

require('node-jsx').install({
  harmony: true,
  stripTypes: true
});

function getRoutedComponent(url) {
  var Routes = require('../components/Routes.jsx');
  return new Promise(function(resolve, reject) {
    try {
      ReactRouter.run(Routes, url, function(Handler, state) {
        resolve({Handler: Handler, state: state});
      });
    }
    catch (e) {
      reject();
    }
  })
}

function renderComponent() {
  return function *() {
    var routed = yield getRoutedComponent(this.req.url);
    var Factory = React.createFactory(routed.Handler);
    var app = Factory({
      params: routed.state.params,
      query: routed.state.query
    });

    try {
      var markup = React.renderToString(app);
      this.body = '<!doctype html>\n' + markup;
    }
    catch (e) {
      this.status = 500;
      this.body = JSON.stringify(e);
    }
  };
}

module.exports = renderComponent;
