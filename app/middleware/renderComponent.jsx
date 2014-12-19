var React               = require('react');
var config              = require('../config');
var getTitle            = require('../utils/getTitle');
var fetchData           = require('../utils/fetchData');
var ReactRouter         = require('react-router');

var PRODUCTION    = process.env.NODE_ENV === 'production';

function getRoutedComponent(url, app) {
  var Routes = require('../components/Routes.jsx');
  return new Promise(function(resolve, reject) {
    var Router = ReactRouter.create({
      routes: Routes,
      location: url,
      onAbort: (aborted) => {
        var {to, params, query} = aborted;
        var url = Router.makePath(to, params, query);
        reject(url);
      }
    });

    try {
      Router.run(function(Handler, state) {
        resolve({Handler, state});
      });
    }
    catch (err) {
      reject(err);
    }
  }).catch(function(redirect) {
    app.redirect(redirect);
  });
}

function renderComponent() {
  return function *(next) {
    require('../stores/AuthStore').setSession(this.session.passport.user || null);

    var res = yield getRoutedComponent(this.req.url, this);
    if (res) {
      var {Handler, state} = res;
      var data = yield fetchData(state.routes, state.params, state.query);
      var title = getTitle(state.routes, state.params, state.query);

      try {
        var markup = React.renderToString(
          <Handler
            title={title}
            token={this.session.passport.user || null}
            params={state.params}
            query={state.query}
            env={process.env.NODE_ENV} />
        );
        var body = `<!doctype html>\n${markup}`;
        this.body = body;
      }
      catch (err) {
        this.status = 500;
        this.body = PRODUCTION ? 'Internal Server Error' : err.toString();
        this.app.emit('error', err, this);
      }
    }
  };
}

module.exports = renderComponent;
