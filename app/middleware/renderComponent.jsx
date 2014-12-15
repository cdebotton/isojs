var React         = require('react');
var ReactRouter   = require('react-router');
var htmlBeautify  = require('js-beautify').html;

var PRODUCTION    = process.env.NODE_ENV === 'production';

function getRoutedComponent(url) {
  var Routes = require('../components/Routes.jsx');
  return new Promise(function(resolve, reject) {
    try {
      ReactRouter.run(Routes, url, function(Handler, state) {
        resolve({Handler, state});
      });
    }
    catch (err) {
      reject(err);
    }
  })
}

function renderComponent() {
  return function *(next) {
    var {Handler, state} = yield getRoutedComponent(this.req.url);

    try {
      var markup = React.renderToString(
        <Handler
          params={state.params}
          query={state.query}
          env={process.env.NODE_ENV} />
      );
      var body = `<!doctype html>\n${markup}`;

      if (process.env.NODE_ENV === 'development') {
        body = htmlBeautify(body);
      }

      this.body = body;
    }
    catch (e) {
      this.status = 500;
      this.body = PRODUCTION ? 'Internal Server Error' : e.toString();
    }
  };
}

module.exports = renderComponent;
