var React         = require('react');
var ReactRouter   = require('react-router');
var htmlBeautify  = require('js-beautify').html;

function getRoutedComponent(url) {
  var Routes = require('../../components/Routes.jsx');
  return new Promise(function(resolve, reject) {
    try {
      ReactRouter.run(Routes, url, function(Handler, state) {
        resolve({Handler, state});
      });
    }
    catch (e) {
      reject();
    }
  })
}

function renderComponent() {
  return function *() {
    var {Handler, state} = yield getRoutedComponent(this.req.url);

    try {
      var markup = React.renderToString(
        <Handler params={state.params} query={state.query} />
      );
      var body = `<!doctype html>\n${markup}`;

      if (process.env.NODE_ENV === 'development') {
        body = htmlBeautify(body);
      }

      this.body = body;
    }
    catch (e) {
      this.status = 500;
      this.body = JSON.stringify(e);
    }
  };
}

module.exports = renderComponent;
